const openListAddForm = (e) => {
  if (e.target.className.includes("add-card-btn")) {
    const column = e.target.parentNode.parentNode;
    column.querySelector(".item-add-box").classList.remove("hidden");
  }
};

const closeListAddForm = (e) => {
  if (e.target.className.includes("cancel-btn")) {
    const column = e.target.parentNode.parentNode.parentNode.parentNode;
    column.querySelector(".item-add-box").classList.add("hidden");
  }
};

export { openListAddForm, closeListAddForm };
