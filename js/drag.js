const todoBox = document.querySelector("#item-todo-list");
const doingBox = document.querySelector("#item-doing-list");
const doneBox = document.querySelector("#item-done-list");

const itemBox = document.getElementsByClassName("item-list");

const boxNames = [todoBox, doingBox, doneBox];

const changeUpDown = () => {
  boxNames.map((boxName) => {
    let currentItemIndex = null;
    let currentItem = null;

    boxName.addEventListener("dragstart", (e) => {
      currentItem = e.target;
      const listArr = [...currentItem.parentElement.children];
      currentItemIndex = listArr.indexOf(currentItem);
    });

    boxName.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    boxName.addEventListener("drop", (e) => {
      e.preventDefault();

      const currentDropItem = e.target.closest(".item-wrapper");
      const dropListArr = [...currentDropItem.parentElement.children];
      const dropItemIndex = listArr.indexOf(currentDropItem);

      if (currentItemIndex < dropItemIndex) {
        currentDropItem.after(currentItem);
      } else {
        currentDropItem.before(currentItem);
      }
    });
  });
};

export { changeUpDown };
