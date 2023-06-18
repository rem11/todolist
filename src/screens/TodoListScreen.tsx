import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonScreen from '../components/CommonScreen';
import {useAppDispatch, useAppSelector} from '../store/store';
import {addRecord, removeRecord, updateRecord} from '../store/todoList';
import {TodoRecord} from '../const/types';
import {useTheme} from '@react-navigation/native';
import Button from '../components/Button';
import {commonStyles} from '../const/styles';

function TodoListScreen(): JSX.Element {
  const records = useAppSelector(state => state.todoList);
  const {colors} = useTheme();
  const dispatch = useAppDispatch();

  // Local states for the screen
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [inputText, setInputText] = useState<string>('');

  const onRecordPress = (record: TodoRecord) => () => {
    setSelectedId(record.id);
    setInputText(record.text);
  };

  const onRemovePress = (recordId: number) => () => {
    dispatch(removeRecord(recordId));
    // Should clear selection as well
    if (selectedId === recordId) {
      onCancelPress();
    }
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
      <ScrollView style={styles.container}>
        {records.map(record => (
          <TouchableOpacity
            key={record.id}
            style={[styles.card, {backgroundColor: colors.card}]}
            onPress={onRecordPress(record)}>
            <View style={styles.textContainer}>
              <Text style={[commonStyles.text, {color: colors.text}]}>
                {record.text}
              </Text>
            </View>
            <Button
              style={styles.removeButton}
              title="Remove"
              onPress={onRemovePress(record.id)}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setInputText}
          defaultValue={inputText}
          placeholder="Input here"
        />
        {!!selectedId && (
          <>
            <Button
              style={styles.inputButon}
              title="Update"
              onPress={onUpdatePress}
            />
            <Button
              style={styles.inputButon}
              title="Cancel"
              onPress={onCancelPress}
            />
          </>
        )}
        {!selectedId && (
          <Button style={styles.inputButon} title="Add" onPress={onAddPress} />
        )}
      </View>
    </CommonScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    marginTop: 16,
    padding: 8,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  removeButton: {
    marginLeft: 16,
  },
  textContainer: {
    flex: 1,
  },
  inputContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  inputButon: {
    marginLeft: 16,
  },
});

export default TodoListScreen;
