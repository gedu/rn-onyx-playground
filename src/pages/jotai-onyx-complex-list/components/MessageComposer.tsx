import React from 'react';
import {useEffect, useMemo, useRef} from 'react';
import {StyleProp, StyleSheet, TextInput, TextStyle} from 'react-native';

type Props = {
  shouldClear: boolean;
  onClear: () => void;
  isDisabled: boolean;
  maxLines: number;
  forwardedRef: React.RefObject<TextInput>;
  isComposerFullSize: boolean;
  setIsFullComposerAvailable: (isFullComposerAvailable: boolean) => void;
  style: StyleProp<TextStyle>;
};

function Composer({
  shouldClear,
  onClear,
  isDisabled,
  maxLines,
  isComposerFullSize,
  ...props
}: Props) {
  const textInput = useRef<TextInput | null>(null);

  useEffect(() => {
    if (!shouldClear || !textInput.current) {
      return;
    }
    textInput.current.clear();
    onClear();
  }, [shouldClear, onClear]);

  /**
   * Set maximum number of lines
   * @return {Number}
   */
  const maxNumberOfLines = useMemo(() => {
    if (isComposerFullSize) {
      return 1;
    }
    return maxLines;
  }, [isComposerFullSize, maxLines]);

  const styles = useMemo(() => {
    return StyleSheet.flatten(props.style);
  }, [props.style]);

  return (
    <TextInput
      autoComplete="off"
      placeholderTextColor={'#9AA0A6'}
      ref={textInput}
      rejectResponderTermination={false}
      textAlignVertical="center"
      numberOfLines={maxNumberOfLines}
      style={styles}
      editable={!isDisabled}
    />
  );
}

Composer.defaultProps = {
  forwardedRef: () => {},
  isComposerFullSize: false,
  setIsFullComposerAvailable: () => {},
  isDisabled: false,
  maxLines: 5,
  onClear: () => {},
  shouldClear: false,
};

export default Composer;
