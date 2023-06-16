import React, {useCallback} from 'react';
import {Button} from 'react-native';
import CommonScreen from '../components/CommonScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../const/types';

function LockScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Lock'>): JSX.Element {
  const onOpenTodoListPress = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{name: 'TODO List'}],
    });
  }, [navigation]);
  return (
    <CommonScreen>
      <Button title="Open TODO List" onPress={onOpenTodoListPress} />
    </CommonScreen>
  );
}

export default LockScreen;
