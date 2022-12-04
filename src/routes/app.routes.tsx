import { createBottomTabNavigator, BottomTabNavigationProp  } from '@react-navigation/bottom-tabs';
import { useTheme } from 'native-base';


import { Home } from '@screens/Home';
import { Platform } from 'react-native';
import { House } from 'phosphor-react-native';

type AppRoutes = {
  home: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>()

export function AppRoutes() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[8];

  return (
    <Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray[700],
      tabBarInactiveTintColor: colors.gray[200],
      tabBarStyle: {
        backgroundColor: colors.gray[100],
        borderTopWidth: 0,
        height: Platform.OS === "android" ? 'auto' : 96,
        paddingHorizontal: 16,
        paddingBottom: sizes[8],
        paddingTop: sizes[8],
        alignItems: 'center',
      }
    }}>
      <Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <House weight='bold' size={iconSize} color={color}/>
          )
        }}
      />
    </Navigator>
  );
}