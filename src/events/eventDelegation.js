import { onClickCardAddButton, onClickCardAddFormCloseButton } from '../view/itemForm.js';
import { openColumnModal, closeColumnModal, onClickColumnAddButton } from './columnEvent.js';
import { mousedown, mouseup, mousemove } from './dragEvent.js';
import { openMenu, closeMenu } from './menu.js';
import { onClickCardEditButton, onClickCardEditCancelButton, onSubmitEditCardData } from './edit.js';
import { openCardModal, closeCardModal, onSubmitDeleteCard } from './delete.js';

const container = document.querySelector('.container');
const header = document.querySelector('.header-wrapper');
const menu = document.querySelector('.menu-wrapper');

const setEvent = () => {
  document.addEventListener('click', onClickCardEditButton);
  document.addEventListener('click', onClickCardEditCancelButton);
  document.addEventListener('click', openCardModal);
  document.addEventListener('click', closeCardModal);
  document.addEventListener('click', onSubmitDeleteCard);
  document.addEventListener('click', onSubmitEditCardData);
  document.addEventListener('click', onClickCardAddButton);
  document.addEventListener('click', onClickCardAddFormCloseButton);
  document.addEventListener('click', onClickColumnAddButton); //
  document.addEventListener('click', openColumnModal);//
  document.addEventListener('click', closeColumnModal);//

  header.addEventListener('click', openMenu);
  menu.addEventListener('click', closeMenu);

  container.addEventListener('mousedown', mousedown);
  container.addEventListener('mousemove', mousemove);
  container.addEventListener('mouseup', mouseup);
};

export { setEvent };
