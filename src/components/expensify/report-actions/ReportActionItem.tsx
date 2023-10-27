import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

type Props = {
  /** The report action */
  action: any; //PropTypes.shape(reportActionPropTypes).isRequired,

  /** Should the comment have the appearance of being grouped with the previous comment? */
  displayAsGroup: boolean;

  /** Additional styles to add after local styles. */
  style: any;

  /** Whether or not the message is hidden by moderation */
  isHidden: boolean;

  /** The ID of the report */
  reportID: string;

  /** localization props */
};

function ReportActionItem(props: Props) {
  const messages = (
    props.action.previousMessage || props.action.message
  ).filter(Boolean);

  return (
    <View style={[styles.chatItemMessage, styles.mt2]}>
      {!props.isHidden ? (
        messages.map((fragment, index) => (
          <Text style={[styles.chatItemMessageHeaderSender]}>
            {fragment.text}
          </Text>
        ))
      ) : (
        <Text style={[styles.textLabelSupporting, styles.lh20]}>
          {'moderation.flaggedContent'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chatItemMessage: {
    color: '#E7ECE9',
    fontSize: 15,
    maxWidth: '100%',
  },
  mt2: {
    marginTop: 8,
  },
  lh20: {
    lineHeight: 20,
  },
  textLabelSupporting: {
    fontSize: 13,
    color: '#AFBBB0',
  },
  chatItemMessageHeaderSender: {
    color: '#E7ECE9',
    fontSize: 15,
    fontWeight: '700',
    wordBreak: 'break-word',
  },
});

export default ReportActionItem;
