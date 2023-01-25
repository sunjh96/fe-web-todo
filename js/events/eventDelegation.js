import { openListAddForm, closeListAddForm } from '../view/itemForm.js';
import { openAddColumn, closeAddColumn, addColumn } from '../column.js';
import { mousedown, mouseup, mousemove } from '../dragEvent.js';
import { openMenu, closeMenu } from '../menu.js';
import { openItemEditForm, cancelItemEditForm, editItemEditForm } from '../edit.js';
import { openModal, cancelDeleteItem, deleteItem } from '../delete.js';

const container = document.querySelector('.container');
const header = document.querySelector('.header-wrapper');
const menu = document.querySelector('.menu-wrapper');

const setEvent = () => {
  document.addEventListener('click', openItemEditForm);
  document.addEventListener('click', cancelItemEditForm);
  document.addEventListener('click', openModal);
  document.addEventListener('click', cancelDeleteItem);
  document.addEventListener('click', deleteItem);
  document.addEventListener('click', editItemEditForm);
  document.addEventListener('click', openListAddForm);
  document.addEventListener('click', closeListAddForm);
  document.addEventListener('click', addColumn);
  document.addEventListener('click', openAddColumn);
  document.addEventListener('click', closeAddColumn);

  header.addEventListener('click', openMenu);
  menu.addEventListener('click', closeMenu);

  container.addEventListener('mousedown', mousedown);
  container.addEventListener('mousemove', mousemove);
  container.addEventListener('mouseup', mouseup);
};

export { setEvent };
