/**
 * Params for the screens from root navigatior
 */
export type RootStackParamList = {
  Lock: undefined;
  'TODO List': undefined;
};

/**
 * State types
 */

export type TodoListState = {
  todoList: Array<TodoRecord>;
  latestId: number;
};

export type TodoRecord = {
  // Need separate id field to be used as
  // key for react components.
  id: number;
  text: string;
};
