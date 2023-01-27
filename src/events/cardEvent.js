import { openCardModal, closeCardModal } from './delete.js';
import { itemCounter } from '../../src/util/itemCounter.js';
import { addLogItem } from '../logItem.js';
import { deleteListData } from '../api/dataUtil.js';
import { updateColumnList } from '../column.js';
import { patchListData } from '../api/dataUtil.js';

const deleteButtonTarget = document.querySelector('.modal-delete-btn');
const editActiveButtonTarget = document.querySelector('.item-edit-active-btn');

const cardEvent = () => {
  document.addEventListener('click', deleteCard);
  document.addEventListener('click', onClickCardAddButton);
  document.addEventListener('click', onClickCardAddFormCloseButton);
  document.addEventListener('click', onClickCardEditCancelButton);
  document.addEventListener('click', onClickCardEditButton);
};

const deleteCard = ({ target }) => {
  if (target.id !== 'item-delete-btn') return;

  const targetCard = target.closest('li');

  openCardModal();
  targetCard.classList.add('focus');
  deleteButtonTarget.addEventListener('click', onSubmitDeleteCard(targetCard));
};

const onSubmitDeleteCard =
  (targetCard) =>
  async ({ target }) => {
    if (target.id !== 'modal-delete-btn') return;

    const targetTitle = targetCard.dataset.title;
    const targetColumn = targetCard.closest('ul');
    const targetColumnId = targetCard.closest('ul').id;
    const targetCardId = parseInt(targetCard.getAttribute('id'));
    const focusItem = document.querySelector('.focus');
    const logData = { action: 'Delete', title: targetTitle, to: targetColumnId, from: '' };
    const currentColumnList = [...targetColumn.children];

    focusItem.remove();
    deleteListData(targetCardId);
    addLogItem(logData);
    updateColumnList(currentColumnList);
    itemCounter(targetColumnId);
    closeCardModal();

    deleteButtonTarget.removeEventListener('click', onSubmitDeleteCard(targetCard));
  };

const onClickCardAddButton = ({ target }) => {
  if (!target.className.includes('add-card-btn')) return;

  const columnTarget = target.closest('.Box');
  columnTarget && columnTarget.querySelector('.item-add-box').classList.toggle('hidden');
};

const onClickCardAddFormCloseButton = ({ target }) => {
  if (!target.className.includes('cancel-btn')) return;

  const columnTarget = target.closest('.Box');
  columnTarget && columnTarget.querySelector('.item-add-box').classList.toggle('hidden');
};

const onClickCardEditButton = ({ target }) => {
  if (!target.className.includes('item-edit-btn')) return;

  const cardWrapper = target.closest('li');
  const contentBox = cardWrapper.childNodes[1];
  const authorBox = cardWrapper.childNodes[3];

  cardWrapper.classList.add('edit-focus');
  contentBox.classList.add('hidden');
  authorBox.classList.remove('hidden');

  editActiveButtonTarget.addEventListener('click', onSubmitEditCardData(contentBox, cardWrapper, authorBox));
};

const closeCardEditForm = (contentBox, cardWrapper, authorBox) => {
  contentBox.classList.remove('hidden');
  cardWrapper.classList.remove('edit-focus');
  authorBox.classList.add('hidden');
};

const onClickCardEditCancelButton =
  (contentBox, cardWrapper, authorBox) =>
  ({ target }) => {
    if (target.className !== 'item-edit-cancel-btn') return;

    closeCardEditForm();
  };

const onSubmitEditCardData =
  (contentBox, cardWrapper, authorBox) =>
  async ({ target }) => {
    if (target.className !== 'item-edit-active-btn') return;

    const editContent = e.target.parentNode.parentNode;
    const revisedTitle = editContent.querySelector('.item-edit-title-input').value;
    const revisedDetail = editContent.querySelector('.item-edit-detail-input').value;

    const parentNode = editContent.parentNode;
    const ColumnName = editContent.closest('ul').id;
    const targetId = parentNode.getAttribute('id');

    const logData = {
      action: 'Update',
      title: revisedTitle,
      to: ColumnName,
      from: '',
    };

    const updateDataObj = { title: revisedTitle, details: revisedDetail };
    patchListData(targetId, updateDataObj);

    parentNode.querySelector('.item-title').innerHTML = revisedTitle;
    parentNode.querySelector('.item-detail').innerHTML = revisedDetail;

    addLogItem(logData);
    closeCardEditForm(contentBox, cardWrapper, authorBox);

    editActiveButtonTarget.removeEventListener('click', onSubmitEditCardData(contentBox, cardWrapper, authorBox));
  };

export { cardEvent };
