import "./style.pcss";
import Task from "./Task";

if (module.hot) {
  module.hot.accept();
}

const t1 = new Task("Enter your task here!");
