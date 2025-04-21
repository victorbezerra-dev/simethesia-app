import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  View,
  Text,
  Animated,
  Keyboard,
  useWindowDimensions,
} from 'react-native';

import CustomTabBar from '../components/CustomTabBar';
import PatientDataFormSection from './PatientDataFormSection';
import ChallengesSection from './ChallengesSection';
import CustomDialog from '@/shared/components/CustomDialog';
import CustomPrimaryButton from '../../../shared/components/CustomPrimaryButton';
import PatientCard from '../components/PatientSummaryCard';

export default function SimulationSettingsHostScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;

  const [settingsData, setSettingsData] = useState<{
    gender: string | null;
    age: string;
    weight: string;
    height: string;
  } | null>(null);


  const [showDialog, setShowDialog] = useState(false)

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);


  const canSave = !!settingsData

  const goToTab = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  return (
    <View className="flex-1 bg-[#02101F] relative">
      <View className="flex-1">
        <Text className="text-center font-bold text-white text-[18px] mb-[10px]">
          Configurações da Simulação
        </Text>

        <View className="px-4">
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
          scrollEventThrottle={16}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View style={{ width }} className="px-4">
            <PatientDataFormSection onDataChange={setSettingsData} />
          </View>
          <View style={{ width }} className="px-4">
            <ChallengesSection />
          </View>
        </Animated.ScrollView>
      </View>
      {!keyboardVisible && (
        <CustomPrimaryButton
          label='INICIAR'
          disabled={!canSave}
          onPress={() => setShowDialog(true)}
        />
      )}
      <CustomDialog
        visible={showDialog}
        onClose={() => setShowDialog(false)}
        title="Resumo da Simulação"
        icon={
          <Image
            source={require('@/assets/icons/icon-rocket.png')}
          />
        }
        children={
          <PatientCard />
        }
        actions={
          <CustomPrimaryButton
            label='INICIAR SIMULAÇÃO'
            marginTop={0}
            marginBottom={15}
            width={'100%'}
            height={36}
            fontSize={15}
            disabled={!canSave}
            onPress={() => console.log('Salvar!')}
          />
        }
      />
    </View>
  );
}


