import React, {useEffect, useRef} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {useAtomValue} from 'jotai';
import {ONYX_KEYS} from '../../lib/onyx-keys';
import {atomWithOnyx, useSelectOnyxAtomById} from './atomWithOnyx';
import Onyx, {withOnyx} from 'react-native-onyx';
import {
  createRandomReport,
  type Report,
} from '../../lib/local-source/reportSource';
import {
  createRandomPolicy,
  type Policy,
} from '../../lib/local-source/policiesSource';

const reportsAtom = atomWithOnyx<Record<string, Report>>(
  ONYX_KEYS.COLLECTION.REPORTS,
  {},
);

const policiesAtom = atomWithOnyx<Record<string, Policy>>(
  ONYX_KEYS.COLLECTION.POLICIES,
  {},
);

/**
 * This component performs Onyx updates to mimic a real-world scenario.
 */
function EditComponent() {
  return (
    <View style={{flex: 1}}>
      <Button
        title="Randomize report 0"
        onPress={() =>
          Onyx.merge(`${ONYX_KEYS.COLLECTION.REPORTS}0`, createRandomReport(0))
        }
      />

      <Button
        title="Randomize report 1"
        onPress={() =>
          Onyx.merge(`${ONYX_KEYS.COLLECTION.REPORTS}1`, createRandomReport(1))
        }
      />

      <Button
        title="Change policy 0"
        onPress={() =>
          Onyx.merge(`${ONYX_KEYS.COLLECTION.POLICIES}0`, createRandomPolicy(0))
        }
      />
    </View>
  );
}

/**
 * This component uses Jotai to display data from Onyx (everything under a collection at key).
 */
function JotaiProvidedKey() {
  const reports = useAtomValue(reportsAtom);
  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  return (
    <View style={{flex: 1, padding: 4, backgroundColor: 'lightgreen'}}>
      <Text style={{fontWeight: 'bold'}}>
        Render count: {renderCounter.current}
      </Text>
      <Text>Keys count: {Object.keys(reports).length}</Text>
    </View>
  );
}

/**
 * This component uses withOnyx from 'react-native-onyx' to display data from Onyx (everything under a collection at key).
 */
function OnyxProvidedKey({reports}: any) {
  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  return (
    <View style={{flex: 1, padding: 4, backgroundColor: 'lightgreen'}}>
      <Text style={{fontWeight: 'bold'}}>
        Render count: {renderCounter.current}
      </Text>
      <Text>Keys count: {Object.keys(reports).length}</Text>
    </View>
  );
}

const WithOnyxProvidedKey = withOnyx<any, unknown>({
  reports: {
    key: ONYX_KEYS.COLLECTION.REPORTS,
  },
})(OnyxProvidedKey);

/**
 * This component uses Jotai to display the data for a given key on a collection stored in Onyx.
 * It will only re-render when the data for the given key changes - updates to other keys won't trigger a re-render.
 */
function JotaiProvidedKeySelector({id}: {id: string}) {
  const report = useAtomValue(
    useSelectOnyxAtomById(reportsAtom, `${ONYX_KEYS.COLLECTION.REPORTS}${id}`),
  );
  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  return (
    <View style={{flex: 1, padding: 4, backgroundColor: 'pink'}}>
      <Text style={{fontWeight: 'bold', marginBottom: 4}}>
        Render count: {renderCounter.current}
      </Text>
      <Text>
        Key: {id}, Name: {report?.reportName ?? 'Unknown'}
      </Text>
    </View>
  );
}

/**
 * This component uses Jotai to display the data for a given key on a collection stored in Onyx.
 */
function JotaiProvidedKeyDependantSelector({id}: {id: string}) {
  const report = useAtomValue(
    useSelectOnyxAtomById(reportsAtom, `${ONYX_KEYS.COLLECTION.REPORTS}${id}`),
  );

  const policy = useAtomValue(
    useSelectOnyxAtomById(
      policiesAtom,
      `${ONYX_KEYS.COLLECTION.POLICIES}${report?.policyID}`,
    ),
  );

  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  return (
    <View style={{flex: 1, padding: 4, backgroundColor: 'pink'}}>
      <Text style={{fontWeight: 'bold', marginBottom: 4}}>
        Render count: {renderCounter.current}
      </Text>
      <Text>Key: {id}</Text>
      <Text>
        Report: {report?.reportID ?? '?'}, Name:{' '}
        {report?.reportName ?? 'Unknown'}
      </Text>
      <Text>
        Policy: {policy?.id ?? '?'}, Name: {policy?.name ?? 'Unknown'}
      </Text>
    </View>
  );
}

/**
 * This component uses withOnyx to display the data for a given key + a dependant key on a collection item stored in Onyx.
 */
function OnyxProvidedKeyDependantSelector({id, report, policy}: any) {
  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  return (
    <View style={{flex: 1, padding: 4, backgroundColor: 'pink'}}>
      <Text style={{fontWeight: 'bold', marginBottom: 4}}>
        Render count: {renderCounter.current}
      </Text>
      <Text>Key: {id}</Text>
      <Text>
        Report: {report?.reportID ?? '?'}, Name:{' '}
        {report?.reportName ?? 'Unknown'}
      </Text>
      <Text>
        Policy: {policy?.id ?? '?'}, Name: {policy?.name ?? 'Unknown'}
      </Text>
    </View>
  );
}

const WithOnyxProvidedKeyDependantSelector = withOnyx<any, unknown>({
  report: {
    key: ({id}: {id: string}) => `${ONYX_KEYS.COLLECTION.REPORTS}${id}`,
  },
  policy: {
    key: ({report}: any) =>
      `${ONYX_KEYS.COLLECTION.POLICIES}${report?.policyID}`,
  },
})(OnyxProvidedKeyDependantSelector);

/**
 * This component uses withOnyx HOC from 'react-native-onyx' to display the data for a given key on a collection stored in Onyx.
 * It will re-render when the data for the given key changes - updates to other keys won't trigger a re-render.
 */
function OnyxProvidedKeySelector({id, report}: any) {
  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  return (
    <View style={{flex: 1, padding: 4, backgroundColor: 'pink'}}>
      <Text style={{fontWeight: 'bold', marginBottom: 4}}>
        Render count: {renderCounter.current}
      </Text>
      <Text>
        Key: {id}, Name: {report?.reportName ?? 'Unknown'}
      </Text>
    </View>
  );
}

const WithOnyxProvidedKeySelector = withOnyx<any, unknown>({
  report: {
    key: ({id}: {id: string}) => `${ONYX_KEYS.COLLECTION.REPORTS}${id}`,
  },
})(OnyxProvidedKeySelector);

function CollectionScreenJotai() {
  return (
    <ScrollView>
      <EditComponent />

      <Text style={{fontSize: 20, marginBottom: 8}}>Jotai</Text>
      <JotaiProvidedKey />
      <JotaiProvidedKeyDependantSelector id={'0'} />
      <JotaiProvidedKeySelector id={'0'} />
      <JotaiProvidedKeySelector id={'0'} />
      <JotaiProvidedKeySelector id={'1'} />
    </ScrollView>
  );
}

function CollectionScreenOnyx() {
  return (
    <ScrollView>
      <EditComponent />

      <Text style={{fontSize: 20, marginBottom: 8}}>withOnyx</Text>
      <WithOnyxProvidedKey />
      <WithOnyxProvidedKeyDependantSelector id={'0'} />
      <WithOnyxProvidedKeySelector id={'0'} />
      <WithOnyxProvidedKeySelector id={'0'} />
      <WithOnyxProvidedKeySelector id={'1'} />
    </ScrollView>
  );
}

export {CollectionScreenJotai, CollectionScreenOnyx};
