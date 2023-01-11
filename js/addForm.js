const addCardBtn = document.querySelectorAll(".add-card-btn");
const addCard = document.querySelectorAll(".item-add-box");
const CancelBtn = document.querySelectorAll(".cancel-btn");
const toDoList = document.querySelector(".list-wrapper"); // 할 일 리스트창

const foldModal = (num) => {
  addCard[num].classList.add("hidden");
};
//보임
const unfoldModal = (num) => {
  addCard[num].classList.remove("hidden");
};

addCardBtn.forEach((el, index) => {
  el.onclick = () => {
    unfoldModal(index);
  };
});

CancelBtn.forEach((el, index) => {
  el.onclick = () => {
    foldModal(index);
  };
});
