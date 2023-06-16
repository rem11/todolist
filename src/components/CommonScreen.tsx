import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {COLOR_BLACK, COLOR_WHITE} from '../const/colors';

/**
 * Component including some components used in all screens
 */
function CommonScreen({children}: PropsWithChildren): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLOR_BLACK : COLOR_WHITE,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {children}
    </SafeAreaView>
  );
}

export default CommonScreen;
