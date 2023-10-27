import CONST from '../../../../lib/constants';
import {
  ReportAction,
  ReportActions,
} from '../../../../lib/local-source/reportActionsSource';
import {Report} from '../../../../lib/local-source/reportSource';

type OnyxEntry<TOnyxValue> = TOnyxValue | null;
type OnyxCollection<TOnyxValue> = OnyxEntry<Record<string, TOnyxValue | null>>;

/**
 * Returns whether the thread is a transaction thread, which is any thread with IOU parent
 * report action from requesting money (type - create) or from sending money (type - pay with IOUDetails field)
 */
function isTransactionThread(
  parentReportAction: OnyxEntry<ReportAction>,
): boolean {
  return (
    parentReportAction?.actionName === CONST.REPORT.ACTIONS.TYPE.IOU &&
    (parentReportAction.originalMessage.type ===
      CONST.IOU.REPORT_ACTION_TYPE.CREATE ||
      (parentReportAction.originalMessage.type ===
        CONST.IOU.REPORT_ACTION_TYPE.PAY &&
        !!parentReportAction.originalMessage.IOUDetails))
  );
}

function getParentReportAction(
  report: OnyxEntry<Report>,
  allReportActionsParam?: OnyxCollection<ReportActions>,
): ReportAction | Record<string, never> {
  if (!report?.parentReportID || !report.parentReportActionID) {
    return {};
  }
  /*allReportActions*/
  return (
    (allReportActionsParam ?? {})?.[report.parentReportID]?.[
      report.parentReportActionID
    ] ?? {}
  );
}

/**
 * Returns the report action immediately before the specified index.
 * @param reportActions - all actions
 * @param actionIndex - index of the action
 */
function findPreviousAction(
  reportActions: ReportAction[] | null,
  actionIndex: number,
): OnyxEntry<ReportAction> {
  if (!reportActions) {
    return null;
  }

  for (let i = actionIndex + 1; i < reportActions.length; i++) {
    // Find the next non-pending deletion report action, as the pending delete action means that it is not displayed in the UI, but still is in the report actions list.
    // If we are offline, all actions are pending but shown in the UI, so we take the previous action, even if it is a delete.
    if (
      false ||
      reportActions[i].pendingAction !==
        CONST.RED_BRICK_ROAD_PENDING_ACTION.DELETE
    ) {
      return reportActions[i];
    }
  }

  return null;
}

/**
 * Returns true when the report action immediately before the specified index is a comment made by the same actor who who is leaving a comment in the action at the specified index.
 * Also checks to ensure that the comment is not too old to be shown as a grouped comment.
 *
 * @param actionIndex - index of the comment item in state to check
 */
function isConsecutiveActionMadeByPreviousActor(
  reportActions: ReportAction[] | null,
  actionIndex: number,
): boolean {
  const previousAction = findPreviousAction(reportActions, actionIndex);
  const currentAction = reportActions?.[actionIndex];

  // It's OK for there to be no previous action, and in that case, false will be returned
  // so that the comment isn't grouped
  if (!currentAction || !previousAction) {
    return false;
  }

  // Comments are only grouped if they happen within 5 minutes of each other
  if (
    new Date(currentAction.created).getTime() -
      new Date(previousAction.created).getTime() >
    300000
  ) {
    return false;
  }

  // Do not group if previous action was a created action
  if (previousAction.actionName === CONST.REPORT.ACTIONS.TYPE.CREATED) {
    return false;
  }

  // Do not group if previous or current action was a renamed action
  if (
    previousAction.actionName === CONST.REPORT.ACTIONS.TYPE.RENAMED ||
    currentAction.actionName === CONST.REPORT.ACTIONS.TYPE.RENAMED
  ) {
    return false;
  }

  // Do not group if the delegate account ID is different
  if (previousAction.delegateAccountID !== currentAction.delegateAccountID) {
    return false;
  }

  return currentAction.actorAccountID === previousAction.actorAccountID;
}

export {
  isTransactionThread,
  getParentReportAction,
  isConsecutiveActionMadeByPreviousActor,
};
