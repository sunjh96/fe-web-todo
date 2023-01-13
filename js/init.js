import { arrCount } from "./arrCount.js";
import { openMenu, closeMenu, ShowLogs } from "./menu.js";
import {
  openItemEditForm,
  cancelItemEditForm,
  editItemEditForm,
} from "./edit.js";
import { openModal, cancelDeteleItem, deleteItem } from "./delete.js";
import { showItems } from "./show.js";
import { openListAddForm, closeListAddForm } from "./addForm.js";
import { openAddColumn, closeAddColumn } from "./column.js";

const clickDocument = () => {
  document.addEventListener("click", (e) => {
    console.log(e.target.className);
    openMenu(e);
    closeMenu(e);
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

init();

export { showItems };
