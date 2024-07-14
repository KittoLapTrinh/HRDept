import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserList from './components/UserList';
import Home from './components/Home';
import UserEdit from './components/UserEdit';
import Login from './components/Login';
import { UserProvider } from './contexts/UserContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="UserList" component={UserList} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="UserEdit" component={UserEdit} />
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
