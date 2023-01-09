function makeCard(title, detail) {
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
  newTodoDeleteBtn.className = "material-symbols-outlined";
  newTodoDeleteBtn.setAttribute("id", "itemDeleteBtn");
  newTodoAuthorBox.className = "authorBox";
  newTodoAuthor.className = "author";

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
}

export default { makeCard };
