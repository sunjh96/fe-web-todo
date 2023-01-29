import { itemCounter } from './util/itemCounter.js';
import { addNewCard, showCards, checkCardInput } from './card.js';
import { cardEvent, columnEvent, dragEvent, menuEvent, modalEvent, ShowLogs } from './events/index.js';
import { COLUMN_NAME } from './constants/TODO.js';

const init = () => {
  showCards();
  ShowLogs();

  cardEvent();
  columnEvent();
  dragEvent();
  menuEvent();
  modalEvent();

  itemCounter(COLUMN_NAME.TODO);
  itemCounter(COLUMN_NAME.DOING);
  itemCounter(COLUMN_NAME.DONE);

  addNewCard();
  checkCardInput();
};

init();
