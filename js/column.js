import { makeColumn } from "./template/columnItem.js";

const openAddColumn = (e) => {
  if (e.target.className.includes("column-add-btn")) {
    document.querySelector(".modal-column").classList.remove("hidden");
  }
};

const closeAddColumn = (e) => {
  if (e.target.className === "modal-column-cancel-btn") {
    document.querySelector(".modal-column").classList.add("hidden");
  }
};

const addColumn = (e) => {
  if (e.target.className === "modal-column-add-btn") {
    event.preventDefault();
    const columnInputBox = document.querySelector(".modal-column-input");
    if (!columnInputBox.value) alert("제목을 입력해 주세요!");
    else {
      const container = document.querySelector(".container");
      const newColumn = makeColumn({ title: columnInputBox.value });
      container.insertAdjacentHTML("beforeend", newColumn);
      columnInputBox.value = "";
    }
    document.querySelector(".modal-column").classList.add("hidden");
  }
};

export { openAddColumn, closeAddColumn, addColumn };
