import React, {ForwardedRef, ReactNode, forwardRef, useRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TextInputProps,
  Text,
  Pressable,
} from 'react-native';
import {colors} from '../../constants';
import {mergeRefs} from '../../utils';

interface InputFieldProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  icon?: ReactNode;
}

const InputField = forwardRef(
  (
    {disabled = false, error, touched, icon = null, ...props}: InputFieldProps,
    ref?: ForwardedRef<TextInput>,
  ) => {
    const innerRef = useRef<TextInput | null>(null);

    const handlePressInput = () => {
      innerRef.current?.focus();
    };

    return (
      <Pressable onPress={handlePressInput}>
        <View
          style={[
            styles.container,
            disabled && styles.disabled,
            props.multiline && styles.multiLine,
            touched && Boolean(error) && styles.inputError,
          ]}>
          <View
            style={[styles.innerContainer, Boolean(icon) && styles.withIcon]}>
            {icon}
            <TextInput
              ref={ref ? mergeRefs(innerRef, ref) : innerRef}
              editable={!disabled}
              placeholderTextColor={colors.GRAY_500}
              style={[styles.input, disabled && styles.disabledText]}
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect={false}
              {...props}
            />
          </View>
          {touched && Boolean(error) && (
            <Text style={styles.error}>{error}</Text>
          )}
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: colors.GRAY_200,
    paddingVertical: 12,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  withIcon: {
    gap: 5,
  },
  multiLine: {
    paddingBottom: 30,
  },
  input: {
    fontSize: 16,
    color: colors.BLACK,
    padding: 0,
    flex: 1,
    height: 24, // Fixed height for consistent appearance
  },
  disabled: {
    backgroundColor: 'transparent',
    borderBottomColor: colors.GRAY_300,
  },
  disabledText: {
    color: colors.GRAY_700,
  },
  inputError: {
    borderBottomColor: colors.RED_300,
  },
  error: {
    color: colors.RED_500,
    fontSize: 12,
    paddingTop: 5,
  },
});

export default InputField;
