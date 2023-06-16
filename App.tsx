import React, {useEffect, useRef} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import LockScreen from './src/screens/LockScreen';
import TodoListScreen from './src/screens/TodoListScreen';
import {RootStackParamList} from './src/const/types';
import {AppState} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const appState = useRef(AppState.currentState);
  const navigatorRef = useRef<NavigationContainerRef<RootStackParamList>>(null);
  useEffect(() => {
    // Handle application state change, so application is locked when it goes to foreground
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        navigatorRef.current?.reset({
          index: 0,
          routes: [{name: 'Lock'}],
        });
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <NavigationContainer ref={navigatorRef}>
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
