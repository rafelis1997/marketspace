import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Karla_400Regular, Karla_700Bold } from '@expo-google-fonts/karla';

import { THEME } from './src/theme';
import { Loading } from '@components/Loading';
import { Routes } from '@routes/index';
import { AuthContextProvider } from '@contexts/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold })

  return (
    <NativeBaseProvider theme={THEME}>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar style="light" translucent backgroundColor='transparent'/>
        <AuthContextProvider >
          {!fontsLoaded ? <Loading /> : (
            <Routes />
          )}
        </AuthContextProvider>
      </GestureHandlerRootView> 
    </NativeBaseProvider>
  );
}
