import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import todoList from './todoList';

export const store = configureStore({
  reducer: todoList,
});

// Get root state and dispatch types from store
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Define typed hooks with them
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
