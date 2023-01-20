import { arrCount } from "./util/arrCount.js";
import { openMenu, closeMenu, ShowLogs } from "./menu.js";
import {
  openItemEditForm,
  cancelItemEditForm,
  editItemEditForm,
} from "./edit.js";
import { openModal, cancelDeteleItem, deleteItem } from "./delete.js";
import { showItems } from "./show.js";
import { openListAddForm, closeListAddForm } from "./view/itemForm.js";
import { openAddColumn, closeAddColumn, addColumn } from "./column.js";
import { mousedown, mouseup, mousemove } from "./dragEvent.js";

const container = document.querySelector(".container");
const header = document.querySelector(".header-wrapper");
const menu = document.querySelector(".menu-wrapper");

const clickDocument = () => {
  document.addEventListener("click", (e) => {
    console.log(e.target.className);
    openItemEditForm(e);
    cancelItemEditForm(e);
    openModal(e);
    cancelDeteleItem(e);
    deleteItem(e);
    editItemEditForm(e);
    openListAddForm(e);
    closeListAddForm(e);
    openAddColumn(e);
    closeAddColumn(e);
    addColumn(e);
  });
  header.addEventListener("click", (e) => {
    openMenu(e);
  });
  menu.addEventListener("click", (e) => {
    closeMenu(e);
  });
  container.addEventListener("mousedown", (e) => {
    mousedown(e);
  });
  container.addEventListener("mousemove", (e) => {
    mousemove(e);
  });
  container.addEventListener("mouseup", (e) => {
    mouseup(e);
  });
};

const init = () => {
  showItems();
  clickDocument();
  arrCount(0);
  arrCount(1);
  arrCount(2);
  ShowLogs();
};

const checkInput = () => {
  if (
    document.querySelector(".title-input").value ||
    document.querySelector(".title-input").value
  ) {
    console.log("ge");
    document.querySelector(".register-btn").classList.add("active-btn");
  }
};

init();
checkInput();

export { showItems };
