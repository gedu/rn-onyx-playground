import React, {useEffect, useRef} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {useAtomValue} from 'jotai';
import {ONYX_KEYS} from '../../lib/onyx-keys';
import {atomWithOnyx, useAtomWithOnyxById} from './atomWithOnyx';
import Onyx, {withOnyx} from 'react-native-onyx';
import {createRandomReport} from '../../lib/local-source/reportSource';

const reportsAtom = atomWithOnyx<Record<string, unknown>>(
  ONYX_KEYS.COLLECTION.REPORTS,
  {},
);

/**
 * This component performs Onyx updates to mimic a real-world scenario.
 */
function EditComponent() {
  return (
    <View style={{flex: 1}}>
      <Button
        title="Change item 0"
        onPress={() =>
          Onyx.merge(`${ONYX_KEYS.COLLECTION.REPORTS}0`, {
            ...createRandomReport(),
            reportID: '0',
          })
        }
      />

      <Button
        title="Change item 1"
        onPress={() =>
          Onyx.merge(
            `${ONYX_KEYS.COLLECTION.REPORTS}1`,
            Onyx.merge(`${ONYX_KEYS.COLLECTION.REPORTS}1`, {
              ...createRandomReport(),
              reportID: '1',
            }),
          )
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
  const report = useAtomWithOnyxById(
    reportsAtom,
    `${ONYX_KEYS.COLLECTION.REPORTS}${id}`,
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
 * This component uses withOnyx HOC from 'react-native-onyx' to display the data for a given key on a collection stored in Onyx.
 * It will re-render when the data for the given key changes - updates to other keys will also trigger a re-render.
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

function CollectionScreen() {
  return (
    <ScrollView>
      <EditComponent />
      <View style={{flex: 1, rowGap: 2, marginBottom: 16}}>
        <Text style={{fontSize: 20, marginBottom: 8}}>Jotai</Text>
        <JotaiProvidedKey />
        <JotaiProvidedKeySelector id={'0'} />
        <JotaiProvidedKeySelector id={'0'} />
        <JotaiProvidedKeySelector id={'1'} />
      </View>

      <View style={{flex: 1, rowGap: 2}}>
        <Text style={{fontSize: 20, marginBottom: 8}}>withOnyx</Text>
        <WithOnyxProvidedKey />
        <WithOnyxProvidedKeySelector id={'0'} />
        <WithOnyxProvidedKeySelector id={'0'} />
        <WithOnyxProvidedKeySelector id={'1'} />
      </View>
    </ScrollView>
  );
}

export default CollectionScreen;
