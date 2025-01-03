import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {createNativeStackNavigator  } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import SingIn from '@/Screen/SingIn';
import LogIn from '@/Screen/LogIn';
import Verification from '@/Screen/Verification';
import Tabbar from '@/Screen/Tabbar';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Tabbar'>
        <Stack.Screen name='SingUp' component={SingIn}/>
        <Stack.Screen name='LogIn' component={LogIn}/>
        <Stack.Screen name='Verification' component={Verification}/>
        <Stack.Screen name='Tabbar' component={Tabbar}/>
      </Stack.Navigator>
    </ThemeProvider>
  );
}
