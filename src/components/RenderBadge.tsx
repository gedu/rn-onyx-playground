import React from 'react';
import {useEffect, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  down?: number;
  right?: number;
};

function RenderBadge({down = 0, right = 0}: Props) {
  const renderCounter = useRef(0);

  useEffect(() => {
    renderCounter.current += 1;
  });

  return (
    <View style={[styles.background, {top: down, left: right}]}>
      <Text style={styles.text}>{renderCounter.current}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: '#D90368',
    padding: 4,
    zIndex: 100,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RenderBadge;
