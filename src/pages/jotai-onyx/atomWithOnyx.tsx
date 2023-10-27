import {useCallback} from 'react';
import {atom, type Atom} from 'jotai';
import {selectAtom} from 'jotai/utils';
import Onyx from 'react-native-onyx';

interface Options {
  canEvict?: boolean;
}

/**
 * This is a custom, read-only Jotai atom that connects to Onyx and listens for changes to a given key.
 * It provides a performant way of synchronizing Onyx data with the UI layer.
 */
export function atomWithOnyx<Value>(
  key: string,
  initialValue: Value,
  options: Options = {
    canEvict: false,
  },
) {
  // Store the current sessionId so we can disconnect when the atom is unmounted
  let currentSessionId: number | null = null;

  // A base atom that will be used to store the value and respond to Onyx's callbacks
  const baseAtom = atom<Value>(initialValue);

  // TODO: when ready add a dev flag or remove
  baseAtom.debugPrivate = true;

  baseAtom.onMount = setAtom => {
    // When the atom is mounted, connect to Onyx and listen for changes using the callback
    currentSessionId = Onyx.connect({
      key,
      waitForCollectionCallback: true,
      callback: value => {
        // TODO a better way to type the value?
        setAtom(value as Value);
      },
    });

    // Add the key to the eviction block list if it's not allowed to be evicted, remove it otherwise
    options.canEvict
      ? Onyx.removeFromEvictionBlockList(key, currentSessionId)
      : Onyx.addToEvictionBlockList(key, currentSessionId);

    // Disconnect from Onyx and clear the session id when unmounting the atom
    return () => {
      if (!currentSessionId) {
        return;
      }

      Onyx.disconnect(currentSessionId);
      currentSessionId = null;
    };
  };

  // A derived, read-only atom exposed to the UI layer
  const derivedAtom = atom(get => get(baseAtom));

  return derivedAtom;
}

/**
 * An abstraction over collection atoms stored with `atomWithOnyx` that allows you to select a single item by id.
 */
export function useSelectOnyxAtomById<T>(
  collectionAtom: Atom<Record<string, T>>,
  id: string,
) {
  return selectAtom(
    collectionAtom,
    useCallback(collection => collection[id], [id]),
  );
}
