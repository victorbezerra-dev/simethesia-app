import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      (navigation as any).replace('Home');
    }, 7000); 

    return () => clearTimeout(timer); 
  }, []);

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
          className="absolute left-1/2 top-1/2 translate-y-[-80%] -translate-x-1/2 z-10 w-[250px] h-[250px]"
          resizeMode="contain"
        />
        <Text className="text-[22px] text-[#C9DBFF] text-center font-[Poppins_400Regular] font-bold mt-28">
          Aprenda controle na veia.{"\n"}Literalmente. </Text>

     
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
