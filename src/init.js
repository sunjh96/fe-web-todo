import { itemCounter } from './util/itemCounter.js';
import { ShowLogs } from './events/menu.js';
import { showItems } from './show.js';
import { addNewCardItem } from './register.js';
import { setEvent } from './events/eventDelegation.js';
import { COLUMN_NAME } from './constants/TODO.js';

const checkInput = () => {
  if (!document.querySelector('.title-input').value && !document.querySelector('.detail-input').value) return;

  document.querySelector('.register-btn').classList.add('active-btn');
};

const init = () => {
  showItems();
  setEvent();
  itemCounter(COLUMN_NAME.TODO);
  itemCounter(COLUMN_NAME.DOING);
  itemCounter(COLUMN_NAME.DONE);
  ShowLogs();
  addNewCardItem();
  checkInput();
};

init();

export { showItems };
