import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Rive from 'rive-react-native';

export default function HomeScreen() {

  const navigation = useNavigation();


  return (
    <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-[#02101F]">
      <View className="relative w-full h-full mt-[50px]">

        <Image
          className="absolute top-0 left-0 ml-[20px] h-[40px] w-[40px]"
          source={require("@/assets/icons/icon-star.png")}
        />
        <Image
          className="absolute top-0 right-0 mr-[30px] mt-[15px] h-[28px] w-[28px]"
          source={require("@/assets/icons/icon-star.png")}
        />

        <Image
          source={require("@/assets/images/main_burst.png")}
          className="absolute bottom-0 w-full h-full z-0"
          resizeMode="cover"
        />

        <View className="absolute top-0 w-full h-96 flex-col justify-center items-center z-20">
          <View className="transform translate-y-[70] z-30">
            <Text className="text-center mt-10 text-white text-[20px]">
              🔷 Estação Simethesia
            </Text>
            <Rive
              resourceName="bot_animation"
              autoplay
              style={{ width: 250, height: 250 }}
            />
          </View>
          <View className='h-3/5 w-full px-[30px]'>
            <View className="bg-white w-full  p-6 items-center rounded-2xl">
              <Text className="text-gray-800 text-lg font-semibold text-center">
                🧬 Área de acesso liberada.{"\n"}
                O que deseja fazer?
              </Text>

              <View className="space-y-3 w-full mt-[10px]">
                <TouchableOpacity className="bg-[#7C4DFF] flex-row py-3 rounded-xl justify-center items-center mb-[10px]"
                  activeOpacity={0.8}
                  onPress={ () =>  (navigation as any).navigate("SimulationSettings")}
                >
                  <Text className="text-white font-bold">🎮 Começar simulação</Text>
                  <Image
                    source={require("@/assets/icons/icon-park-outline_click-tap.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity className="bg-[#EDE7F6] flex-row items-center justify-center space-x-2 border border-blue-500 px-4 py-3 rounded-xl"
                  activeOpacity={0.5}
                  style={{
                    borderColor: '#7C4DFF',
                  }}>
                  <Text className="text-blue-500 font-semibold">🧬 O que é o Simethesia?</Text>

                </TouchableOpacity>
              </View>

            </View>
            <Image
              className="absolute h-[20px] w-[20px] bottom-0 right-0 mr-[30px] translate-y-[10] translate-x-[20]"
              source={require("@/assets/icons/icon-star.png")}
            />
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}
