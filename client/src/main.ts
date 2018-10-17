import "./style.pcss";

if (module.hot) {
  module.hot.accept();
}

const tasksList: HTMLDivElement = document.querySelector("#taskslist");
const tasksData: object = JSON.parse(localStorage.getItem("taskslist")) || [];

class Task {
  public task: string;
  public isCompleted: boolean = false;
  public domReferance: HTMLDivElement;
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
    this.domReferance = divTask;
    tasksList.appendChild(divTask);

    divTaskCheckbox.addEventListener("click", () => this.toggleTask());
    inputTaskContent.addEventListener("keydown", (ev: KeyboardEvent) => {
      if (ev.keyCode === 13) {
        const newTask: Task = new Task("");
        const newTaskContent: HTMLInputElement = newTask.domReferance.querySelector(".task-content");
        newTaskContent.focus();
      }
    });
  }

  private toggleTask() {
    if (this.domReferance) {
      if (this.isCompleted) {
        this.isCompleted = false;
        this.domReferance.classList.remove("task-completed");
      } else {
        this.isCompleted = true;
        this.domReferance.classList.add("task-completed");
      }
    }
  }

}

const t1 = new Task("Enter your task here!");
