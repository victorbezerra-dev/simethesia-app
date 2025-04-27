import React, { useEffect, useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  Image, LogBox } from 'react-native';
import { CustomDropdown } from "@/shared/components/CustomDropDown";
import { CustomTextInput } from "@/shared/components/CustomTextInput";

type Props = {
  onDataChange: (data: any) => void;
};

export default function PatientDataFormSection({ onDataChange }: Props) {
  const [gender, setGender] = useState<string | null>(null);
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
  }, [])

  useEffect(() => {
    onDataChange({ gender, age, weight, height });
  }, [gender, age, weight, height]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ padding: 16 }}
      keyboardShouldPersistTaps="handled"
    >
      <CustomDropdown
        label="Sexo"
        value={gender}
        onChange={setGender}
        options={[
          { label: 'Masculino', value: 'Masculino' },
          { label: 'Feminino', value: 'Feminino' },
        ]}
        icon={
          <Image
            source={require('@/assets/icons/icon-gender.png')}
            style={{ width: 25, height: 18 }}
          />
        }
      />

      <CustomTextInput
        label="Idade"
        value={age}
        unit="anos"
        placeholder="Ex: 32 anos"
        onChange={setAge}
        keyboardType="numeric"
        icon={
          <Image
            source={require('@/assets/icons/icon_birthday-cake.png')}
            style={{ width: 20, height: 20 }}
          />
        }
      />

      <CustomTextInput
        label="Peso"
        value={weight}
        unit="kg"
        placeholder="Ex: 52 kg"
        onChange={setWeight}
        keyboardType="numeric"
        icon={
          <Image
            source={require('@/assets/icons/icon_balance.png')}
            style={{ width: 20, height: 20 }}
          />
        }
      />

      <CustomTextInput
        label="Altura"
        value={height}
        unit="m"
        placeholder="Ex: 1.52 m"
        onChange={setHeight}
        keyboardType="numeric"
        icon={
          <Image
            source={require('@/assets/icons/icon_straight-ruler.png')}
            style={{ width: 20, height: 20 }}
          />
        }
      />
    </KeyboardAwareScrollView>
  );
}
