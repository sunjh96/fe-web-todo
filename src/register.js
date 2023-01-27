import { cardTemplate } from './template/cardTemplate.js';
import { itemCounter } from './util/itemCounter.js';
import { postListData } from './api/dataUtil.js';
import { addLogItem } from './logItem.js';
import { columnNames } from './column.js';
import { client } from './api/client.js';

const titleInputBox = document.getElementsByClassName('title-input');
const detailInputBox = document.getElementsByClassName('detail-input');
const registerBtn = document.querySelectorAll('.register-btn');

const makeId = () => {
  const timestamp = new Date().getUTCMilliseconds();
  const itemId = timestamp + 1000;
  return itemId;
};

const makeItemIndex = async (status) => {
  const res = await client.get(`/lists?status=${status}`);
  return res.data.length;
};

const registerItem = async (e, index) => {
  e.preventDefault();

  if (!titleInputBox[index].value || !detailInputBox[index].value) alert('내용을 입력해 주세요!');
  else {
    const putHere = document.querySelectorAll('.item-list')[index];
    const newTitle = titleInputBox[index].value;
    const newDetail = detailInputBox[index].value;
    const newStatus = columnNames[index];
    const itemId = makeId();
    const newIndex = await makeItemIndex(newStatus);
    const newItemObj = {
      title: newTitle,
      details: newDetail,
      status: newStatus,
      id: itemId,
      index: newIndex,
    };

    const newLogItem = {
      action: 'Add',
      title: newTitle,
      to: columnNames[index],
      from: '',
    };

    const newItemBox = cardTemplate(newItemObj);
    putHere.insertAdjacentHTML('afterbegin', newItemBox);

    postListData(newItemObj);
    addLogItem(newLogItem);
    itemCounter(newStatus);
    titleInputBox[index].value = '';
    detailInputBox[index].value = '';
    document.querySelectorAll('.item-add-box')[index].classList.add('hidden');
  }
};

const addNewCardItem = () => {
  registerBtn.forEach((elem, index) => {
    elem.onclick = (e) => {
      registerItem(e, index);
    };
  });
};

export { addNewCardItem };
