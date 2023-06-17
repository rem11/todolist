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

export type TodoListState = Array<TodoRecord>;

export type TodoRecord = {
  // Need separate id field to be used as
  // key for react components.
  id: string;
  text: string;
};
