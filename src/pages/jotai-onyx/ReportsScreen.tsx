import React, {useEffect, useRef} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {useAtomValue} from 'jotai';
import {ONYX_KEYS} from '../../lib/onyx-keys';
import {atomWithOnyx, useAtomWithOnyxById} from './atomWithOnyx';
import Onyx, {withOnyx} from 'react-native-onyx';

const personalDetailsAtom = atomWithOnyx<Record<string, unknown>>(
  ONYX_KEYS.PERSONAL_DETAILS,
  {},
);

const getRandomName = () => `Test name ${Math.floor(Math.random() * 100)}`;

/**
 * This component performs Onyx updates to mimic a real-world scenario.
 */
function EditComponent() {
  return (
    <View style={{flex: 1}}>
      <Button
        title="Change subscribed item"
        onPress={() =>
          Onyx.merge(ONYX_KEYS.PERSONAL_DETAILS, {
            '0': {name: getRandomName()},
          })
        }
      />

      <Button
        title="Change unsubscribed item"
        onPress={() =>
          Onyx.merge(ONYX_KEYS.PERSONAL_DETAILS, {
            '1': {name: `${getRandomName()} (unsubscribed)`},
          })
        }
      />
    </View>
  );
}

/**
 * This component uses Jotai to display data from Onyx (everything under a collection at key).
 */
function JotaiProvidedKey() {
  const personalDetails = useAtomValue(personalDetailsAtom);
  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  return (
    <View style={{flex: 1, padding: 4, backgroundColor: 'lightgreen'}}>
      <Text style={{fontWeight: 'bold'}}>
        Render count: {renderCounter.current}
      </Text>
      <Text>Subscribed keys: {Object.keys(personalDetails).length}</Text>
    </View>
  );
}

/**
 * This component uses withOnyx from 'react-native-onyx' to display data from Onyx (everything under a collection at key).
 */
function OnyxProvidedKey({personalDetails}: any) {
  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  return (
    <View style={{flex: 1, padding: 4, backgroundColor: 'lightgreen'}}>
      <Text style={{fontWeight: 'bold'}}>
        Render count: {renderCounter.current}
      </Text>
      <Text>Subscribed keys: {Object.keys(personalDetails).length}</Text>
    </View>
  );
}

const WithOnyxProvidedKey = withOnyx<any, unknown>({
  personalDetails: {
    key: ONYX_KEYS.PERSONAL_DETAILS,
  },
})(OnyxProvidedKey);

/**
 * This component uses Jotai to display the data for a given key on a collection stored in Onyx.
 * It will only re-render when the data for the given key changes - updates to other keys won't trigger a re-render.
 */
function JotaiProvidedKeySelector({id}: {id: string}) {
  const user = useAtomWithOnyxById(personalDetailsAtom, id);
  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  return (
    <View style={{flex: 1, padding: 4, backgroundColor: 'pink'}}>
      <Text style={{fontWeight: 'bold', marginBottom: 4}}>
        Render count: {renderCounter.current}
      </Text>
      <Text>Subscribed keys: 1</Text>
      <Text>
        Key: {id}, Name: {user?.name ?? 'Unknown'}
      </Text>
    </View>
  );
}

/**
 * This component uses withOnyx HOC from 'react-native-onyx' to display the data for a given key on a collection stored in Onyx.
 * It will re-render when the data for the given key changes - updates to other keys will also trigger a re-render.
 */
function OnyxProvidedKeySelector({id, personalDetails}: any) {
  const user = personalDetails[id];

  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  return (
    <View style={{flex: 1, padding: 4, backgroundColor: 'pink'}}>
      <Text style={{fontWeight: 'bold', marginBottom: 4}}>
        Render count: {renderCounter.current}
      </Text>
      <Text>Subscribed keys: {Object.keys(personalDetails).length}</Text>
      <Text>
        Key: {id}, Name: {user?.name ?? 'Unknown'}
      </Text>
    </View>
  );
}

const WithOnyxProvidedKeySelector = withOnyx<any, unknown>({
  personalDetails: {
    key: ONYX_KEYS.PERSONAL_DETAILS,
  },
})(OnyxProvidedKeySelector);

const id = '0';

function JotaiOnyxScreen() {
  return (
    <ScrollView>
      <EditComponent />
      <View style={{flex: 1, rowGap: 2, marginBottom: 16}}>
        <Text style={{fontSize: 20, marginBottom: 8}}>Jotai</Text>
        <JotaiProvidedKey />
        <JotaiProvidedKeySelector id={id} />
        <JotaiProvidedKeySelector id={id} />
      </View>

      <View style={{flex: 1, rowGap: 2}}>
        <Text style={{fontSize: 20, marginBottom: 8}}>withOnyx</Text>
        <WithOnyxProvidedKey />
        <WithOnyxProvidedKeySelector id={id} />
        <WithOnyxProvidedKeySelector id={id} />
      </View>
    </ScrollView>
  );
}

export default JotaiOnyxScreen;
