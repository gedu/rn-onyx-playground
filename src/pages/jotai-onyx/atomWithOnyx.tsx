import {atom} from 'jotai';
import Onyx from 'react-native-onyx';

let currentSessionId: number | null;

export function atomWithOnyx<Value>(key: string, initialValue: Value) {
  console.log('atomWithOnyx');
  function OnConnect(setAtom) {
    console.log('OnConnect');
    currentSessionId = Onyx.connect({
      key,
      waitForCollectionCallback: true,
      callback: val => {
        console.log('OnConnect - callback - val: ', val);
        setAtom(val);
      },
    });
  }
  const baseAtom = atom<Value>(/*Onyx.get(key) ??*/ initialValue);

  // TODO: when ready add a dev flag or remove
  baseAtom.debugPrivate = true;

  baseAtom.onMount = setAtom => {
    console.log('onMount');
    OnConnect(setAtom);
    return () => {
      console.log('onMount - return');
      if (currentSessionId) {
        Onyx.disconnect(currentSessionId);
        currentSessionId = null;
      }
    };
  };

  const derivedAtom = atom(
    get => {
      console.log('derivedAtom - GET');
      return get(baseAtom);
    },
    (get, set, update: Value) => {
      console.log('derivedAtom - SET: ', update);
      Onyx.merge(key, update);
    },
  );

  return derivedAtom;
}
