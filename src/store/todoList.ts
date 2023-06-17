import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {TodoListState, TodoRecord} from '../const/types';
import {v4 as uuid} from 'uuid';

const initialState: TodoListState = [
  {id: '1111', text: 'Record 1'},
  {id: '2222', text: 'Record 2'},
  {id: '3333', text: 'Record 3'},
];

const todoList = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<string>) => {
      state.push({
        id: uuid(),
        text: action.payload,
      });
    },
    removeRecord: (state, action: PayloadAction<string>) => {
      const index = state.findIndex(record => record.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    updateRecord: (state, action: PayloadAction<TodoRecord>) => {
      const {id} = action.payload;
      const index = state.findIndex(record => record.id === id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const {addRecord, removeRecord, updateRecord} = todoList.actions;

export default todoList.reducer;
