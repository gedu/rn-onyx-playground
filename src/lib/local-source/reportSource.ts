import {ONYX_KEYS} from '../onyx-keys';
import {createRandomCollection} from './utils';
import {
  rand,
  randBoolean,
  randCurrencyCode,
  randEmail,
  randNumber,
  randPastDate,
  randSentence,
  randUrl,
  randWord,
} from '@ngneat/falso';

function createRandomReport(index: number) {
  return {
    reportID: index.toString(),
    reportName: `#${randWord()}`,
    type: rand(['chat']),
    chatType: rand(['policyAdmins', 'policyParticipants']),
    ownerEmail: randEmail(),
    ownerAccountID: randNumber({length: 16}).toString(),
    managerEmail: randEmail(),
    managerID: randNumber({length: 16}).toString(),
    policyID: index.toString(),
    participantAccountIDs: [randNumber({length: 16}).toString()],
    isPinned: randBoolean(),
    lastReadTime: randPastDate().toISOString(),
    lastReadSequenceNumber: randNumber(),
    lastVisibleActionCreated: randPastDate().toISOString(),
    lastVisibleActionLastModified: randPastDate().toISOString(),
    lastMessageText: randSentence(),
    lastActorAccountID: randNumber(),
    notificationPreference: rand(['always']),
    welcomeMessage: randSentence(),
    stateNum: randNumber(),
    statusNum: randNumber(),
    oldPolicyName: randSentence(),
    isOwnPolicyExpenseChat: randBoolean(),
    lastMessageHtml: '',
    hasOutstandingIOU: randBoolean(),
    writeCapability: rand(['all']),
    total: randNumber(),
    currency: randCurrencyCode(),
    submitterPayPalMeAddress: randUrl(),
    isWaitingOnBankAccount: randBoolean(),
    hasDraft: randBoolean(),
    pendingFields: {
      createChat: null,
    },
    errorFields: {
      createChat: null,
    },
    isOptimizedReport: randBoolean(),
  };
}

function createRandomReportsMap(length = 500) {
  return createRandomCollection(
    report => `${ONYX_KEYS.COLLECTION.REPORTS}${report.reportID}`,
    createRandomReport,
    length,
  );
}

export {createRandomReport, createRandomReportsMap};
export type Report = ReturnType<typeof createRandomReport>;
