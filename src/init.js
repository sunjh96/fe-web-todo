import { itemCounter } from './util/itemCounter.js';
import { showItems } from './show.js';
import { addNewCardItem } from './register.js';
import { cardEvent, columnEvent, dragEvent, menuEvent, modalEvent, ShowLogs } from './events/index.js';
import { COLUMN_NAME } from './constants/TODO.js';

const checkInput = () => {
  if (!document.querySelector('.title-input').value && !document.querySelector('.detail-input').value) return;

  document.querySelector('.register-btn').classList.add('active-btn');
};

const init = () => {
  showItems();
  cardEvent();
  columnEvent();
  dragEvent();
  menuEvent();
  modalEvent();
  itemCounter(COLUMN_NAME.TODO);
  itemCounter(COLUMN_NAME.DOING);
  itemCounter(COLUMN_NAME.DONE);
  ShowLogs();
  addNewCardItem();
  checkInput();
};

init();

export { showItems };
