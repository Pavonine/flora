import uuidv1 from "uuid/v1";
import TaskList from "./TaskList";

export interface ITask {
  uuid: string;
  text: string;
  isCompleted: boolean;
  domReference: HTMLDivElement;
  focusNode: HTMLInputElement;
  readonly timeStamp: Date;
  lastEdited: Date;
  readonly taskList: TaskList;
  toggleTask(): void;
  focus(): void;
}

export default class Task implements ITask {
  public static renderTask(task: Task, parent: HTMLDivElement) {
    const divTask: HTMLDivElement = document.createElement("div");
    divTask.className = "task";
    const divTaskCheckbox: HTMLDivElement = document.createElement("div");
    divTaskCheckbox.className = "task-checkbox";
    const inputTaskLabel: HTMLLabelElement = document.createElement("label");
    inputTaskLabel.textContent = "Enter your task";
    inputTaskLabel.htmlFor = `task_${task.uuid}`;
    const inputTaskContent: HTMLInputElement = document.createElement("input");
    inputTaskContent.name = `task_${task.uuid}`;
    inputTaskContent.type = "text";
    inputTaskContent.className = "task-content";
    inputTaskContent.contentEditable = "true";

    inputTaskContent.value = task.text;
    task.focusNode = inputTaskContent;

    divTask.appendChild(divTaskCheckbox);
    divTask.appendChild(inputTaskContent);
    divTask.appendChild(inputTaskLabel);
    task.domReference = divTask;

    divTaskCheckbox.addEventListener("click", () => task.toggleTask());
    inputTaskContent.addEventListener("keydown", (ev: KeyboardEvent) => {
      task.text = (ev.srcElement as HTMLInputElement).value;
      if (ev.keyCode === 13) {
        // When Enter is pressed, create a new task
        task.taskList.addTask();
      } else if (ev.keyCode === 8 && task.text.length === 0) {
        // When backspace is pressed and there is no text, delete the task
        task.taskList.removeTask();
      }
    });

    parent.appendChild(divTask);
  }

  public text: string;
  public isCompleted: boolean = false;
  public domReference: HTMLDivElement;
  public readonly timeStamp: Date;
  public readonly taskList: TaskList;
  public lastEdited: Date;
  public uuid: string;
  public focusNode: HTMLInputElement;

  constructor(text: string, taskList: TaskList) {
    this.uuid = uuidv1();
    this.timeStamp = new Date();
    this.text = text;
    this.taskList = taskList;
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

  public focus() {
    return this.focusNode && this.focusNode.focus();
  }
}
