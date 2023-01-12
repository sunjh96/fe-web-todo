import { arrCount } from "./arrCount.js";
import { todos } from "./data.js";
const titleInputBox = document.getElementsByClassName("title-input"); // 할 일 제목 입력창
const detailInputBox = document.getElementsByClassName("detail-input"); // 할 일 내용 입력창
const condition = ["todo", "doing", "done"];

const defineItemTarget = {
  get condition() {
    return this._condition;
  },
  set condition(num) {
    this._condition = num;
  },
  get Item() {
    return this._Item;
  },
  set Item(str) {
    this._Item = str;
  },
  get Id() {
    return this._Id;
  },
  set Id(num) {
    this._Id = num;
  },
};
const closeModal = (e) => {
  if (e.target.id == "modal-cancel-btn") {
    document.getElementById("modal").classList.add("hidden");
  }
};
const openModal = (e) => {
  if (e.target.id == "item-delete-btn") {
    document.getElementById("modal").classList.remove("hidden");
    defineItemTarget.Item = e.target.parentNode.parentNode.parentNode;
    defineItemTarget.Item.classList.add("focus");
    defineItemTarget.Id = parseInt(
      e.target.parentNode.parentNode.parentNode.getAttribute("id")
    );
  }
};
const deleteItem = (e) => {
  if (e.target.id == "modal-delete-btn") {
    document.getElementById("modal").classList.add("hidden");
    console.log(defineItemTarget.Id);
    todos
      .filter((item) => item.id === defineItemTarget.Id)
      .map(() => {
        let index = todos.findIndex((obj) => obj.id === defineItemTarget.Id);
        const idx = condition.findIndex((obj) => obj === todos[index].status);
        todos.splice(index, 1);
        const focusItem = document.querySelector(".focus");
        focusItem.remove();
        defineItemTarget.Item.classList.add("focus");
        arrCount(idx);
      });
  }
};

export { openModal, closeModal, deleteItem };
