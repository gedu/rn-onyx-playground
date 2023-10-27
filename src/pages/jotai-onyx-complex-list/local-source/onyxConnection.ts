import {ONYX_KEYS} from '../../../lib/onyx-keys';
import {atomWithOnyx} from '../../jotai-onyx/atomWithOnyx';

const personalDetailsAtom = atomWithOnyx<Record<string, unknown>>(
  ONYX_KEYS.PERSONAL_DETAILS,
  {},
);
const reportActionsAtom = atomWithOnyx<Record<string, Array<unknown>>>(
  ONYX_KEYS.COLLECTION.REPORT_ACTIONS,
  {},
);

export {personalDetailsAtom, reportActionsAtom};
