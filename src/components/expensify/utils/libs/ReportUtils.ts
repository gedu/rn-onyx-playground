import CONST from '../../../../lib/constants';
import {Report} from '../../../../lib/local-source/reportSource';

/**
 * Returns true if report has a parent
 *
 * @param {Object} report
 * @returns {Boolean}
 */
function isThread(report: Report) {
  return Boolean(
    report && report.parentReportID && report.parentReportActionID,
  );
}

function getChatType(report: Report) {
  return report ? report.chatType : '';
}

/**
 * Returns true if report is of type chat and has a parent and is therefore a Thread.
 *
 * @param {Object} report
 * @returns {Boolean}
 */
function isChatThread(report: Report) {
  return isThread(report) && report.type === CONST.REPORT.TYPE.CHAT;
}

/**
 * Whether the provided report is a default room
 * @param {Object} report
 * @param {String} report.chatType
 * @returns {Boolean}
 */
function isDefaultRoom(report: Report) {
  return (
    [
      CONST.REPORT.CHAT_TYPE.POLICY_ADMINS,
      CONST.REPORT.CHAT_TYPE.POLICY_ANNOUNCE,
      CONST.REPORT.CHAT_TYPE.DOMAIN_ALL,
    ].indexOf(getChatType(report)) > -1
  );
}

/**
 * Whether the provided report is a Domain room
 * @param {Object} report
 * @param {String} report.chatType
 * @returns {Boolean}
 */
function isDomainRoom(report: Report) {
  return getChatType(report) === CONST.REPORT.CHAT_TYPE.DOMAIN_ALL;
}

/**
 * Whether the provided report is a user created policy room
 * @param {Object} report
 * @param {String} report.chatType
 * @returns {Boolean}
 */
function isUserCreatedPolicyRoom(report: Report) {
  return getChatType(report) === CONST.REPORT.CHAT_TYPE.POLICY_ROOM;
}

/**
 * Whether the provided report is a Policy Expense chat.
 * @param {Object} report
 * @param {String} report.chatType
 * @returns {Boolean}
 */
function isPolicyExpenseChat(report: Report) {
  return getChatType(report) === CONST.REPORT.CHAT_TYPE.POLICY_EXPENSE_CHAT;
}

/** Wether the provided report belongs to a Control policy and is an epxense chat
 * @param {Object} report
 * @returns {Boolean}
 */
function isControlPolicyExpenseChat(report: Report) {
  return (
    isPolicyExpenseChat(report) &&
    getPolicyType(report, allPolicies) === CONST.POLICY.TYPE.CORPORATE
  );
}

export {
  isThread,
  isChatThread,
  isDefaultRoom,
  isDomainRoom,
  isUserCreatedPolicyRoom,
  isPolicyExpenseChat,
  isControlPolicyExpenseChat,
};
