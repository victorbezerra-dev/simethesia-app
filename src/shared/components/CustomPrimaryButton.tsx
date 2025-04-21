import React from 'react';
import { TouchableOpacity, Text, View, ViewStyle, DimensionValue } from 'react-native';

type Props = {
  label: string;
  disabled?: boolean;
  onPress: () => void;
  height?: number;
  width?: DimensionValue;
  marginHorizontal?: number;
  marginBottom?: number;
  marginTop?: number;
  fontSize?: number;
};

export default function CustomPrimaryButton({
  label,
  disabled = false,
  onPress,
  height = 56,
  width = '100%',
  marginHorizontal = 20,
  marginBottom = 20,
  marginTop = 16,
  fontSize = 16,
}: Props) {
  const buttonStyle: ViewStyle = {
    height,
    width,
    marginHorizontal,
    marginBottom,
    marginTop,
    backgroundColor: disabled ? '#D1D5DB' : '#3E6DFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  };

  return (
    <View style={{ marginHorizontal }}>
      <TouchableOpacity
        style={buttonStyle}
        disabled={disabled}
        onPress={onPress}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize, textAlign: 'center' }}>
          {label}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
