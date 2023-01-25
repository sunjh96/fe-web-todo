import { itemCounter } from './util/itemCounter.js';
import { ShowLogs } from './menu.js';
import { showItems } from './show.js';
import { addNewCardItem } from './register.js';
import { setEvent } from './events/eventDelegation.js';

const checkInput = () => {
  if (!document.querySelector('.title-input').value && !document.querySelector('.detail-input').value) return;

  document.querySelector('.register-btn').classList.add('active-btn');
};

const init = () => {
  showItems();
  setEvent();
  itemCounter('해야할 일');
  itemCounter('하고 있는 일');
  itemCounter('완료한 일');
  ShowLogs();
  addNewCardItem();
  checkInput();
};

init();

export { showItems };
