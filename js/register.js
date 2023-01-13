import { makeCard } from "./template/makeTemplate.js";
import { makeLogMsg } from "./template/makeTemplate.js";

import { arrCount } from "./arrCount.js";
import { listData } from "./data/listData.js";
import { logData } from "./data/logData.js";

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
  let today = new Date();
  event.preventDefault();
  if (!titleInputBox[index].value || !detailInputBox[index].value)
    alert("내용을 입력해 주세요!");
  else {
    const putHere = document.querySelectorAll(".item-list")[index];
    const itemId = makeId();
    const newItemBox = makeCard({
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
    const newLogItem = makeLogMsg({
      action: "Add",
      title: titleInputBox[index].value,
      from: "",
      to: Logcondition[index],
      time: today.toLocaleString(),
    });
    const menuLogWrapper = document.querySelector(".menu-log-wrapper");
    menuLogWrapper.insertAdjacentHTML("afterbegin", newLogItem);
    logData.push({
      Action: "Add",
      Title: titleInputBox[index].value,
      To: Logcondition[index],
      From: "",
      time: today.toLocaleString(),
    });
    titleInputBox[index].value = ""; // 할 일 입력창 초기화
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
