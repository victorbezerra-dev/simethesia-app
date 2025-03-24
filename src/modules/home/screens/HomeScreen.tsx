import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-[#02101F]">
      <Text className='text-center mt-10 text-white text-[20px]'>🔷 Estação Simethesia</Text>
    </SafeAreaView>
  );
}
