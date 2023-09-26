import Onyx from 'react-native-onyx';
import {ONYX_KEYS} from './onyx-keys';

export const initOnyx = () => {
  Onyx.init({keys: ONYX_KEYS});
};
