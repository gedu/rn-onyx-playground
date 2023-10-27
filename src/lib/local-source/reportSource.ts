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

type Icon = {
  source: React.ReactNode | string;
  type: 'avatar' | 'workspace';
  name: string;
};

export type Report = {
  /** The specific type of chat */
  chatType?: {
    readonly POLICY_ANNOUNCE: 'policyAnnounce';
    readonly POLICY_ADMINS: 'policyAdmins';
    readonly DOMAIN_ALL: 'domainAll';
    readonly POLICY_ROOM: 'policyRoom';
    readonly POLICY_EXPENSE_CHAT: 'policyExpenseChat';
  };

  /** Whether there is an outstanding amount in IOU */
  hasOutstandingIOU?: boolean;

  /** List of icons for report participants */
  icons?: Icon[];

  /** Whether the user is not an admin of policyExpenseChat chat */
  isOwnPolicyExpenseChat?: boolean;

  /** Indicates if the report is pinned to the LHN or not */
  isPinned?: boolean;

  /** The text of the last message on the report */
  lastMessageText?: string;

  /** The time of the last message on the report */
  lastVisibleActionCreated?: string;

  /** The last time the report was visited */
  lastReadTime?: string;

  /** The current user's notification preference for this report */
  notificationPreference?: string | number;

  /** The policy name to use for an archived report */
  oldPolicyName?: string;

  /** The email address of the report owner */
  ownerEmail?: string;

  /** Linked policy's ID */
  policyID?: string;

  /** Name of the report */
  reportName?: string;

  /** ID of the report */
  reportID: string;

  /** The state that the report is currently in */
  stateNum?: {
    readonly OPEN: 0;
    readonly PROCESSING: 1;
    readonly SUBMITTED: 2;
    readonly BILLING: 3;
  };

  /** The status of the current report */
  statusNum?: {
    readonly OPEN: 0;
    readonly SUBMITTED: 1;
    readonly CLOSED: 2;
    readonly APPROVED: 3;
    readonly REIMBURSED: 4;
  };

  /** Which user role is capable of posting messages on the report */
  writeCapability?: {
    readonly ALL: 'all';
    readonly ADMINS: 'admins';
  };

  /** The report type */
  type?: string;

  lastMessageTranslationKey?: string;
  parentReportID?: string;
  parentReportActionID?: string;
  isOptimisticReport?: boolean;
  hasDraft?: boolean;
  managerID?: number;
  lastVisibleActionLastModified?: string;
  displayName?: string;
  lastMessageHtml?: string;
  welcomeMessage?: string;
  lastActorAccountID?: number;
  ownerAccountID?: number;
  participantAccountIDs?: number[];
  total?: number;
  currency?: string;
  preexistingReportID?: string;
  /** If the report contains nonreimbursable expenses, send the nonreimbursable total */
  nonReimbursableTotal?: number;
};

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

// export type Report = ReturnType<typeof createRandomReport>;
export {createRandomReport, createRandomReportsMap};
