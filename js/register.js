import { makeListCard } from "./template/listItem.js";
import { arrCount } from "./util/arrCount.js";
import { postListData, postLogData, getListData } from "./dataUtil.js";
import { addLogItem } from "./logItem.js";

const titleInputBox = document.getElementsByClassName("title-input");
const detailInputBox = document.getElementsByClassName("detail-input");
const registerBtn = document.querySelectorAll(".register-btn");

let newTitle = null;
let newDetail = null;

const condition = ["todo", "doing", "done"];
const Logcondition = ["해야할 일", "하고 있는 일", "완료한 일"];

const makeId = () => {
  const timestamp = new Date().getUTCMilliseconds();
  const itemId = timestamp + 1000;
  return itemId;
};

const makeItemIndex = async (status = "todo") => {
  console.log("http://localhost:3011/lists?status=" + `${status}`);
  const res = await axios.get(
    "http://localhost:3011/lists?status=" + `${status}`
  );
  return res.data.length;
};

const registerItem = async (index) => {
  event.preventDefault();
  if (!titleInputBox[index].value || !detailInputBox[index].value)
    alert("내용을 입력해 주세요!");
  else {
    const putHere = document.querySelectorAll(".item-list")[index];
    const itemId = makeId();
    const newTitle = titleInputBox[index].value;
    const newDetail = detailInputBox[index].value;
    const newStatus = condition[index];
    const newIndex = await makeItemIndex(newStatus);

    const newItemObj = {
      title: newTitle,
      details: newDetail,
      status: newStatus,
      id: itemId,
      index: newIndex,
    };

    const newLogItem = {
      action: "Add",
      title: newTitle,
      to: Logcondition[index],
      from: "",
    };

    const newItemBox = makeListCard(newItemObj);
    putHere.insertAdjacentHTML("afterbegin", newItemBox);

    postListData(newItemObj);
    addLogItem(newLogItem);

    titleInputBox[index].value = "";
    detailInputBox[index].value = "";
    document.querySelectorAll(".item-add-box")[index].classList.add("hidden");
  }
  arrCount(index);
};

registerBtn.forEach((el, index) => {
  el.onclick = () => {
    registerItem(index);
  };
});

export { makeItemIndex };
