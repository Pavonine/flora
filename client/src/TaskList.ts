
import Task from "./Task";

const tasksList: HTMLDivElement = document.querySelector("#taskslist");

export interface ITaskList {
  renderTasks(tasks: Task[]): void;
  addTask(text?: string): void;
  removeTask(): void;
}

export default class TaskList implements ITaskList {
  private domContainer: HTMLDivElement;
  private tasks: Task[] = [];

  constructor() {
    this.domContainer = tasksList;
    this.addTask();
  }

  public addTask(text?: string) {
    const newTask: Task = new Task(text ? text : "", this);
    this.tasks.push(newTask);
    this.renderTasks(this.tasks);
    newTask.focus();
  }

  public renderTasks(tasks: Task[]) {
    while (this.domContainer.lastChild) {
      this.domContainer.removeChild(this.domContainer.lastChild);
    }

    for (const task of tasks) {
      Task.renderTask(task, tasksList);
    }
  }

  public removeTask() {
    this.tasks.pop();
    this.renderTasks(this.tasks);
    this.tasks[this.tasks.length - 1].focus();
  }
}
