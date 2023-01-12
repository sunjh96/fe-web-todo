import { arrCount } from "./arrCount.js";
import { listData } from "./data/listData.js";

import { makeLogMsg } from "./template/makeTemplate.js";
import { logData } from "./data/logData.js";

const Logcondition = ["해야할 일", "하고 있는 일", "완료한 일"];

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
    let today = new Date();
    document.getElementById("modal").classList.add("hidden");
    listData
      .filter((item) => item.id === defineItemTarget.Id)
      .map(() => {
        let index = listData.findIndex((obj) => obj.id === defineItemTarget.Id);
        const idx = condition.findIndex(
          (obj) => obj === listData[index].status
        );
        console.log(listData[index].title);
        const newLogItem = makeLogMsg({
          action: "Delete",
          title: listData[index].title,
          from: "",
          to: Logcondition[idx],
          time: today.toLocaleString(),
        });
        const menuLogWrapper = document.querySelector(".menu-log-wrapper");
        menuLogWrapper.insertAdjacentHTML("afterbegin", newLogItem);
        logData.push({
          Action: "Delete",
          Title: listData[index].title,
          To: Logcondition[idx],
          From: "",
          time: today.toLocaleString(),
        });
        listData.splice(index, 1);
        const focusItem = document.querySelector(".focus");
        focusItem.remove();
        defineItemTarget.Item.classList.add("focus");
        arrCount(idx);
      });
  }
};

export { openModal, closeModal, deleteItem, defineItemTarget };
