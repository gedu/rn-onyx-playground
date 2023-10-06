import React from 'react';
import {View, Text} from 'react-native';
import {withOnyx} from 'react-native-onyx';
import {ONYX_KEYS} from '../../lib/onyx-keys';

type JotaiOnyxScreenProps = {
  betas: string[];
};

function JotaiOnyxScreen({betas}: JotaiOnyxScreenProps) {
  return (
    <View>
      {betas ? betas.map(beta => <Text>{beta}</Text>) : <Text>No betas</Text>}
    </View>
  );
}

export default withOnyx({
  betas: {
    key: ONYX_KEYS.BETAS,
  },
})(JotaiOnyxScreen);
