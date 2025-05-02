import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  SharedValue,
  useAnimatedProps,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { Circle } from '@shopify/react-native-skia';
import { CartesianChart, Line, useChartPressState } from 'victory-native';
import bluetoothService from '@/shared/services/MockBluetoothService';
import { setSimulationResult } from '@/shared/stores/simulationSlice';
import { RootState } from '@/shared/stores/stores';
import { SimulationSample } from '@/shared/models/SimulationSample';
import { useFont } from '@shopify/react-native-skia';
import CustomPrimaryButton from '@/shared/components/CustomPrimaryButton';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="white" />;
}

function safeFormatTime(value: number): string {
  try {
    return `${value / 1000}`;
  } catch {
    return '';
  }
}

export default function SimulationScreen() {
  const session = useSelector((state: RootState) => state.simulation.session);
  const [samples, setSamples] = useState<SimulationSample[]>([]);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [formattedTime, setFormattedTime] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const bluetooth = bluetoothService;
  const font = useFont(require("../../../styles/fonts/Roboto-Regular.ttf"), 12);

  const { state, isActive } = useChartPressState({
    x: 0,
    y: { BISValue: 0, infusionRate: 0 },
  });

  const animatedValueText = useAnimatedProps(() => ({
    text: `BIS: ${state.y.BISValue.value.value.toFixed(0)}\nPropofol: ${state.y.infusionRate.value.value.toFixed(2)}`,
    defaultValue: '',
  }));

  const updateFormattedTime = (value: number) => {
    setFormattedTime(safeFormatTime(value));
  };

  useAnimatedReaction(
    () => {
      return state.x.value.value;
    },
    (value) => {
      runOnJS(updateFormattedTime)(value);
    },
    [state.x.value]
  );


  useEffect(() => {
    if (!session) return;

    let isMounted = true;

    (async () => {
      try {
        await bluetooth.connectToFirstDevice();

        bluetooth.listenForResponses((message) => {
          const parts = message.split(',');
          if (parts.length >= 3) {
            const parsedTimestamp = parseFloat(parts[0]);
            const parsedBis = parseFloat(parts[1]);
            const parsedInfusionRate = parseFloat(parts[2]);

            if (!isNaN(parsedTimestamp) && !isNaN(parsedBis) && !isNaN(parsedInfusionRate) && isMounted) {
              setSamples(prev => {
                const windowSizeMs = 30 * 1000;
                const now = parsedTimestamp;
                const updated = [
                  ...prev,
                  {
                    timestamp: parsedTimestamp,
                    BISValue: parsedBis,
                    infusionRate: parsedInfusionRate,
                  },
                ];
                return updated.filter(s => now - s.timestamp <= windowSizeMs);
              });
            }
          }
        });

        const p = session.patient;
        const cmd = `patient ${p.gender === 'Masculino' ? 'M' : 'F'} ${p.weightInKg} ${p.heightInMeters * 100} ${p.ageInYears}`;
        await bluetooth.sendCommand(cmd);
        await bluetooth.sendCommand('start');
      } catch (err) {
        console.error('Failed to start simulation:', err);
      }
    })();

    return () => {
      isMounted = false;
      bluetooth.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!session || samples.length === 0) return;

    const lastTimestamp = samples[samples.length - 1].timestamp;
    const totalTimeMs = session.totalSimulationTime * 1000;

    if (lastTimestamp >= totalTimeMs) {
      finishSimulation();
      return;
    }

    const challenge = session.challenges[currentChallengeIndex];
    if (challenge && lastTimestamp >= sumPreviousChallengesTime(currentChallengeIndex) * 1000) {
      bluetooth.sendCommand(`challenge ${challenge.effect.code}`);
      setCurrentChallengeIndex(prev => prev + 1);
    }
  }, [samples]);

  const sumPreviousChallengesTime = (index: number) => {
    return session!.challenges.slice(0, index).reduce((acc, curr) => acc + curr.durationInSeconds, 0);
  };

  const finishSimulation = async () => {
    await bluetooth.sendCommand('stop');
    dispatch(setSimulationResult({ samples }));
    (navigation as any).replace('SimulationMetricsScreen');
  };

  if (!session || samples.length < 2) {
    return (
      <View className="flex-1 items-center justify-center bg-[#02101F]">
        <Text className="text-white">Aguardando amostras da simulação...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#02101F]">
      <ScrollView className="flex-1 p-4">
        <Text className="text-white text-2xl font-bold mb-4 text-center">🔷 Simulação em Andamento</Text>

        <View style={{ marginBottom: 16 }}>
          <InfoRow emoji="🕒" label="Tempo da simulação em andamento:" value={`${Math.floor(samples[samples.length - 1]?.timestamp / 1000)}s`} />
          <InfoRow emoji="💬" label="Estado atual do paciente:" value="Consciente" />
          <InfoRow emoji="💉" label="Evento clínico:" value={session.challenges[currentChallengeIndex - 1]?.effect.label || 'Nenhum'} />
        </View>

        {isActive && (
            <AnimatedTextInput
              editable={false}
              style={{ fontSize: 16, fontWeight: 'bold', color: 'white' }}
              animatedProps={animatedValueText}
              underlineColorAndroid="transparent"
            />
        )}

        <View style={{ width: 280, height: 220 }}>
          <Legend />
          <CartesianChart
            data={samples}
            xKey="timestamp"
            yKeys={['BISValue', 'infusionRate']}
            chartPressState={state}
            axisOptions={{
              tickCount: 8,
              font: font,
              labelPosition: 'outset',
              labelOffset: { x: 6, y: 6 },
              formatXLabel: t => safeFormatTime(t),
              formatYLabel: v => v.toFixed(0),
              labelColor: 'white',
              lineColor: '#555',
            }}
          >
            {({ points }) => (
              <>
                <Line points={points.BISValue} color="#00BFFF" strokeWidth={3} />
                <Line points={points.infusionRate} color="#FF6347" strokeWidth={3} />
                {isActive && (
                  <>
                    <ToolTip x={state.x.position} y={state.y.BISValue.position} />
                    <ToolTip x={state.x.position} y={state.y.infusionRate.position} />
                  </>
                )}
              </>
            )}
          </CartesianChart>
        </View>
      </ScrollView>

      <View style={{ padding: 12 }}>
        <CustomPrimaryButton
          label="PARAR SIMULAÇÃO"
          backgroundColor="#FF4C4C"
          onPress={finishSimulation}
        />
      </View>
    </View>
  );
}

function InfoRow({ emoji, label, value }: { emoji: string; label: string; value: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
      <Text style={{ color: 'white', fontSize: 14 }}>{emoji}</Text>
      <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold', marginLeft: 6, textDecorationLine: 'underline' }}>{label}</Text>
      <Text style={{ color: 'white', fontSize: 14, marginLeft: 4 }}>{value}</Text>
    </View>
  );
}

function Legend() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12, gap: 16, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#00BFFF', marginRight: 6 }} />
        <Text style={{ color: 'white' }}>BIS</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#FF6347', marginRight: 6 }} />
        <Text style={{ color: 'white' }}>Propofol</Text>
      </View>
    </View>
  );
}
