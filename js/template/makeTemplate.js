const makeCard = ({ title, detail, id }) => {
  return `
  <li class="item-wrapper" id="${id}" draggable="true" ondrag="drag_handler(event)">
    <div class="item-content-wrapper">
      <div class="item-content-box">
        <div class="item-title-box">
          <h3 class="item-title">${title}</h3>
        </div>
        <div class="item-detail-box">
          <p class="item-detail">${detail}</p>
        </div>
        <div class="item-author-box">
          <p class="item-author">Author by web</p>
        </div>
      </div>
      <div class="item-btn-wrapper">
        <div class="material-symbols-outlined item-delete-btn" id="item-delete-btn">close</div>
        <div class="material-symbols-outlined item-edit-btn">edit</div>
      </div>
    </div>
    <div class="item-edit-content-wrapper hidden">
      <div class="item-content-box">
        <div class="item-title-box">
          <input class="item-edit-title-input" placeholder="${title}">
        </div>
        <div class="item-detail-box">
          <textarea class="item-edit-detail-input" placeholder="${detail}"></textarea>
        </div>
      </div>
      <div class="item-editBtn-wrapper">
        <button class="item-edit-cancel-btn">취소</button>
        <button class="item-edit-active-btn">수정</button>
      </div>
    </div>
    

    
  </li>`;
};

const makeColumn = ({ title = "제목" }) => {
  return `
  <div class="doingBox">
    <div class="listTitleBox">
      <h3>${title}</h3>
      <div class="count-box">
        <div class="count-num">1</div>
      </div>
      <span class="material-symbols-outlined addBtn" id="addDoingBtn">add</span>
      <span class="material-symbols-outlined closeBtn" id="closeDoingBtn">close</span>
    </div>
    <form class="itemAddBox hidden">
        <input type="text" id="titleInput" placeholder="제목을 입력하세요">
        <input type="text" id="detailInput" placeholder="내용을 입력하세요">
        <div class="BtnWrapper">
          <input type='button' value='취소'  class="cancelBtn"></input>
          <button type='submit' class="registerBtn registerTodoBtn">등록</button>
        </div>
    </form>
    <ul class="itemWrapper"></ul>
  </div>
  `;
};

const makeLogMsg = ({ action, title, from, to, time }) => {
  console.log("왔다");
  console.log({ action, title, from, to, time });
  if (action == "Add") {
    const msg = `<strong>${to}</strong>에 <strong>${title}</strong>를 <strong>등록</strong>하였습니다.`;
    return makeLogItem(msg, time);
  }
  if (action == "Delete") {
    const msg = `<strong>${to}</strong>에 <strong>${title}</strong>를 <strong>제거</strong>하였습니다.`;
    return makeLogItem(msg, time);
  }
  if (action == "Update") {
    const msg = `<strong>${to}</strong>에 <strong>${title}</strong>를 <strong>수정</strong>하였습니다.`;
    return makeLogItem(msg, time);
  }
  if (action == "Move") {
    const msg = `<strong>${title}</strong>를 <strong>${from}</strong>에서 <strong>${to}</strong>로 <strong>이동</strong>하였습니다.`;
    return makeLogItem(msg, time);
  }
};

const makeLogItem = (msg, time) => {
  return `
  <li class="menu-log-box">
    <div class="log-profile">
      <div class="log-profile-img">🥳</div>
    </div>
    <div class="log-content-box">
      <div class="log-profile-name">@sam</div>
      <div class="log-content-text">${msg} </div>
      <div class="log-content-time">${time}</div>
    </div>
  </li>
  `;
};

export { makeCard, makeColumn, makeLogMsg };
