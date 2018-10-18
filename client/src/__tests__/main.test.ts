import { getByText } from "dom-testing-library";
import Task from "../Task";

const t1: Task = new Task("Hello world");

test("Task", () => {
  expect(t1).toBeInstanceOf(Task);
  expect(t1.text).toEqual("Hello world");
  expect(t1.isCompleted).toBeFalsy();
  expect(t1.domReference).toBeInstanceOf(HTMLDivElement);
  expect(t1.timeStamp).toBeInstanceOf(Date);
  expect(t1.lastEdited).toBeInstanceOf(Date);
  expect(t1.toggleTask).toBeDefined();
  expect(t1.editTask).toBeDefined();
});

test("Task#toggleTask", () => {
  expect(t1.isCompleted).toBeFalsy();
  t1.toggleTask();
  expect(t1.isCompleted).toBeTruthy();
  t1.toggleTask();
  expect(t1.isCompleted).toBeFalsy();
});

test("Task#editTask", () => {
  t1.editTask("Hella fun");
  expect(t1.text).toEqual("Hella fun");
  expect(t1.lastEdited).not.toEqual(t1.timeStamp);
});
