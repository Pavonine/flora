
import Task from "./Task";

const tasksList: HTMLDivElement = document.querySelector("#taskslist");
const LOCAL_STORAGE_NAME = "taskList";


export interface ITaskList {
  renderTasks(tasks: Task[]): void;
  addTask(text?: string): void;
  removeTask(uuid: string): void;
  nextTask(uuid: string): Task | boolean;
  getIndex(uuid: string): number;
  generateRawData(): any;
  saveDataToLocalStorage(): boolean;
  getRawDataFromLocalStorage(): [] | false;
  generateTasksFromRawData(): boolean;
  tasks: Task[];
}

export default class TaskList implements ITaskList {
  private domContainer: HTMLDivElement;
  public tasks: Task[] = [];
  constructor() {
    this.domContainer = tasksList;

    this.generateTasksFromRawData();
    this.renderTasks(this.tasks);

    if (this.tasks.length === 0) {
      this.addTask();
    }
  }

  public saveDataToLocalStorage() {
    try {
      if (window.localStorage) {
        window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(this.generateRawData()));
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error(e);
    }
  }

  public getRawDataFromLocalStorage() {
    try {
      return window.localStorage ? JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_NAME)) : false;
    } catch (e) {
      console.error(e);
    }
  }

  public generateTasksFromRawData() {
    const rawData = this.getRawDataFromLocalStorage();

    if (rawData) {
      for (const { uuid, text, isCompleted, timeStamp, lastEdited  } of rawData) {
        this.tasks.push(new Task(text, this, isCompleted, timeStamp, lastEdited, uuid));
      }

      return true;
    }

    return false;
  }


  public generateRawData() {
    return this.tasks.map(({
      uuid,
      text,
      isCompleted,
      timeStamp,
      lastEdited,
    }: Task) => ({
      uuid,
      text,
      isCompleted,
      timeStamp,
      lastEdited,
    }))
  }

  public getIndex(uuid: string): number {
    let currentTaskIndex: number = null;
    this.tasks.forEach((task: Task, index: number) => task.uuid === uuid && (currentTaskIndex = index));

    return currentTaskIndex;
  }


  public nextTask(uuid: string) {
    const nextTask: Task | null = this.tasks[this.getIndex(uuid) + 1];
    return nextTask || false;
  }

  public addTask(text?: string) {
    const newTask: Task = new Task(text ? text : "", this);
    this.tasks.push(newTask);
    this.renderTasks(this.tasks);
    newTask.focus();

    this.saveDataToLocalStorage();
  }

  public renderTasks(tasks: Task[]) {
    while (this.domContainer.lastChild) {
      this.domContainer.removeChild(this.domContainer.lastChild);
    }

    for (const task of tasks) {
      Task.renderTask(task, tasksList);
    }
  }

  public removeTask(uuid: string) {
    if (this.tasks.length > 1) {
      let taskIndex: number;
      this.tasks = this.tasks.filter((task: Task, index) => {
        if (task.uuid === uuid) {
          taskIndex = index;
        }
        return task.uuid !== uuid;
      });
      this.renderTasks(this.tasks);
      const previousTask: Task = this.tasks[taskIndex - 1 || 0];
      previousTask.focusNode.focus();
    }
  }
}
