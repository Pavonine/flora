import {
  ADD_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  UPDATE_TASK_TEXT,
} from "./actions";
import store from "./main";
import Task from "./Task";

const tasksList: HTMLDivElement = document.querySelector("#taskslist");

export interface ITaskList {
  renderTasks(tasks: Task[]): void;
}

export default class TaskList implements ITaskList {
  private domContainer: HTMLDivElement;
  private tasks: Task[];

  constructor(tasks: Task[]) {
    this.domContainer = tasksList;
    this.tasks = tasks;
  }

  public renderTasks(tasks: Task[]) {
    while (this.domContainer.lastChild) {
      this.domContainer.removeChild(this.domContainer.lastChild);
    }

    for (const task of tasks) {
      task.mountTask();
    }
  }
}
