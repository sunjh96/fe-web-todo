import { addLogItem } from './logItem.js';
import { deleteListData } from './dataUtil.js';
import { itemCounter } from './util/itemCounter.js';
import { patchListData } from './dataUtil.js';

let targetItem = null;
let targetItemId = null;

const closeModal = () => {
  document.querySelector('.modal').classList.add('hidden');
  targetItem = null;
  targetItemId = null;
};

const cancelDeleteItem = ({ target }) => {
  if (target.id === 'modal-cancel-btn' || target.className === 'modal-background') {
    closeModal();
    document.querySelector('.focus').classList.remove('focus');
  }
};

const openModal = ({ target }) => {
  if (target.id == 'item-delete-btn') {
    document.querySelector('.modal').classList.remove('hidden');
    targetItem = target.closest('li');
    targetItem.classList.add('focus');
    targetItemId = parseInt(targetItem.getAttribute('id'));
  }
};

const deleteItem = async ({ target }) => {
  if (target.id === 'modal-delete-btn') {
    const targetTitle = targetItem.dataset.title;
    const targetColumn = targetItem.closest('ul');
    const targetColumnId = targetItem.closest('ul').id;
    const focusItem = document.querySelector('.focus');
    deleteListData(targetItemId);
    addLogItem({
      action: 'Delete',
      title: targetTitle,
      to: targetColumnId,
      from: '',
    });

    focusItem.remove();
    const currentColumnArr = [...targetColumn.children];
    if (currentColumnArr !== null) {
      currentColumnArr.map((item) => {
        const updateDataObj = {
          index: currentColumnArr.indexOf(item),
        };
        patchListData(item.id, updateDataObj);
      });
    }
    itemCounter(targetColumnId);
    closeModal();
  }
};

export { openModal, cancelDeleteItem, deleteItem };
