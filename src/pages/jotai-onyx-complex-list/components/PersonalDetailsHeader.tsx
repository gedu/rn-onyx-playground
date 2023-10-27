import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {personalDetailsAtom} from '../local-source/onyxConnection';
import {useAtomValue} from 'jotai';
import {withOnyx} from 'react-native-onyx';
import RenderBadge from '../../../components/RenderBadge';
import {
  EDU_ACCOUNT_ID,
  PersonalDetailAccountInfo,
} from '../../../lib/accountUtils';
import {ONYX_KEYS} from '../../../lib/onyx-keys';

const useJotai = true;

function PersonalDetailsHeaderAtom() {
  const personalDetails = useAtomValue(personalDetailsAtom);
  if (!personalDetails) {
    return <View />;
  }

  const currentUserInfo = personalDetails[
    EDU_ACCOUNT_ID
  ] as PersonalDetailAccountInfo;

  if (!currentUserInfo) {
    return <View />;
  }
  return (
    <View style={styles.background}>
      <RenderBadge />
      {currentUserInfo.validated ? (
        <ValidUserHeader personalDetails={currentUserInfo} />
      ) : (
        <FirstTimeUserHeader />
      )}
    </View>
  );
}

function PersonalDetailsHeaderOnyx({personalDetails}: {personalDetails: any}) {
  if (!personalDetails) {
    return <View />;
  }

  const currentUserInfo = personalDetails[
    EDU_ACCOUNT_ID
  ] as PersonalDetailAccountInfo;

  if (!currentUserInfo) {
    return <View />;
  }
  return (
    <View style={styles.background}>
      <RenderBadge />
      {currentUserInfo.validated ? (
        <ValidUserHeader personalDetails={currentUserInfo} />
      ) : (
        <FirstTimeUserHeader />
      )}
    </View>
  );
}

function ValidUserHeader({
  personalDetails,
}: {
  personalDetails: PersonalDetailAccountInfo;
}) {
  return (
    <View style={styles.background}>
      <View style={styles.row}>
        <Text style={styles.title}>
          Welcome back {personalDetails.firstName}
        </Text>
        <View style={styles.greenDot} />
      </View>
      <Text style={styles.subTitle}>{personalDetails.login}</Text>
    </View>
  );
}

function FirstTimeUserHeader() {
  return (
    <View style={styles.background}>
      <View style={styles.row}>
        <Text style={styles.title}>Welcome New User</Text>
        <View style={styles.redDot} />
      </View>
      <Text style={styles.subTitle}>how are you?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1B4965',
    height: 120,
    borderBottomEndRadius: 32,
    borderBottomStartRadius: 32,
  },
  row: {
    paddingTop: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greenDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'green',
  },
  redDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 24,
    paddingHorizontal: 8,
  },
  subTitle: {
    color: 'white',
    paddingHorizontal: 32,
  },
});

const PersonalDetailsHeader = useJotai
  ? PersonalDetailsHeaderAtom
  : withOnyx<any, any>({
      personalDetails: {
        key: ONYX_KEYS.PERSONAL_DETAILS,
      },
    })(PersonalDetailsHeaderOnyx);

export default PersonalDetailsHeader;
