import uuidv1 from "uuid/v1";
import TaskList from "./TaskList";

export interface ITask {
  uuid: string;
  text: string;
  isCompleted: boolean;
  domReference: HTMLDivElement;
  focusNode: HTMLInputElement;
  timeStamp: Date;
  lastEdited: Date;
  taskList: TaskList;
  toggleTask(): void;
  focus(): void;
}

export default class Task implements ITask {
  public static renderTask(task: Task, parent: HTMLDivElement) {
    const divTask: HTMLDivElement = document.createElement("div");
    divTask.className = `task ${task.isCompleted && "task-completed"}`;
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
      const nextTask: Task | boolean = task.taskList.nextTask(task.uuid);
      task.taskList.saveDataToLocalStorage();
      if (ev.keyCode === 13 && task.taskList.getIndex(task.uuid) === task.taskList.tasks.length - 1) {
        // When Enter is pressed, and the cursor is on the last element, create a new task
        task.taskList.addTask();
      } else if (ev.keyCode === 13 && nextTask) {
        // When Enter is pressed and the cursor is not on the last element
        // Focus on the next task
        nextTask.focusNode.focus();
      } else if (ev.keyCode === 8 && task.text.length === 0) {
        ev.preventDefault();
        // When backspace is pressed and there is no text, delete the task
        task.taskList.removeTask(task.uuid);
      }
    });

    parent.appendChild(divTask);
  }

  public text: string;
  public isCompleted: boolean;
  public domReference: HTMLDivElement;
  public timeStamp: Date;
  public taskList: TaskList;
  public lastEdited: Date;
  public uuid: string;
  public focusNode: HTMLInputElement;

  constructor(
    text: string,
    taskList: TaskList,
    isCompleted?: boolean,
    timeStamp?: Date,
    lastEdited?: Date,
    uuid?: string,
  ) {
    this.text = text;
    this.taskList = taskList;
    this.isCompleted = isCompleted || false;
    this.uuid = uuid || uuidv1();
    this.timeStamp = timeStamp || new Date();
    this.lastEdited = lastEdited || this.timeStamp;
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

      this.taskList.saveDataToLocalStorage();
    }
  }

  public focus() {
    return this.focusNode && this.focusNode.focus();
  }
}
