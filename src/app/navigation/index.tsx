import HomeScreen from '@/modules/home/screens/HomeScreen'
import AddNewChallenge from '@/modules/simulation_settings/screens/AddNewChallenge'
import SimulationSettingsHostScreen from '@/modules/simulation_settings/screens/SimulationSettingsHostScreen'
import SplashScreen from '@/modules/splash_screen/screens/SplashScreen'
import CustomBackButton from '@/shared/components/CustomBackButton'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const Stack = createNativeStackNavigator()

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Splash"
      screenOptions={
        {
          headerTitle: () => null,
          headerStyle: {
            backgroundColor: '#02101F',
          },
          headerLeft: () => <CustomBackButton />,
        }}>
      <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}} />
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name="SimulationSettings" component={SimulationSettingsHostScreen} />
      <Stack.Screen name="AddNewChallenge" component={AddNewChallenge} />
    </Stack.Navigator>
  )
}