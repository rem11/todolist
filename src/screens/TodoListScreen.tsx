import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonScreen from '../components/CommonScreen';
import {useAppDispatch, useAppSelector} from '../store/store';
import {addRecord, removeRecord, updateRecord} from '../store/todoList';
import {TodoRecord} from '../const/types';

function TodoListScreen(): JSX.Element {
  const records = useAppSelector(state => state.todoList);
  const dispatch = useAppDispatch();

  // Local states for the screen
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [inputText, setInputText] = useState<string>('');

  const onRecordPress = (record: TodoRecord) => () => {
    setSelectedId(record.id);
    setInputText(record.text);
  };

  const onUpdatePress = () => {
    if (selectedId) {
      // Update record in store
      dispatch(
        updateRecord({
          id: selectedId,
          text: inputText,
        }),
      );
      // Clear selection and input
      onCancelPress();
    }
  };

  const onCancelPress = () => {
    setSelectedId(null);
    setInputText('');
  };

  const onAddPress = () => {
    dispatch(addRecord(inputText));
    setInputText('');
  };

  return (
    <CommonScreen>
      <ScrollView>
        {records.map(record => (
          <View key={record.id}>
            <TouchableOpacity onPress={onRecordPress(record)}>
              <Text>{record.text}</Text>
            </TouchableOpacity>
            <Button
              title="Remove"
              onPress={() => dispatch(removeRecord(record.id))}
            />
          </View>
        ))}
        <View>
          <TextInput
            onChangeText={setInputText}
            defaultValue={inputText}
            placeholder="Input here"
          />
          {!!selectedId && (
            <>
              <Button title="Update" onPress={onUpdatePress} />
              <Button title="Cancel" onPress={onCancelPress} />
            </>
          )}
          {!selectedId && <Button title="Add" onPress={onAddPress} />}
        </View>
      </ScrollView>
    </CommonScreen>
  );
}

export default TodoListScreen;
