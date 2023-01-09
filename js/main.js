let titleInputBox = document.getElementById("titleInput"); // 할 일 제목 입력창
let detailInputBox = document.getElementById("detailInput"); // 할 일 내용 입력창
let registerBtn = document.querySelector(".registerBtn"); // 버튼
let toDoList = document.querySelector(".itemWrapper"); // 할 일 리스트창

registerBtn.addEventListener("click", function () {
  // 버튼에 클릭 이벤트가 발생하면
  event.preventDefault();
  const newItemBox = document.createElement("li"); // html 'li' 태그 만들기
  const newTitleBox = document.createElement("div");
  const newTitle = document.createElement("div");
  const newDetailBox = document.createElement("div");
  const newDetail = document.createElement("div");
  const newTodoDeleteBtn = document.createElement("span");
  const newTodoAuthorBox = document.createElement("div");
  const newTodoAuthor = document.createElement("div");

  newTitleBox.appendChild(newTitle);
  newDetailBox.appendChild(newDetail);
  newItemBox.appendChild(newTitleBox);
  newItemBox.appendChild(newDetailBox);

  newItemBox.className = "itemBox";
  newTitleBox.className = "itemTitleBox";
  newTitle.className = "itemTitle";
  newDetail.className = "itemDetail";
  newDetailBox.className = "itemDetailBox";

  newTodoDeleteBtn.className = "material-symbols-outlined";
  newTodoDeleteBtn.setAttribute("id", "item-delete-btn");
  newTodoAuthorBox.className = "authorBox";
  newTodoAuthor.className = "author";

  if (!titleInputBox.value || !detailInputBox.value)
    // 할 일 입력창에 내용이 입력되지 않으면 alert 발생
    alert("내용을 입력해 주세요!");
  else {
    document.querySelector(".registerBtn").classList.add("activeBtn");
    newTitle.innerText = titleInputBox.value; // <li>입력된 할 일</li>
    newDetail.innerText = detailInputBox.value;
    newTodoAuthor.innerText = "author by web";
    newTodoDeleteBtn.innerText = "close";

    // 할 일 리스트창에 자식으로 붙이기

    newItemBox.appendChild(newTitleBox);
    newTitleBox.appendChild(newTodoDeleteBtn);
    newItemBox.appendChild(newDetailBox);
    newItemBox.appendChild(newTodoAuthor);

    toDoList.appendChild(newItemBox);

    titleInputBox.value = ""; // 할 일 입력창 초기화
    detailInputBox.value = "";
    document.querySelector(".registerBtn").classList.remove("activeBtn");
  }

  newTodoDeleteBtn.addEventListener(
    "mouseover",
    function (event) {
      console.log("hover");
      event.target.classList.add("mouseover");
    },
    false
  );
  newItemBox.addEventListener("click", function (e) {
    // list에 더블클릭 이벤트가 발생하면 할 일 리스트창에서 지우기
    modalOpen(e);
    //toDoList.removeChild(newItemBox);
  });
});

const modalOpen = (e) => {
  const removeTarget = e.target.parentNode.parentNode;
  console.log(removeTarget);
  document.getElementById("modal").classList.remove("hidden");

  const deleteItemBtn = document.getElementById("modal-delete-btn");
  deleteItemBtn.addEventListener("click", function () {
    modalClose();
    toDoList.removeChild(removeTarget);
  });

  const modalCancelBtn = document.getElementById("modal-cancel-btn");
  modalCancelBtn.addEventListener("click", modalClose);
};

const modalClose = () => {
  document.getElementById("modal").classList.add("hidden");
};

const changeBoxColor = (e) => {
  console.log("hover");
};

const deleteBtn = document.getElementById("item-delete-btn");
deleteBtn.addEventListener("mouseover", (event) => {
  deleteBtn.innerHTML += "<div>mouseenter</div>";
});
//deleteBtn.addEventListener("click", modalOpen);
