import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore} from '@reduxjs/toolkit';
import todoList from './todoList';

// Configure redux-persist to persist state in AsyncStorage
const persistConfig = {
  key: 'todoList',
  storage: AsyncStorage,
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, todoList),
  middleware: [],
});

export const persistor = persistStore(store);

// Get root state and dispatch types from store
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// Define typed hooks with them
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
