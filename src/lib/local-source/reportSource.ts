import {faker} from '@faker-js/faker';
import {ONYX_KEYS} from '../onyx-keys';

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

function createRandomReport() {
  return {
    reportID: faker.string.numeric({length: 16}),
    reportName: `#${faker.word.noun()}`,
    type: faker.helpers.arrayElement(['chat']),
    chatType: faker.helpers.arrayElement([
      'policyAdmins',
      'policyParticipants',
    ]),
    ownerEmail: faker.internet.email(),
    ownerAccountID: faker.string.numeric({length: 16}),
    managerEmail: faker.internet.email(),
    managerID: faker.string.numeric({length: 16}),
    policyID: faker.string.alphanumeric({length: 16, casing: 'upper'}),
    participantAccountIDs: [faker.string.numeric({length: 16})],
    isPinned: faker.datatype.boolean(),
    lastReadTime: faker.date.past().toISOString(),
    lastReadSequenceNumber: faker.number.int(),
    lastVisibleActionCreated: faker.date.past().toISOString(),
    lastVisibleActionLastModified: faker.date.past().toISOString(),
    lastMessageText: faker.lorem.sentence(),
    lastActorAccountID: faker.number.int(),
    notificationPreference: faker.helpers.arrayElement(['always']),
    welcomeMessage: faker.lorem.sentence(),
    stateNum: faker.number.int(),
    statusNum: faker.number.int(),
    oldPolicyName: faker.lorem.sentence(),
    isOwnPolicyExpenseChat: faker.datatype.boolean(),
    lastMessageHtml: '',
    hasOutstandingIOU: faker.datatype.boolean(),
    writeCapability: faker.helpers.arrayElement(['all']),
    total: faker.number.int(),
    currency: faker.helpers.arrayElement(['USD', 'GBP', 'EUR']),
    submitterPayPalMeAddress: faker.internet.url(),
    isWaitingOnBankAccount: faker.datatype.boolean(),
    hasDraft: faker.datatype.boolean(),
    pendingFields: {
      createChat: null,
    },
    errorFields: {
      createChat: null,
    },
    isOptimizedReport: faker.datatype.boolean(),
  };
}

function createRandomReportsMap(length = 500) {
  const list = new Array(length).fill(null).map(createRandomReport);

  return list.reduce<Record<string, unknown>>((acc, report) => {
    if (acc === null) {
      return {};
    }

    acc[`${ONYX_KEYS.COLLECTION.REPORTS}${report.reportID}`] = report;
    return acc;
  }, {}) as any;
}

export {createRandomReport, createRandomReportsMap};
