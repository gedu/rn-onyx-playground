import Onyx from 'react-native-onyx';
import {ONYX_KEYS} from './onyx-keys';
import isLoadingAppSource from './local-source/isLoadingAppSource';
import betasSource from './local-source/betasSource';
import personalDetailsSource from './local-source/personalDetailsSource';
import {createRandomReportsMap} from './local-source/reportSource';
import reportActionsSource from './local-source/reportActionsSource';
import {createRandomPoliciesMap} from './local-source/policiesSource';

function initOnyx() {
  Onyx.init({keys: ONYX_KEYS});
  populateOnyx();
}

function populateOnyx() {
  Onyx.set(ONYX_KEYS.IS_LOADING_APP, isLoadingAppSource);
  Onyx.set(ONYX_KEYS.BETAS, betasSource);
  Onyx.set(ONYX_KEYS.PERSONAL_DETAILS, personalDetailsSource);
  Onyx.mergeCollection(
    ONYX_KEYS.COLLECTION.REPORTS,
    createRandomReportsMap() as any,
  );
  Onyx.mergeCollection(
    ONYX_KEYS.COLLECTION.POLICIES,
    createRandomPoliciesMap() as any,
  );
  Onyx.set(ONYX_KEYS.COLLECTION.REPORT_ACTIONS, reportActionsSource);
}

export {populateOnyx, initOnyx};
