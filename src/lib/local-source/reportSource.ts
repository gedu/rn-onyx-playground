import {faker} from '@faker-js/faker';
import {ONYX_KEYS} from '../onyx-keys';

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
