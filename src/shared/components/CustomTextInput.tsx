import React, { useRef, useState } from 'react';
import {
  TextInput,
  TextStyle,
  StyleSheet,
  StyleProp
} from 'react-native';
import { FormFieldWrapper } from './FormFieldWrapper';

export const CustomTextInput = ({
  label,
  icon,
  value,
  placeholder,
  onChange,
  keyboardType = 'default',
  unit,
  inputStyle,
  placeholderTextColor,
  labelStyle,
  errorMessage,
}: {
  label: string;
  icon?: React.ReactNode;
  value: string;
  placeholder?: string;
  onChange: (text: string) => void;
  keyboardType?: 'default' | 'numeric';
  unit?: string;
  inputStyle?: TextStyle;
  placeholderTextColor?: string;
  labelStyle?: StyleProp<TextStyle>;
  errorMessage?: string;
}) => {
  const lastTextLength = useRef(0);
  const [cursorPos, setCursorPos] = useState<{ start: number; end: number }>();
  const [forceCursor, setForceCursor] = useState(false);

  const unitSuffix = unit ? ` ${unit}` : '';
  const displayValue = value.length > 0 ? `${value}${unitSuffix}` : '';

  const handleChangeText = (text: string) => {
    const isDeleting = text.length < lastTextLength.current;
    lastTextLength.current = text.length;

    let numericPart = text;
    if (numericPart.endsWith(unitSuffix)) {
      numericPart = numericPart.slice(0, -unitSuffix.length);
    }
    numericPart = numericPart.replace(/[^0-9]/g, '');

    if (isDeleting && numericPart.length > 0) {
      numericPart = numericPart.slice(0, -1);
    }

    onChange(numericPart);

    if (numericPart === '') {
      setCursorPos({ start: 0, end: 0 });
      setForceCursor(true);
    } else if (isDeleting) {
      const pos = numericPart.length;
      setCursorPos({ start: pos, end: pos });
      setForceCursor(true);
    } else {
      const pos = `${numericPart}${unitSuffix}`.length;
      setCursorPos({ start: pos, end: pos });
      setForceCursor(true);
    }
  };

  return (
    <FormFieldWrapper icon={icon} label={label} labelStyle={labelStyle} errorMessage={errorMessage}>
      <TextInput
        value={displayValue}
        onChangeText={handleChangeText}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor ?? '#999'}
        keyboardType={keyboardType}
        selection={forceCursor ? cursorPos : undefined}
        style={[
          styles.input,
          inputStyle
        ]}
        clearButtonMode="while-editing"
      />
    </FormFieldWrapper>
  );
};

const styles = StyleSheet.create({
  input: {
    textAlign: 'left',
    width: '100%',
    color: '#BFC4C9',
    minHeight: 26,
  },
});

export default CustomTextInput;
