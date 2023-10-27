import React from 'react';
import {FlatList, View} from 'react-native';
import PersonalDetailsHeaderAtom from './components/PersonalDetailsHeader';
import {reportActionsAtom} from './local-source/onyxConnection';
import {getSortedReportActionsForDisplay} from './utils/complexListUtils';
import {atom, useAtom} from 'jotai';
import {withOnyx} from 'react-native-onyx';
import {ONYX_KEYS} from '../../lib/onyx-keys';
import Composer from './components/MessageComposer';
import ReportActionsListItemRenderer from '../../components/expensify/report-actions/ReportActionsListItemRenderer';
import RenderBadge from '../../components/RenderBadge';

const useJotai = true;

const sortedReportAtom = atom<Array<any>>(get => {
  const reportActions = get(reportActionsAtom);
  if (!reportActions || !reportActions[ONYX_KEYS.COLLECTION.REPORT_ACTIONS]) {
    return [];
  }

  return getSortedReportActionsForDisplay(
    reportActions[ONYX_KEYS.COLLECTION.REPORT_ACTIONS] as Array<any>,
  );
});

function ComplexReportScreenListAtom() {
  const [sortedReports] = useAtom(sortedReportAtom);
  return (
    <View style={{backgroundColor: '#002E22'}}>
      <PersonalDetailsHeaderAtom />
      <RenderList sortedReports={sortedReports} />
      <Composer style={{width: '100%'}} />
    </View>
  );
}
function ComplexReportScreenListOnyx({sortedReports}: {sortedReports: any}) {
  return (
    <View style={{backgroundColor: '#002E22', flex: 1}}>
      <PersonalDetailsHeaderAtom />

      <RenderList
        sortedReports={
          sortedReports?.[ONYX_KEYS.COLLECTION.REPORT_ACTIONS] ?? []
        }
      />
      <Composer style={{width: '100%'}} />
    </View>
  );
}

function RenderList({sortedReports}: {sortedReports: any}) {
  return (
    <View style={{flex: 1}}>
      <RenderBadge />
      <FlatList
        data={sortedReports}
        renderItem={({item, index}) => (
          <ReportActionsListItemRenderer
            reportAction={item}
            index={index}
            report={{reportID: '1'}}
            shouldDisplayNewMarker={false}
            hasOutstandingIOU={false}
            mostRecentIOUReportActionID=""
            shouldHideThreadDividerLine={false}
            linkedReportActionID=""
            sortedReportActions={[]}
          />
        )}
        keyExtractor={item => item.reportActionID}
      />
    </View>
  );
}

const ComplexReportScreenList = useJotai
  ? ComplexReportScreenListAtom
  : withOnyx<any, any>({
      sortedReports: {
        key: ONYX_KEYS.COLLECTION.REPORT_ACTIONS,
        selector: reportActions => {
          if (!reportActions || reportActions.length === 0) {
            return [];
          }

          const sorted = getSortedReportActionsForDisplay(reportActions);

          return sorted;
        },
      },
    })(ComplexReportScreenListOnyx);

export default ComplexReportScreenList;
