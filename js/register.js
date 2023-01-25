import { makeListCard } from './template/list.js';
import { itemCounter } from './util/itemCounter.js';
import { postListData } from './dataUtil.js';
import { addLogItem } from './logItem.js';
import { columnNames } from './column.js';

const titleInputBox = document.getElementsByClassName('title-input');
const detailInputBox = document.getElementsByClassName('detail-input');
const registerBtn = document.querySelectorAll('.register-btn');

const makeId = () => {
  const timestamp = new Date().getUTCMilliseconds();
  const itemId = timestamp + 1000;
  return itemId;
};

const makeItemIndex = async (status) => {
  const res = await axios.get('http://localhost:3011/lists?status=' + `${status}`);
  return res.data.length;
};

const registerItem = async (index) => {
  event.preventDefault();
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

    const newItemBox = makeListCard(newItemObj);
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
  registerBtn.forEach((el, index) => {
    el.onclick = () => {
      registerItem(index);
    };
  });
};

export { addNewCardItem };
