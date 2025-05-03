import { RootState } from '@/shared/stores/stores';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useSimulationMetricsStore } from '../stores/useSimulationMetricsStore';
import { useCallback, useEffect } from 'react';
import { resetSimulation } from '@/shared/stores/simulationSlice';
import { exportSimulationToDownloads } from '../services/ExportSimulationResultService';

export default function SimulationMetricsScreen() {
    const navigation = useNavigation();
    const session = useSelector((state: RootState) => state.simulation.session);
    const dispatch = useDispatch();
    const { iae, ise, tcv, calculateMetricsFromSamples, resetMetrics } = useSimulationMetricsStore(state => state);

    useEffect(() => {
        if (session?.result?.samples) {
            calculateMetricsFromSamples(session.result.samples);
        }
    }, [session?.result?.samples]);

    useFocusEffect(
        useCallback(() => {
            return () => {
                resetMetrics();
                dispatch(resetSimulation());
            };
        }, [dispatch])
    );

    return (
        <View className="flex-1 items-center justify-start bg-[#0b1625] px-2">
            <View className="w-full max-w-md bg-[#0b1625] rounded-2xl p-4 space-y-4">
                <View className="relative">
                    <TouchableOpacity className="absolute right-0 z-10" onPress={navigation.goBack}>
                        <MaterialCommunityIcons name="close" size={24} color="#fff" />
                    </TouchableOpacity>

                    <Text className="text-white mt-8 text-lg font-semibold text-center">
                        📋 Resultado da Simulação
                    </Text>
                </View>
                <Image
                    source={require('@/assets/icons/thumbs-up.png')}
                    className="w-60 h-60 mt-6 self-center"
                    resizeMode="contain" />

                <View className="space-y-2 mt-10">
                    <View className="border border-white/80 rounded overflow-hidden">
                        <View className="flex-row">
                            {['IAE', 'ISE', 'TCV'].map((col, index) => (
                                <View
                                    key={index}
                                    className="flex-1 py-2 px-3 bg-[#062342] border-white/80"
                                    style={{ borderRightWidth: 1, borderBottomWidth: 1 }}>
                                    <Text className="text-center text-white text-sm font-medium">{col}</Text>
                                </View>
                            ))}
                        </View>

                        <View className="flex-row">
                            {[iae, ise, tcv].map((value, index) => (
                                <View
                                    key={index}
                                    className="flex-1 py-2 px-3 bg-[#536F86] border-white/80"
                                    style={index !== 2 ? { borderRightWidth: 1 } : { borderRightWidth: 0 }}
                                >
                                    <Text className="text-center text-white/80 text-sm">{value.toFixed(2)}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            if (session?.result?.samples) {
                                exportSimulationToDownloads(session?.result?.samples)
                            }
                        }}
                        className="mt-6 bg-[#3E6DFF] py-3 px-6 rounded-xl self-center"
                    >
                        <Text className="text-white text-sm font-semibold">Exportar Resultado</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}
