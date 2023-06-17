import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TodoListState, TodoRecord} from '../const/types';

const initialState: TodoListState = {
  todoList: [],
  latestId: 0,
};

const todoList = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<string>) => {
      state.todoList.push({
        id: ++state.latestId,
        text: action.payload,
      });
    },
    removeRecord: (state, action: PayloadAction<number>) => {
      const index = state.todoList.findIndex(
        record => record.id === action.payload,
      );
      if (index !== -1) {
        state.todoList.splice(index, 1);
      }
    },
    updateRecord: (state, action: PayloadAction<TodoRecord>) => {
      const {id} = action.payload;
      const index = state.todoList.findIndex(record => record.id === id);
      if (index !== -1) {
        state.todoList[index] = action.payload;
      }
    },
  },
});

export const {addRecord, removeRecord, updateRecord} = todoList.actions;

export default todoList.reducer;
