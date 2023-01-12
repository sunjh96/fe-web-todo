import { todos } from "./data.js";
import { makeCard } from "./template/makeTemplate.js";
import { arrCount } from "./arrCount.js";
import { openMenu, closeMenu, ShowLogs } from "./menu.js";
import { openItemEditForm, closeItemEditForm } from "./edit.js";
import { openModal, closeModal, deleteItem } from "./delete.js";

const toDoList = document.getElementById("item-todo-list"); // 할 일 리스트창
const doingList = document.getElementById("item-doing-list"); // 할 일 리스트창
const doneList = document.getElementById("item-done-list"); // 할 일 리스트창
const condition = ["todo", "doing", "done"];
const columnName = [toDoList, doingList, doneList];
const CONSTANT = [0, 1, 2];

const showItems = () => {
  //toDoList.innerHTML = "";
  todos.map((item) => {
    const card = makeCard({
      title: item.title,
      detail: item.details,
      id: item.id,
    });
    CONSTANT.filter((ele) => item.status === condition[ele]).map((ele) => {
      columnName[ele].insertAdjacentHTML("beforeend", card);
    });
  });
};

const clickDocument = () => {
  document.addEventListener("click", (e) => {
    console.log(e.target.className);
    openMenu(e);
    closeMenu(e);
    openItemEditForm(e);
    closeItemEditForm(e);
    openModal(e);
    closeModal(e);
    deleteItem(e);
  });
};

const init = () => {
  showItems();
  arrCount(0);
  arrCount(1);
  arrCount(2);
  clickDocument();
  ShowLogs();
};

init();

export { showItems };
