const makeCard = ({ title, detail, id }) => {
  return `
  <li class="item-wrapper" id="${id}" draggable="true" ondrag="drag_handler(event)">
      <div class="item-title-box">
        <h3 class="item-title">${title}</h3>
        <span class="material-symbols-outlined item-delete-btn" id="item-delete-btn">close</span>
      </div>
      <div class="item-detail-box">
        <p class="item-text">${detail}</p>
      </div>
      <div class="item-author-box">
        <p class="item-author">Author by web</p>
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

const makeLogList = () => {
  return `
  <li class="menu-log-box">
    <div class="log-profile">
      <div class="log-profile-img">🥳</div>
    </div>
    <div class="log-content-box">
      <div class="log-profile-name">@sam</div>
      <div class="log-content-text">해야할 일에 블로그에 포스팅 할 것을 등록하였습니다. </div>
      <div class="log-content-time">1분 전</div>
    </div>
  </li>
  `;
};

export { makeCard, makeColumn, makeLogList };
