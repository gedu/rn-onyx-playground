import {faker} from '@faker-js/faker';
import {createRandomCollection} from './utils';
import {ONYX_KEYS} from '../onyx-keys';

function createRandomPolicy(index: number) {
  return {
    id: index.toString(),
    name: faker.word.noun(),
    role: faker.helpers.arrayElements(['admin', 'auditor', 'user']),
    type: faker.helpers.arrayElements([
      'free',
      'personal',
      'corporate',
      'team',
    ]),
    owner: faker.internet.email(),
    ownerAccountID: faker.string.numeric({length: 16}),
    outputCurrency: faker.finance.currency().code,
    avatar: faker.internet.avatar(),
    errorFields: {},
    pendingAction: {},
    errors: {},
    isFromFullPolicy: faker.datatype.boolean(),
    lastModified: faker.date.past().toISOString(),
    customUnits: {},
    areChatRoomsEnabled: faker.datatype.boolean(),
    isPolicyExpenseChatEnabled: faker.datatype.boolean(),
    autoReporting: faker.datatype.boolean(),
    autoReportingFrequency: faker.helpers.arrayElements([
      'immediate',
      'weekly',
      'monthly',
    ]),
  };
}

function createRandomPoliciesMap(length = 500) {
  return createRandomCollection(
    policy => `${ONYX_KEYS.COLLECTION.POLICIES}${policy.id}`,
    createRandomPolicy,
    length,
  );
}

export {createRandomPolicy, createRandomPoliciesMap};
export type Policy = ReturnType<typeof createRandomPolicy>;
