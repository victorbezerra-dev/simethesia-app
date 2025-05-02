import React from 'react';
import { TouchableOpacity, Text, View, ViewStyle, DimensionValue, ActivityIndicator } from 'react-native';

type Props = {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  height?: number;
  width?: DimensionValue;
  marginHorizontal?: number;
  marginBottom?: number;
  marginTop?: number;
  backgroundColor?: string;
  fontSize?: number;
};

export default function CustomPrimaryButton({
  label,
  disabled = false,
  loading = false, 
  onPress,
  height = 56,
  width = '100%',
  marginHorizontal = 20,
  marginBottom = 20,
  marginTop = 16,
  fontSize = 16,
  backgroundColor
}: Props) {
  const isDisabled = disabled || loading;

  const buttonStyle: ViewStyle = {
    height,
    width,
    marginHorizontal,
    marginBottom,
    marginTop,
    backgroundColor: isDisabled
      ? '#D1D5DB'
      : backgroundColor ?? '#3E6DFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  };

  return (
    <View style={{ marginHorizontal }}>
      <TouchableOpacity
        style={buttonStyle}
        disabled={isDisabled}
        onPress={onPress}
      >
         {loading ? (
          <ActivityIndicator size="small" color="#ffffff" />
        ) : (
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize, textAlign: 'center' }}>
            {label}
          </Text>)}
      </TouchableOpacity>
    </View>
  );
}
