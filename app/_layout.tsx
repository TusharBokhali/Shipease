import React, { useState } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import SingIn from '@/Screen/SingIn';
import LogIn from '@/Screen/LogIn';
import Verification from '@/Screen/Verification';
import Tabbar from '@/Screen/Tabbar';
import ProductDetails from '@/Screen/ProductDetails';
import Loader from '@/Screen/Loader';
import ListPage from '@/Screen/ListPage';
import Modal from '@/Screen/Modals';
import Modals from '@/Screen/Modals';
import FlashMessage from 'react-native-flash-message';
import CheckOut from '@/Screen/CheckOut';
import Payments from '@/Screen/Payments';
import { CartContext, InterNetOff } from '@/contexts/CartContext'
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { AllGetCart } from './ApiService';
import store from '@/store'
import { Provider } from 'react-redux'
import { setCartItems } from '@/store/slices/cartSlice';
import InitialLoad from './InitialLoad';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [AllCart, setAllCart] = useState<any[]>([])
  const [internet, setInternet] = useState<boolean>(false)
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: true,
  });

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      GetCartRecords()
    }
  }, [loaded]);

  const GetCartRecords = async () => {
    
  }

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <InterNetOff.Provider value={{ internet, setInternet }}>
        <Provider store={store}>
          <CartContext.Provider value={{ AllCart, setAllCart, GetCartRecords }}>
            <InitialLoad>
              <FlashMessage position="bottom" />
              <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Tabbar'>
                <Stack.Screen name='SingUp' component={SingIn} />
                {/* <Stack.Screen name='LogIn' component={LogIn} options={{ presentation: "modal", headerShown: 
          false, animationTypeForReplace: "push"}} /> */}
                <Stack.Screen name='LogIn' component={LogIn} />
                <Stack.Screen name='Verification' component={Verification} />
                <Stack.Screen name='Tabbar' component={Tabbar} />
                <Stack.Screen name='ProductDetails' component={ProductDetails} />
                <Stack.Screen name='Loader' component={Loader} />
                <Stack.Screen name='ListPage' component={ListPage} />
                <Stack.Screen name='CheckOut' component={CheckOut} />
                <Stack.Screen name='Payments' component={Payments} />
              </Stack.Navigator>
            </InitialLoad>
          </CartContext.Provider>
        </Provider>
      </InterNetOff.Provider>
    </ThemeProvider>
  );
}
