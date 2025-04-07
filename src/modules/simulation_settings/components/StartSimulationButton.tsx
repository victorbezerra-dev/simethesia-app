import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

type Props = {
  disabled: boolean;
  onPress: () => void;
};

export default function StartSimulationButton({ disabled, onPress }: Props) {
  return (
    <View className='mx-[20px]'>
      <TouchableOpacity
        className={`w-full mb-[20px] py-5 rounded-[50px] mt-4 ${disabled ? "bg-gray-300" : "bg-[#3E6DFF]"}`}
        disabled={disabled}
        onPress={onPress}
      >
        <Text className="text-center text-white font-bold text-base">INICIAR</Text>
      </TouchableOpacity>
    </View>

  );
}