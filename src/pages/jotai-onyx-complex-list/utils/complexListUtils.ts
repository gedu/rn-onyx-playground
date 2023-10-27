import CONST from '../../../lib/constants';

function getSortedReportActionsForDisplay(reportActions: Array<any>) {
  //   console.log('reportActions', reportActions);
  if (!reportActions || reportActions.length === 0) {
    return [];
  }

  const filteredReportActions = reportActions.filter((reportAction, key) =>
    shouldReportActionBeVisible(reportAction, String(key)),
  );
  return getSortedReportActions(filteredReportActions, true);
}

function shouldReportActionBeVisible(reportAction: any, key: string) {
  if (isReportActionDeprecated(reportAction, key)) {
    return false;
  }

  if (reportAction.actionName === CONST.REPORT.ACTIONS.TYPE.TASKEDITED) {
    return false;
  }

  // Filter out any unsupported reportAction types
  if (
    !Object.values(CONST.REPORT.ACTIONS.TYPE).includes(
      reportAction.actionName,
    ) &&
    !Object.values(CONST.REPORT.ACTIONS.TYPE.POLICYCHANGELOG).includes(
      reportAction.actionName,
    )
  ) {
    return false;
  }

  // Ignore closed action here since we're already displaying a footer that explains why the report was closed
  if (reportAction.actionName === CONST.REPORT.ACTIONS.TYPE.CLOSED) {
    return false;
  }

  if (isPendingRemove(reportAction)) {
    return false;
  }

  // All other actions are displayed except thread parents, deleted, or non-pending actions
  const isDeleted = isDeletedAction(reportAction);
  const isPending = !!reportAction.pendingAction;
  return (
    !isDeleted ||
    isPending ||
    isDeletedParentAction(reportAction) ||
    isReversedTransaction(reportAction)
  );
}

function getSortedReportActions(
  reportActions: any,
  shouldSortInDescendingOrder = false,
) {
  if (!Array.isArray(reportActions)) {
    throw new Error(
      `ReportActionsUtils.getSortedReportActions requires an array, received ${typeof reportActions}`,
    );
  }

  const invertedMultiplier = shouldSortInDescendingOrder ? -1 : 1;
  return reportActions
    .filter(item => item) // Equivalent to _.compact()
    .sort((first, second) => {
      // First sort by timestamp
      if (first.created !== second.created) {
        return (first.created < second.created ? -1 : 1) * invertedMultiplier;
      }

      // Then by action type, ensuring that `CREATED` actions always come first if they have the same timestamp as another action type
      if (
        (first.actionName === CONST.REPORT.ACTIONS.TYPE.CREATED ||
          second.actionName === CONST.REPORT.ACTIONS.TYPE.CREATED) &&
        first.actionName !== second.actionName
      ) {
        return (
          (first.actionName === CONST.REPORT.ACTIONS.TYPE.CREATED ? -1 : 1) *
          invertedMultiplier
        );
      }
      // Ensure that `REPORTPREVIEW` actions always come after if they have the same timestamp as another action type
      if (
        (first.actionName === CONST.REPORT.ACTIONS.TYPE.REPORTPREVIEW ||
          second.actionName === CONST.REPORT.ACTIONS.TYPE.REPORTPREVIEW) &&
        first.actionName !== second.actionName
      ) {
        return (
          (first.actionName === CONST.REPORT.ACTIONS.TYPE.REPORTPREVIEW
            ? 1
            : -1) * invertedMultiplier
        );
      }

      // Then fallback on reportActionID as the final sorting criteria. It is a random number,
      // but using this will ensure that the order of reportActions with the same created time and action type
      // will be consistent across all users and devices
      return (
        (first.reportActionID < second.reportActionID ? -1 : 1) *
        invertedMultiplier
      );
    });
}

function isReportActionDeprecated(reportAction: any, key: string) {
  if (!reportAction) {
    return true;
  }
  if (String(reportAction.sequenceNumber) === key) {
    return true;
  }

  return false;
}

function isPendingRemove(reportAction: any) {
  try {
    return (
      reportAction?.message[0].moderationDecision.decision ===
      CONST.MODERATION.MODERATOR_DECISION_PENDING_REMOVE
    );
  } catch (e) {
    return false;
  }
}

function isDeletedAction(reportAction: any) {
  // A deleted comment has either an empty array or an object with html field with empty string as value
  try {
    const message = reportAction?.message ?? [];
    return message.length === 0 || message[0].html === '';
  } catch (e) {
    return false;
  }
}

function isDeletedParentAction(reportAction: any) {
  const isDeleted = reportAction?.message[0]?.isDeletedParentAction ?? false;
  const childVisibleActionCount = reportAction?.childVisibleActionCount ?? 0;
  return isDeleted && childVisibleActionCount > 0;
}

/**
 * @param {Object} reportAction
 * @returns {Boolean}
 */
function isReversedTransaction(reportAction: any) {
  const isReversed = reportAction?.message[0]?.isReversedTransaction ?? false;
  const childVisibleActionCount = reportAction?.childVisibleActionCount ?? 0;
  return isReversed && childVisibleActionCount > 0;
}

export {getSortedReportActionsForDisplay};
