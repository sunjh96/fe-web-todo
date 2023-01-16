const openAddColumn = (e) => {
  if (e.target.className.includes("column-add-btn")) {
    console.log(document.querySelector(".modal-column").classList);
    document.querySelector(".modal-column").classList.remove("hidden");
  }
};

const closeAddColumn = (e) => {
  if (e.target.className == "modal-column-cancel-btn") {
    document.querySelector(".modal-column").classList.add("hidden");
  }
};

export { openAddColumn, closeAddColumn };
