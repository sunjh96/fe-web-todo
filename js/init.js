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
import { changeUpDown } from "./drag.js";

const container = document.querySelector(".container");
const listItem = document.getElementsByClassName(".item-wrapper");
const header = document.querySelector(".header-wrapper");
const menu = document.querySelector(".menu-wrapper");

const clickDocument = () => {
  document.addEventListener("click", (e) => {
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
};

const init = () => {
  showItems();
  clickDocument();
  arrCount(0);
  arrCount(1);
  arrCount(2);
  ShowLogs();
  changeUpDown();
};

init();

export { showItems };
