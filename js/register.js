import { makeCard } from "./template/makeTemplate.js";
import { arrCount } from "./arrCount.js";
import { todos } from "./data.js";
const titleInputBox = document.getElementsByClassName("title-input"); // 할 일 제목 입력창
const detailInputBox = document.getElementsByClassName("detail-input"); // 할 일 내용 입력창
const registerBtn = document.querySelectorAll(".register-btn"); // 버튼

const condition = ["todo", "doing", "done"];

const registerItem = (index) => {
  event.preventDefault();
  if (!titleInputBox[index].value || !detailInputBox[index].value)
    alert("내용을 입력해 주세요!");
  else {
    const putHere = document.querySelectorAll(".item-list")[index];
    const timestamp = new Date().getUTCMilliseconds();
    const itemId =
      timestamp + Math.floor(Math.random() * (9000 - 1000 + 1)) + 1000;
    console.log(itemId);
    const newItemBox = makeCard({
      title: titleInputBox[index].value,
      detail: detailInputBox[index].value,
      status: condition[index],
      id: itemId,
    });
    putHere.insertAdjacentHTML("afterbegin", newItemBox);
    todos.push({
      title: titleInputBox[index].value,
      detail: detailInputBox[index].value,
      status: condition[index],
      id: itemId,
    });
    titleInputBox[index].value = ""; // 할 일 입력창 초기화
    detailInputBox[index].value = "";
    document.querySelectorAll(".item-add-box")[index].classList.add("hidden");
  }
  arrCount(index, condition[index]);
  console.log(todos);
};

registerBtn.forEach((el, index) => {
  el.onclick = () => {
    registerItem(index);
  };
});
