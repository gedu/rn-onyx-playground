import Onyx from 'react-native-onyx';
import {ONYX_KEYS} from './onyx-keys';
import isLoadingAppSource from './local-source/isLoadingAppSource';
import betasSource from './local-source/betasSource';
import personalDetailsSource from './local-source/personalDetailsSource';
import reportSource from './local-source/reportSource';
import reportActionsSource from './local-source/reportActionsSource';

function initOnyx() {
  Onyx.init({keys: ONYX_KEYS});
  populateOnyx();
}

function populateOnyx() {
  Onyx.set(ONYX_KEYS.IS_LOADING_APP, isLoadingAppSource);
  Onyx.set(ONYX_KEYS.BETAS, betasSource);
  Onyx.set(ONYX_KEYS.PERSONAL_DETAILS, personalDetailsSource);
  Onyx.set(ONYX_KEYS.REPORTS, reportSource);
  Onyx.set(ONYX_KEYS.REPORT_ACTIONS, reportActionsSource);
}

export {populateOnyx, initOnyx};
