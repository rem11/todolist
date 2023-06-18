import React, {useCallback, useEffect, useState} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import CommonScreen from '../components/CommonScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../const/types';
import {
  SecurityLevel,
  authenticateAsync,
  getEnrolledLevelAsync,
} from 'expo-local-authentication';
import {startActivityAsync, ActivityAction} from 'expo-intent-launcher';
import {commonStyles} from '../const/styles';
import Button from '../components/Button';
import {useTheme} from '@react-navigation/native';

function LockScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Lock'>): JSX.Element {
  const {colors} = useTheme();
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

  const openDeviceSettings = () => {
    startActivityAsync(ActivityAction.SECURITY_SETTINGS);
  };

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
      <View style={styles.container}>
        {!isEnrolled && (
          <>
            <Text style={[styles.text, {color: colors.text}]}>
              You have to set up an authentication method for your device.
              Please navigate to settings.
            </Text>
            {Platform.OS === 'android' && (
              // Couldn't find any legal way to open Settings on iOS, there're some private
              // deeplinks, but it seems app could be banned for using them.
              <Button
                style={styles.button}
                onPress={openDeviceSettings}
                title="Open settings"
              />
            )}
          </>
        )}
        {!!isEnrolled && (
          <Button
            title="Open TODO List"
            onPress={authenticateAndOpenTodoList}
          />
        )}
      </View>
    </CommonScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  text: {
    textAlign: 'center',
    ...commonStyles.text,
  },
  button: {
    marginTop: 16,
  },
});

export default LockScreen;
