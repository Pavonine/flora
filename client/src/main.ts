
import "./style.pcss";
import "./assets/logo-192.png";
import "./assets/logo-512.png";
import TaskList from "./TaskList";

if (module.hot) {
  module.hot.accept();
}

const taskList = new TaskList();

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js")
      .then((reg: ServiceWorkerRegistration) => {
        console.log("Registration successful!", reg);
      })
      .catch((e: Error) => {
        console.error("Service Worker Registration Failed", e.stack);
      });
  })
}