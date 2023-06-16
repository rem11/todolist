import React, {useCallback, useEffect, useState} from 'react';
import {Button, Platform, Text} from 'react-native';
import CommonScreen from '../components/CommonScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../const/types';
import {
  SecurityLevel,
  authenticateAsync,
  getEnrolledLevelAsync,
} from 'expo-local-authentication';
import {startActivityAsync, ActivityAction} from 'expo-intent-launcher';

function LockScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Lock'>): JSX.Element {
  const [isEnrolled, setEnrolled] = useState(false);

  const authenticateAndOpenTodoList = useCallback(async () => {
    const result = await authenticateAsync();
    if (result.success) {
      // Navigation stack is being reset here, because we don't want user navigating back to lock screen
      navigation.reset({
        index: 0,
        routes: [{name: 'TODO List'}],
      });
    } else {
      console.warn(`Authentication attempt failed: ${result.error}`);
    }
  }, [navigation]);

  const openDeviceSettings = useCallback(() => {
    startActivityAsync(ActivityAction.SECURITY_SETTINGS);
  }, []);

  useEffect(() => {
    (async () => {
      // Checking if user has an authentication method set up
      const enrolledLevel = await getEnrolledLevelAsync();
      if (enrolledLevel === SecurityLevel.NONE) {
        setEnrolled(false);
      } else {
        setEnrolled(true);
        // If method is set up, try authenticating user
        authenticateAndOpenTodoList();
      }
    })();
  }, [authenticateAndOpenTodoList]);

  return (
    <CommonScreen>
      {!isEnrolled && (
        <>
          <Text>
            You have to set up an authentication method for your device. Please
            navigate to settings.
          </Text>
          {Platform.OS === 'android' && (
            // Couldn't find any legal way to open Settings on iOS, there're some private
            // deeplinks, but it seems app could be banned for using them.
            <Button title="Open settings" onPress={openDeviceSettings} />
          )}
        </>
      )}
      {!!isEnrolled && (
        <Button title="Open TODO List" onPress={authenticateAndOpenTodoList} />
      )}
    </CommonScreen>
  );
}

export default LockScreen;
