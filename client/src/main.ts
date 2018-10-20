import { createStore } from "redux";
import {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  UPDATE_TASK_TEXT,
} from "./actions/index";
import taskReducer from "./reducers/taskReducer";
import "./style.pcss";
import Task from "./Task";

if (module.hot) {
  module.hot.accept();
}

const store = createStore(
  taskReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

store.dispatch({
  text: "Hello world",
  type: ADD_TASK,
});

export default store;
