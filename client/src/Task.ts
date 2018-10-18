const tasksList: HTMLDivElement = document.querySelector("#taskslist");
const tasksData: object = JSON.parse(localStorage.getItem("taskslist")) || [];

export interface ITask {
  task: string;
  isCompleted: boolean;
  domReference: HTMLDivElement;
  readonly timeStamp: Date;
  lastEdited: Date;
  toggleTask(): void;
  editTask(task: string): Task;
}

export default class Task implements ITask {
  public task: string;
  public isCompleted: boolean = false;
  public domReference: HTMLDivElement;
  public readonly timeStamp: Date;
  public lastEdited: Date;

  constructor(text: string) {
    this.task = text;

    const divTask = document.createElement("div");
    divTask.className = "task";
    const divTaskCheckbox = document.createElement("div");
    divTaskCheckbox.className = "task-checkbox";
    const inputTaskContent = document.createElement("input");
    inputTaskContent.type = "text";
    inputTaskContent.className = "task-content";
    inputTaskContent.contentEditable = "true";

    inputTaskContent.textContent = text;

    divTask.appendChild(divTaskCheckbox);
    divTask.appendChild(inputTaskContent);
    this.domReference = divTask;
    tasksList.appendChild(divTask);

    divTaskCheckbox.addEventListener("click", () => this.toggleTask());
    inputTaskContent.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.keyCode === 13) {
        const newTask: Task = new Task("");
        const newTaskContent: HTMLInputElement = newTask.domReference.querySelector(".task-content");
        newTaskContent.focus();
      }
    });
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

}
