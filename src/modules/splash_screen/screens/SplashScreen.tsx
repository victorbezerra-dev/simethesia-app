import React from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashScreen() {

  return (
    <SafeAreaView className="flex-1 bg-[#02101F]">
      <View className="flex-1 items-center justify-center relative">

        <Image
          source={require('@/assets/images/light_burst.png')}
          className="absolute left-1/2 top-1/2 translate-y-[-26%] -translate-x-1/2 z-0 w-[700px]"
          resizeMode="contain"
        />

        <Image
          source={require('@/assets/images/simethesia-logo.png')}
          className="absolute left-1/2 top-1/2 translate-y-[-110%] -translate-x-1/2 z-10 w-[200px] h-[200px]"
          resizeMode="contain"
        />

        <View className="absolute left-1/2 top-1/2 translate-y-[30%] -translate-x-1/2 z-20 items-center">
          <Text className="text-[#C9DBFF] text-center text-[40px] font-bold">
            Simethesia
          </Text>
          <Text className="text-[20px] text-[#7C869A] text-center font-[Poppins_400Regular] mt-2">
            Aprenda controle na veia.{"\n"}Literalmente. </Text>
        </View>
        <View className="absolute bottom-0">
          <LottieView
            source={require('@/assets/animations/loading.json')}
            autoPlay
            loop
            style={{ width: 150, height: 150 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
