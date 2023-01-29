import { client } from './api/client.js';
import { registerCard } from './events/CardEvent.js';
import { cardTemplate } from '../src/template/cardTemplate.js';
import { getListData } from './api/dataUtil.js';
import { columnNames } from './column.js';

const registerBtn = document.querySelectorAll('.register-btn');
const listColumns = document.querySelectorAll('.item-list');

const makeId = () => {
  const timestamp = new Date().getUTCMilliseconds();
  const itemId = timestamp + 1000;
  return itemId;
};

const makeItemIndex = async (status) => {
  const res = await client.get(`/lists?status=${status}`);
  return res.data.length;
};

const addNewCard = () => {
  registerBtn.forEach((elem, index) => {
    elem.onclick = (e) => {
      registerCard(e, index);
    };
  });
};

const showCards = async () => {
  const listData = await getListData();
  const sortedData = listData.sort(function (a, b) {
    return a.index - b.index;
  });
  sortedData.map((item) => {
    const cardData = { title: item.title, details: item.details, id: item.id };
    const card = cardTemplate(cardData);

    columnNames
      .filter((columnName) => item.status === columnName)
      .map((columnName) => {
        const index = columnNames.indexOf(columnName);
        listColumns[index].insertAdjacentHTML('beforeend', card);
      });
  });
};

const checkCardInput = () => {
  if (!document.querySelector('.title-input').value && !document.querySelector('.detail-input').value) return;

  document.querySelector('.register-btn').classList.add('active-btn');
};

export { addNewCard, makeId, makeItemIndex, showCards, checkCardInput };
