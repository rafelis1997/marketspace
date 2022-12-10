import { createBottomTabNavigator, BottomTabNavigationProp  } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator, NativeStackNavigationProp  } from '@react-navigation/native-stack';
import { useTheme } from 'native-base';


import { Home } from '@screens/Home';
import { Platform } from 'react-native';
import { House, Tag } from 'phosphor-react-native';
import { Product } from '@screens/Product';
import { MyProducts } from '@screens/MyProducts';
import { CreateProduct } from '@screens/CreateProduct';

type HomeTabNavigationProps = {
  home: undefined;
  myProducts: undefined;
  
}

type AppRoutes = {
  homeTab: undefined;
  product: undefined;
  newProduct: undefined;
}

export type HomeTabNavigatorRoutesProps = BottomTabNavigationProp<HomeTabNavigationProps>;
export type AppNavigatorRoutesProps = NativeStackNavigationProp<AppRoutes>;

const Tab = createBottomTabNavigator<HomeTabNavigationProps>()
const Stack = createNativeStackNavigator<AppRoutes>()

function HomeTabNavigation() {
  const { sizes, colors } = useTheme();

  const iconSize = sizes[8];

  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: colors.gray[700],
      tabBarInactiveTintColor: colors.gray[300],
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
      <Tab.Screen
        name='home'
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <House weight='bold' size={iconSize} color={color}/>
          )
        }}
      />
      <Tab.Screen
        name='myProducts'
        component={MyProducts}
        options={{
          tabBarIcon: ({color}) => (
            <Tag weight='bold' size={iconSize} color={color}/>
          )
        }}
      />
    </Tab.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen
        name='homeTab'
        component={HomeTabNavigation}
      />
      <Stack.Screen
        name='product'
        component={Product}
      />
      <Stack.Screen
        name='newProduct'
        component={CreateProduct}
      />
    </Stack.Navigator>
  )
}