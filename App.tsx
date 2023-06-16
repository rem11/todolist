import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import LockScreen from './src/screens/LockScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import {RootStackParamList} from './src/const/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  // TODO: add AppState handling so we'd reset to the Lock screen when app goes foreground;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Lock"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Lock" component={LockScreen} />
        <Stack.Screen name="TODO List" component={TodoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
