import uuidv1 from "uuid/v1";
import {
  ADD_TASK,
  TOGGLE_TASK,
  UPDATE_TASK_TEXT,
} from "./actions";
import store from "./main";

const tasksList: HTMLDivElement = document.querySelector("#taskslist");
const tasksData: object = JSON.parse(localStorage.getItem("taskslist")) || [];

export interface ITask {
  uuid: string;
  text: string;
  isCompleted: boolean;
  domReference: HTMLDivElement;
  readonly timeStamp: Date;
  lastEdited: Date;
  toggleTask(): void;
  editTask(task: string): Task;
  mountTask(): void;
  unmountTask(): void;
}

export default class Task implements ITask {
  public text: string;
  public isCompleted: boolean = false;
  public domReference: HTMLDivElement;
  public readonly timeStamp: Date;
  public lastEdited: Date;
  public uuid: string;

  constructor(text: string, timeStamp?: Date) {
    this.uuid = uuidv1();
    this.timeStamp = timeStamp ? timeStamp : new Date();
    this.text = text;

    if (!timeStamp) {
      this.mountTask();
    }
  }

  public mountTask() {
    const inputContent = this.generateDom();
    tasksList.appendChild(this.domReference);
    inputContent.focus();
  }

  public unmountTask() {
    this.domReference.remove();
  }

  public toggleTask() {
    if (this.domReference) {
      if (this.isCompleted) {
        this.isCompleted = false;
        this.domReference.classList.remove("task-completed");
      } else {
        this.isCompleted = true;
        this.domReference.classList.add("task-completed");
      }
    }
  }

  public editTask(task: string) {
    return new Task("Hello world");
  }

  private generateDom() {
    const divTask = document.createElement("div");
    divTask.className = "task";
    const divTaskCheckbox = document.createElement("div");
    divTaskCheckbox.className = "task-checkbox";
    const inputTaskContent = document.createElement("input");
    inputTaskContent.type = "text";
    inputTaskContent.className = "task-content";
    inputTaskContent.contentEditable = "true";

    inputTaskContent.value = this.text;

    divTask.appendChild(divTaskCheckbox);
    divTask.appendChild(inputTaskContent);
    this.domReference = divTask;

    divTaskCheckbox.addEventListener("click", () => this.toggleTask());
    inputTaskContent.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.keyCode === 13) {
        store.dispatch({
          text: "",
          type: ADD_TASK,
        });
      } else {
        store.dispatch({
          text: (ev.target as HTMLInputElement).value,
          type: UPDATE_TASK_TEXT,
          uuid: this.uuid,
        });
      }
    });

    return inputTaskContent;
  }
}
