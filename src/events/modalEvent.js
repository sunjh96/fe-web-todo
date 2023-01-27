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

const closeCardModal = () => {
  document.querySelector('.modal').classList.add('hidden');
  document.querySelector('.focus').classList.remove('focus');
};

const openCardModal = () => {
  document.querySelector('.modal').classList.remove('hidden');
  targetCard.classList.add('focus');
};

export { modalEvent, openCardModal, closeCardModal };
