import React, {memo} from 'react';
// import CONST from '../../../lib/constants';
import * as ReportActionsUtils from '../utils/libs/ReportActionsUtils';
import ReportActionItem from './ReportActionItem';
// import ReportActionItemParentAction from './ReportActionItemParentAction';
import {ReportAction} from '../../../lib/local-source/reportActionsSource';
import {Report} from '../../../lib/local-source/reportSource';

type Props = {
  /** All the data of the action item */
  reportAction: ReportAction; //PropTypes.shape(reportActionPropTypes).isRequired,

  /** Position index of the report action in the overall report FlatList view */
  index: number;

  /** Report for this action */
  report: Report; //reportPropTypes.isRequired,

  /** Whether the option has an outstanding IOU */
  hasOutstandingIOU: boolean;

  /** Sorted actions prepared for display */
  sortedReportActions: Array<any>; //PropTypes.arrayOf(PropTypes.shape(reportActionPropTypes)).isRequired,

  /** The ID of the most recent IOU report action connected with the shown report */
  mostRecentIOUReportActionID: string;

  /** If the thread divider line should be hidden */
  shouldHideThreadDividerLine: boolean;

  /** Should we display the new marker on top of the comment? */
  shouldDisplayNewMarker: boolean;

  /** Linked report action ID */
  linkedReportActionID: string;
};

function ReportActionsListItemRenderer({
  reportAction,
  index,
  report,
  hasOutstandingIOU = false,
  sortedReportActions,
  mostRecentIOUReportActionID = '',
  shouldHideThreadDividerLine = false,
  shouldDisplayNewMarker = false,
  linkedReportActionID = '2',
}: Props) {
  //   const shouldDisplayParentAction =
  //     reportAction.actionName === CONST.REPORT.ACTIONS.TYPE.CREATED &&
  //     ReportUtils.isChatThread(report) &&
  //     !ReportActionsUtils.isTransactionThread(
  //       ReportActionsUtils.getParentReportAction(report) as any,
  //     );

  return (
    <ReportActionItem
      shouldHideThreadDividerLine={shouldHideThreadDividerLine}
      report={report}
      action={reportAction}
      linkedReportActionID={linkedReportActionID}
      displayAsGroup={ReportActionsUtils.isConsecutiveActionMadeByPreviousActor(
        sortedReportActions,
        index,
      )}
      shouldDisplayNewMarker={shouldDisplayNewMarker}
      isMostRecentIOUReportAction={
        reportAction.reportActionID === mostRecentIOUReportActionID
      }
      hasOutstandingIOU={hasOutstandingIOU}
      index={index}
    />
  );
}

export default memo(ReportActionsListItemRenderer);
