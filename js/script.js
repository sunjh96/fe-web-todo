const addCardBtn = document.querySelectorAll(".addBtn");
const addCard = document.querySelectorAll(".itemAddBox");
const CancelBtn = document.querySelectorAll(".cancelBtn");

const fold = (num) => {
  addCard[num].classList.add("hidden");
};
//보임
const unfold = (num) => {
  addCard[num].classList.remove("hidden");
};

addCardBtn.forEach((el, index) => {
  el.onclick = () => {
    unfold(index);
  };
});

CancelBtn.forEach((el, index) => {
  el.onclick = () => {
    fold(index);
  };
});
