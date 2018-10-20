import {
  ADD_TASK,
  DELETE_TASK,
  IAction,
  TOGGLE_TASK,
  UPDATE_TASK_TEXT,
} from "../actions/index";
import Task from "../Task";
interface IAppState {
  tasks: Task[];
}

const appState: IAppState = {
  tasks: [],
};

function taskReducer(state: IAppState = appState, action: IAction): IAppState {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          new Task(action.text),
        ],
      };
    case UPDATE_TASK_TEXT:
      const taskToUpdate: Task = state.tasks.filter((t) => t.uuid === action.uuid)[0];
      const updatedTask: Task = new Task(action.text, taskToUpdate.timeStamp);
      updatedTask.domReference = taskToUpdate.domReference;
      updatedTask.uuid = taskToUpdate.uuid;
      updatedTask.lastEdited = new Date();
      const inputBox: HTMLInputElement = updatedTask.domReference.querySelector(".task-content");
      inputBox.value = action.text;

      return {
        ...state,
        tasks: [
          updatedTask,
          ...state.tasks.filter((task: Task) => task.uuid !== updatedTask.uuid),
        ],
      };

      return state;
    default:
      return state;
  }
}

export default taskReducer;
