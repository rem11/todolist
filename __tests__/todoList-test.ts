import {TodoListState} from '../src/const/types';
import todoList, {
  addRecord,
  removeRecord,
  updateRecord,
} from '../src/store/todoList';

const testInitialState: TodoListState = {
  todoList: [
    {
      id: 1,
      text: 'Record 1',
    },
    {
      id: 2,
      text: 'Record 2',
    },
    {
      id: 3,
      text: 'Record 3',
    },
  ],
  latestId: 3,
};

test('test add record', () => {
  expect(todoList(testInitialState, addRecord('Record 4'))).toMatchSnapshot();
});

test('test remove record', () => {
  expect(todoList(testInitialState, removeRecord(2))).toMatchSnapshot();
});

test('test update record', () => {
  expect(
    todoList(
      testInitialState,
      updateRecord({id: 2, text: 'Record 2 (updated)'}),
    ),
  ).toMatchSnapshot();
});
