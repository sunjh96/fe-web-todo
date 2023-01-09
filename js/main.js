import { makeCard } from "./makeTemplate.js";

const titleInputBox = document.getElementById("titleInput"); // 할 일 제목 입력창
const detailInputBox = document.getElementById("detailInput"); // 할 일 내용 입력창
const registerBtn = document.querySelector(".registerBtn"); // 버튼
const toDoList = document.querySelector(".itemWrapper"); // 할 일 리스트창
const deleteItem = document.getElementById("item-delete-btn");
const modalCancelBtn = document.getElementById("modal-cancel-btn");
const deleteItemBtn = document.getElementById("modal-delete-btn");
const item = document.getElementsByClassName("item-wrapper");

const registerItem = () => {
  event.preventDefault();
  if (!titleInputBox.value || !detailInputBox.value)
    alert("내용을 입력해 주세요!");
  else {
    const newItemBox = makeCard({
      title: titleInputBox.value,
      detail: detailInputBox.value,
    });
    toDoList.insertAdjacentHTML("beforeend", newItemBox);
    titleInputBox.value = ""; // 할 일 입력창 초기화
    detailInputBox.value = "";
  }
};
registerBtn.addEventListener("click", registerItem);

const modalClose = () => {
  document.getElementById("modal").classList.add("hidden");
};
modalCancelBtn.addEventListener("click", modalClose);

const modalOpen = (e) => {
  if (e.target.id == "item-delete-btn") {
    console.log("find");
    const removeTarget = e.target.parentNode.parentNode;
    console.log(removeTarget);
    document.getElementById("modal").classList.remove("hidden");

    deleteItemBtn.addEventListener("click", function () {
      console.log("click");
      modalClose();
      toDoList.removeChild(removeTarget);
    });
    modalCancelBtn.addEventListener("click", modalClose);
  }
  //document.getElementById("modal").classList.remove("hidden");
};
document.addEventListener("click", modalOpen);

const edit = () => {
  console.log("z;lkdfj;as");
};

item.addEventListener("dbclick", edit);
