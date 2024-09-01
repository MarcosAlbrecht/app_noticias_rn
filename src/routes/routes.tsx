import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from 'native-base';
import {Heart, HouseSimple} from 'phosphor-react-native';
import * as React from 'react';
import Favorites from '../screens/Favorites';
import News from '../screens/News';
import NewsDetail from '../screens/NewsDetail';

const Stack = createStackNavigator();

function NewsStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="news" component={News} />
      <Stack.Screen name="newsDetail" component={NewsDetail} />
    </Stack.Navigator>
  );
}

function FavoritesStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="favorites" component={Favorites} />
      <Stack.Screen name="newsDetail" component={NewsDetail} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const color = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Notícias"
          component={NewsStack}
          options={{
            tabBarIcon: ({}) => <HouseSimple size={25} />,
          }}
        />
        <Tab.Screen
          name="Favoritos"
          component={FavoritesStack}
          options={{
            tabBarIcon: ({}) => <Heart size={25} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
