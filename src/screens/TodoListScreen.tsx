import React from 'react';
import {Button, ScrollView, Text, View} from 'react-native';
import CommonScreen from '../components/CommonScreen';
import {useAppDispatch, useAppSelector} from '../store/store';
import {removeRecord} from '../store/todoList';

function TodoListScreen(): JSX.Element {
  const records = useAppSelector(state => state.todoList);
  const dispatch = useAppDispatch();

  const onRemovePress = (id: string) => () => {
    dispatch(removeRecord(id));
  };

  return (
    <CommonScreen>
      <ScrollView>
        {records.map(record => (
          <View key={record.id}>
            <Text>{record.text}</Text>
            <Button title="Remove" onPress={onRemovePress(record.id)} />
          </View>
        ))}
      </ScrollView>
    </CommonScreen>
  );
}

export default TodoListScreen;
