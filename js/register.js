import { makeListCard } from "./template/listItem.js";
import { arrCount } from "./arrCount.js";
import { listData } from "./data/listData.js";

import { addLogItem } from "./logItem.js";

const titleInputBox = document.getElementsByClassName("title-input");
const detailInputBox = document.getElementsByClassName("detail-input");
const registerBtn = document.querySelectorAll(".register-btn");

const condition = ["todo", "doing", "done"];
const Logcondition = ["해야할 일", "하고 있는 일", "완료한 일"];

const makeId = () => {
  const timestamp = new Date().getUTCMilliseconds();
  const itemId =
    timestamp + Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;
  return itemId;
};

const registerItem = (index) => {
  event.preventDefault();
  if (!titleInputBox[index].value || !detailInputBox[index].value)
    alert("내용을 입력해 주세요!");
  else {
    const putHere = document.querySelectorAll(".item-list")[index];
    const itemId = makeId();
    const newItemBox = makeListCard({
      title: titleInputBox[index].value,
      detail: detailInputBox[index].value,
      status: condition[index],
      id: itemId,
    });
    putHere.insertAdjacentHTML("afterbegin", newItemBox);
    listData.push({
      title: titleInputBox[index].value,
      detail: detailInputBox[index].value,
      status: condition[index],
      id: itemId,
    });
    addLogItem({
      action: "Add",
      title: titleInputBox[index].value,
      to: Logcondition[index],
      from: "",
    });
    titleInputBox[index].value = "";
    detailInputBox[index].value = "";
    document.querySelectorAll(".item-add-box")[index].classList.add("hidden");
  }
  arrCount(index, condition[index]);
};

registerBtn.forEach((el, index) => {
  el.onclick = () => {
    registerItem(index);
  };
});
