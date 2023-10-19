import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, Alert} from 'react-native';
import Onyx, {withOnyx} from 'react-native-onyx';
import {ONYX_KEYS} from '../../lib/onyx-keys';
import {atomWithOnyx} from './atomWithOnyx';
import {useAtom} from 'jotai';

type Props = {
  betas: string[];
};

const betasAtom = atomWithOnyx<string[]>(ONYX_KEYS.BETAS, []);
const betasAtom2 = atomWithOnyx<string[]>(ONYX_KEYS.BETAS, []);

function AddBetaButton() {
  const [_, setBetasFromAtom] = useAtom(betasAtom);
  const [atoms] = useAtom(betasAtom2);
  return (
    <View style={{position: 'relative', right: 16}}>
      <Button
        title="Add Beta ONYX"
        onPress={() =>
          Onyx.update([
            {
              onyxMethod: Onyx.METHOD.MERGE,
              key: ONYX_KEYS.BETAS,
              value: ['ONYX BUTTON'],
            },
          ])
        }
      />

      <Button
        title="Add Beta JOTAI"
        onPress={() => setBetasFromAtom(['JOTAI BUTTON'])}
      />
    </View>
  );
}

function ScrollListUsingJotai() {
  const [betasFromAtom, setBetasFromAtom] = useAtom(betasAtom);
  useEffect(() => {
    console.log('ScrollListUsingJotai - useEffect: ');
  }, [betasFromAtom]);
  return (
    <View style={{flex: 1, margin: 16, backgroundColor: '#ECFFB0'}}>
      <FlatList
        data={betasFromAtom}
        renderItem={({item}) => <Text>{item}</Text>}
        keyExtractor={item => item}
      />
      <View>
        <Button
          title="Add Beta"
          onPress={() => setBetasFromAtom(['NEW JOTAI BETA'])}
        />
      </View>
    </View>
  );
}

function ScrollListUsingOnyx({betas}: Props) {
  useEffect(() => {
    console.log('ScrollListUsingOnyx - useEffect: ');
  }, [betas]);
  return (
    <View style={{flex: 1, margin: 16, backgroundColor: '#FF7E6B'}}>
      <FlatList
        data={betas}
        renderItem={({item}) => <Text>{item}</Text>}
        keyExtractor={item => item}
      />
      <View>
        <Button
          title="Add Beta"
          onPress={() => Onyx.merge(ONYX_KEYS.BETAS, ['NEW ONYX BETA'])}
        />
      </View>
    </View>
  );
}

const OnyxBetaScrollList = withOnyx<any, Props>({
  betas: {
    key: ONYX_KEYS.BETAS,
  },
})(ScrollListUsingOnyx);

function JotaiOnyxScreen() {
  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          Onyx.update([
            {
              onyxMethod: Onyx.METHOD.MERGE,
              key: ONYX_KEYS.BETAS,
              value: ['ALERT ONYX BUTTON'],
            },
          ]);
        },
      },
    ]);

  useEffect(() => {
    console.log('JotaiOnyxScreen - useEffect');
    return () => {
      console.log('JotaiOnyxScreen - useEffect - return');
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      <Button title="Alert" onPress={createTwoButtonAlert} />
      <AddBetaButton />
      <OnyxBetaScrollList />
      <ScrollListUsingJotai />
    </View>
  );
}

export default JotaiOnyxScreen;
