import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ScrollView,
  View,
  Text,
  Animated,
  Keyboard,
  useWindowDimensions,
  Alert,
} from 'react-native';

import CustomTabBar from '../components/CustomTabBar';
import PatientDataFormSection from './PatientDataFormSection';
import ChallengesSection from './ChallengesSection';
import CustomDialog from '@/shared/components/CustomDialog';
import { useDispatch } from 'react-redux';
import { setSimulationSession } from '@/shared/stores/simulationSlice';
import { Gender } from '@/shared/models/PatientData';
import { useChallengeStore } from '../stores/useChallengeStore';
import PatientSummaryCard from '../components/PatientSummaryCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import bluetoothService from '@/shared/services/BluetoothService';
import { requestBlePermissions } from '@/shared/services/BluetoothPermissions';
import CustomPrimaryButton from '../../../shared/components/CustomPrimaryButton';

export default function SimulationSettingsHostScreen() {
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [simulationTimeError, setSimulationTimeError] = useState('');

  const [settingsData, setSettingsData] = useState<{
    gender: Gender;
    age: string;
    weight: string;
    height: string;
  } | null>(null);

  const [showDialog, setShowDialog] = useState(false);
  const [totalSimulationTime, setTotalSimulationTime] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const hasInteracted = useRef(false);

  const challenges = useChallengeStore(state => state.challenges);
  const dispatch = useDispatch();

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const canSave = useMemo(() => {
    return validateSettingsData(settingsData);
  }, [settingsData]);

  useFocusEffect(
    useCallback(() => {
      setShowDialog(false);
      setIsLoading(false);
    }, [])
  );

  useEffect(() => {
    if (!hasInteracted.current) {
      hasInteracted.current = true;
      return;
    }
    const parsed = parseFloat(totalSimulationTime);
    if (!totalSimulationTime || isNaN(parsed) || parsed <= 0) {
      setSimulationTimeError('Informe um tempo válido');
    } else {
      setSimulationTimeError('');
    }
  }, [totalSimulationTime]);

  function validateSettingsData(data: typeof settingsData): boolean {
    if (!data) {
      setIsLoading(false);
      return false;

    }

    const { gender, age, weight, height } = data;

    const isValidGender = gender !== null;
    const isValidAge = !!age && !isNaN(Number(age)) && Number(age) > 0;
    const isValidWeight = !!weight && !isNaN(Number(weight)) && Number(weight) > 0;
    const isValidHeight = !!height && !isNaN(Number(height)) && Number(height) > 0;

    if (isValidGender && isValidAge && isValidWeight && isValidHeight) return true
    setIsLoading(false);
    return false;
  }


  function validateSimulationTime(): boolean {
    const parsed = parseFloat(totalSimulationTime);
    if (!totalSimulationTime || isNaN(parsed) || parsed <= 0) {
      setSimulationTimeError('Informe um tempo válido');
      setIsLoading(false);
      return false;
    } else {
      setSimulationTimeError('');
      return true;
    }
  }

  const goToTab = (index: number) => {
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  function getPatientData() {
    if (!settingsData) {
      return null;
    }
  
    return {
      gender: settingsData!.gender,
      ageInYears: parseInt(settingsData!.age, 10),
      weightInKg: parseFloat(settingsData!.weight),
      heightInMeters: parseFloat(settingsData!.height) / 100.0,
    };
  }

  const handleStartSimulation = async () => {
    try {
      setIsLoading(true);

      const isValidTime = validateSimulationTime();
      if (!isValidTime) return;

      const isValidSettingsForm = validateSettingsData(settingsData);

      if (!isValidSettingsForm) return;


      await requestBlePermissions();
      await bluetoothService.connectToFirstDevice();

      const challengesSerialized = challenges.map(ch => ({
        id: ch.id,
        effect: ch.effect,
        durationInSeconds: ch.durationInSeconds,
        summary: ch.summary,
      }));

      dispatch(setSimulationSession({
        patient: getPatientData()!,
        challenges: challengesSerialized,
        totalSimulationTime: parseFloat(totalSimulationTime),
      }));
      (navigation as any).navigate("SimulationScreen");
    } catch (error) {
      console.error('Falha ao iniciar a simulação:', error);
      Alert.alert('Erro', 'Não foi possível iniciar a simulação.\nVerifique as permissões ou a conexão Bluetooth com o Desktop.');
      setIsLoading(false);
    }
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
          onMomentumScrollBegin={() =>
              Keyboard.dismiss()
          }
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
        onClose={() => {
          setSimulationTimeError('');
          hasInteracted.current = false;
          setShowDialog(false);
          setIsLoading(false);
        }}
        title="Resumo da Simulação"
        icon={<Image source={require('@/assets/icons/icon-rocket.png')} />}
        children={
          <PatientSummaryCard
            totalSimulationTime={totalSimulationTime}
            errorMessage={simulationTimeError}
            patientData={getPatientData()}
            countChallenges={challenges.length}
            onChangeTotalSimulationTime={setTotalSimulationTime}
          />
        }
        actions={
          <CustomPrimaryButton
            label="INICIAR SIMULAÇÃO"
            loading={isLoading}
            disabled={!!simulationTimeError || isLoading}
            marginTop={0}
            marginBottom={15}
            width={'100%'}
            height={36}
            fontSize={15}
            onPress={handleStartSimulation}
          />
        }
      />
    </View>
  );
}
