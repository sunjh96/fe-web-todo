import { columnTemplate } from '../template/columnTemplate.js';
import { columnNames } from '../column.js';

const columnEvent = () => {
  document.addEventListener('click', onClickColumnAddButton); //
};

const onClickColumnAddButton = (e) => {
  e.preventDefault();
  if (e.target.className !== 'modal-column-add-btn') return;

  const columnInputBox = document.querySelector('.modal-column-input');

  if (!columnInputBox.value) alert('제목을 입력해 주세요!');
  else {
    const container = document.querySelector('.container');
    const newColumn = columnTemplate({ title: columnInputBox.value });

    container.insertAdjacentHTML('beforeend', newColumn);
    columnNames.push(columnInputBox.value);
    columnInputBox.value = '';
  }
  document.querySelector('.modal-column').classList.add('hidden');
};

export { columnEvent };
