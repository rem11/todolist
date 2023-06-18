import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

/**
 * Component including some components used in all screens
 */
function CommonScreen({children}: PropsWithChildren): JSX.Element {
  return <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});

export default CommonScreen;
