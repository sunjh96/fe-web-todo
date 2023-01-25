const openListAddForm = ({ target }) => {
  if (!target.className.includes('add-card-btn')) return;

  const columnTarget = target.closest('.Box');
  columnTarget && columnTarget.querySelector('.item-add-box').classList.toggle('hidden');
};

const closeListAddForm = ({ target }) => {
  if (!target.className.includes('cancel-btn')) return;

  const columnTarget = target.closest('.Box');
  columnTarget && columnTarget.querySelector('.item-add-box').classList.toggle('hidden');
};

export { openListAddForm, closeListAddForm };
