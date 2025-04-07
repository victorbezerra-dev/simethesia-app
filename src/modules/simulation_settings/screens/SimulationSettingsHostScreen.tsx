import React, { useRef, useState } from 'react';
import { ScrollView, View, useWindowDimensions, Text, Animated } from 'react-native';
import CustomTabBar from '../components/CustomTabBar';
import PatientDataFormSection from './PatientDataFormSection';
import ChallengesSection from './ChallengesSection';
import StartSimulationButton from '../components/StartSimulationButton';

export default function SimulationSettingsHostScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [settingsData, setSettingsData] = useState(null);
  const [pacienteData, setPacienteData] = useState(null);

  const canSave = !!settingsData && !!pacienteData;

  const goToTab = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  return (
    <View className="flex-1 bg-[#02101F]">
      <Text className="text-center font-bold text-white text-[18px] mb-[10px]">Configurações da Simulação</Text>
      <View className='px-4'>
        <CustomTabBar scrollX={scrollX} onTabChange={goToTab} />
      </View>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        style={{ flex: 1 }}
        scrollEventThrottle={16}
        contentContainerStyle={{ flexGrow: 1 }}

      >
        <View style={{ width, paddingHorizontal: 16 }}>
          <PatientDataFormSection onDataChange={setSettingsData} />
        </View>

        <View style={{ width, paddingHorizontal: 16 }}>
          <ChallengesSection onDataChange={setPacienteData} />
        </View>
      </Animated.ScrollView>

      <StartSimulationButton disabled={!canSave} onPress={() => console.log("Salvar!")} />
    </View>
  );
}
