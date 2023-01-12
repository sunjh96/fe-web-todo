const openItemEditForm = (e) => {
  if (e.target.className.includes("item-edit-btn")) {
    const parentN = e.target.parentNode.parentNode.parentNode;
    parentN.classList.add("edit-focus");
    parentN.childNodes[1].childNodes[1].childNodes[5].classList.add("hidden");
    parentN.childNodes[3].classList.remove("hidden");
  }
};

const closeItemEditForm = (e) => {
  if (e.target.className === "item-edit-cancel-btn") {
    const parentN = e.target.parentNode.parentNode;
    parentN.classList.remove("edit-focus");
    parentN.childNodes[1].childNodes[1].childNodes[5].classList.remove(
      "hidden"
    );
    parentN.childNodes[3].classList.add("hidden");
  }
};
export { openItemEditForm, closeItemEditForm };
