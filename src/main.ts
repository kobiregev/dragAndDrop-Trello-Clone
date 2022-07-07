import setupDnd from "./dragAndDrop/dragAndDrop";
import { dragEndEvent } from "./dragAndDrop/types";
import { List, Task } from "./types";
import { v4 as uuidv4, v4 } from "uuid";
import "./style.css";

const lanes = document.querySelector<HTMLDivElement>(".lanes");
const defaultLists: List[] = [
  {
    id: uuidv4(),
    tasks: [{ id: v4(), body: "Finish this trello clone" }],
    title: "Backlog",
  },
  {
    id: uuidv4(),
    tasks: [
      { id: v4(), body: "Upload To the web" },
      { id: v4(), body: "Learn GraphQl" },
    ],
    title: "To Do Today",
  },
  { id: uuidv4(), tasks: [], title: "Done Today" },
];
const setupLists = () => {
  const lists = localStorage.getItem("lists");
  return lists ? JSON.parse(lists) : defaultLists;
};
const createTask = (task: Task) => {
  const element = document.createElement("div");
  element.dataset.draggable = "";
  element.classList.add("task");
  element.innerText = task.body;
  return element;
};

const renderLists = (lists: List[]) => {
  lists.forEach((list) => {
    const listElement = document.createElement("div");
    const headerElement = document.createElement("div");
    const tasksElement = document.createElement("div");

    listElement.classList.add("lane");
    headerElement.classList.add("header");
    headerElement.innerText = list.title;
    tasksElement.classList.add("tasks");
    tasksElement.dataset.dropZone = "";
    listElement.append(headerElement, tasksElement);

    list.tasks?.forEach((task) => {
      const element = createTask(task);
      tasksElement.appendChild(element);
    });

    lanes?.appendChild(listElement);
  });
};

const lists: List[] = setupLists();

const onDragComplete = (event: dragEndEvent) => {
};

renderLists(lists);
setupDnd(onDragComplete);
