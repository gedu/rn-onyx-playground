import React, {useEffect, useRef} from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {useAtomValue} from 'jotai';
import {ONYX_KEYS} from '../../lib/onyx-keys';
import {atomWithOnyx, useAtomWithOnyxById} from './atomWithOnyx';
import Onyx from 'react-native-onyx';

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
            '0': {name: `${getRandomName()} (subscribed)`},
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
    <View style={{flex: 1, padding: 16, backgroundColor: 'lightgreen'}}>
      <Text>Render count: {renderCounter.current}</Text>
      <Text>{JSON.stringify(personalDetails, null, 2)}</Text>
    </View>
  );
}

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
    <View style={{flex: 1, padding: 16, backgroundColor: 'pink'}}>
      <Text>Render count: {renderCounter.current}</Text>
      <Text>Name: {user?.name ?? 'Unknown'}</Text>
    </View>
  );
}

const id = '0';

function JotaiOnyxScreen() {
  return (
    <ScrollView style={{flex: 1}}>
      <EditComponent />
      <JotaiProvidedKeySelector id={id} />
      <JotaiProvidedKeySelector id={id} />
      <JotaiProvidedKey />
    </ScrollView>
  );
}

export default JotaiOnyxScreen;
