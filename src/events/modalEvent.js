const modalEvent = () => {
  document.addEventListener('click', openColumnModal);
  document.addEventListener('click', closeColumnModal);
};

const openColumnModal = ({ target }) => {
  if (!target.className.includes('column-add-btn')) return;

  document.querySelector('.modal-column').classList.toggle('hidden');
};

const closeColumnModal = ({ target }) => {
  if (target.className !== 'modal-column-cancel-btn') return;

  document.querySelector('.modal-column').classList.toggle('hidden');
};

export const closeCardModal = () => {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.focus').classList.remove('focus');
};

export const openCardModal = (targetCard) => {
  document.querySelector('.modal').classList.remove('hidden');
};

export default modalEvent;
