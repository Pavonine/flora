export interface IAction {
  type: string;
  [propName: string]: any;
}

export const ADD_TASK: string = "ADD_TASK";
export const DELETE_TASK: string = "DELETE_TASK";
export const UPDATE_TASK_TEXT: string = "UPDATE_TASK_TEXT";
export const TOGGLE_TASK: string = "TOGGLE_TASK";
