import { useState } from "react";
import { View, Text, Image } from "react-native";
import { CustomDropdown } from "@/shared/components/CustomDropDown";
import CustomPrimaryButton from "@/shared/components/CustomPrimaryButton";
import { CustomTextInput } from "@/shared/components/CustomTextInput";
import { useChallengeStore } from "../stores/useChallengeStore";
import { effectOptions } from "@/shared/models/EffectOption";
import { useNavigation } from "@react-navigation/native";
import CustomDialog from "@/shared/components/CustomDialog";

export default function AddNewChallenge() {
    const [challengeCode, setChallengeCode] = useState<number | null>(null);
    const [challengeDuration, setChallengeDuration] = useState<string>('');
    const [showDialog, setShowDialog] = useState(false)
    const navigation = useNavigation();
    const addChallenge = useChallengeStore(state => state.addChallenge);

    return (
        <View>
            <Text className="text-white text-xl font-bold text-center">Novo Desafio</Text>
            <View className="m-5">
                <CustomDropdown
                    label="Desafio"
                    value={challengeCode?.toString() ?? null}
                    onChange={(value) => setChallengeCode(Number(value))}
                    icon={
                        <Image
                            source={require('@/assets/icons/icon-gol.png')}
                            style={{ width: 25, height: 25 }}
                        />
                    }
                    options={effectOptions.map(opt => ({
                        label: opt.label,
                        value: opt.code.toString(),
                        description: opt.description
                    }))}
                    customRenderLabel={(item) => (
                        <View className="flex flex-col">
                            <Text className="text-white font-bold text-lg">{item.label}</Text>
                            {item.description && (
                                <Text className="text-gray-400 underline text-xs max-w-[280px]">
                                    {item.description}
                                </Text>
                            )}
                        </View>
                    )}
                    customRenderItem={(item, isSelected) => (
                        <View>
                            <Text style={{
                                color: isSelected ? '#007AFF' : 'black',
                                fontWeight: isSelected ? 'bold' : 'normal'
                            }}>
                                {item.label}
                            </Text>
                            {item.description && (
                                <View className="flex-row">
                                    <Text className="text-gray-500 text-xs underline max-w-[200px]">
                                        Efeito Simulado:{" "}
                                        <Text className="text-gray-500 text-xs max-w-[200px]">
                                            {item.description}
                                        </Text>
                                    </Text>
                                </View>
                            )}
                        </View>
                    )}
                />

                <CustomTextInput
                    label="Tempo"
                    value={challengeDuration}
                    unit="segundos"
                    placeholder="Ex: 20 segundos"
                    onChange={setChallengeDuration}
                    keyboardType="numeric"
                    icon={<Image
                        source={require('@/assets/icons/icon-time.png')}
                        style={{ width: 20, height: 20 }}
                    />}
                />
            </View>

            <CustomPrimaryButton
                label="Adicionar"
                onPress={() => {
                    if (!challengeCode || !challengeDuration) {
                        setShowDialog(true);
                        return;
                    }
                    const selectedEffect = effectOptions.find(opt => opt.code === challengeCode);
                    addChallenge(selectedEffect!, parseInt(challengeDuration, 10));
                    navigation.goBack();
                }}
            />

            <CustomDialog
                visible={showDialog}
                onClose={() => setShowDialog(false)}
                title="Dados Inválidos :("
                icon={
                    <Image
                        source={require('@/assets/icons/icon-form-validation.png')}
                        style={{ width: 100, height: 100 }}
                    />
                }
            >
                <View className="flex flex-col space-y-2 items-center">
                    <Text className="text-base font-semibold text-center text-red-500">
                        Um ou mais dados estão inválidos:
                    </Text>

                    {challengeCode === null && (
                        <Text className="text-red-400">• Selecione o desafio</Text>
                    )}

                    {(!challengeDuration || parseInt(challengeDuration, 10) <= 0) && (
                        <Text className="text-red-400">• Defina o tempo de duração</Text>
                    )}
                </View>
            </CustomDialog>
        </View>
    );
}
