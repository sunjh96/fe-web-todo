const makeColumn = ({ title = "제목" }) => {
  return `
  <div class='Box'>
        <div class="listTitleBox">
          <h3>${title}</h3>
          <div class="count-box">
            <div class="count-num">0</div>
          </div>
          <span class="material-symbols-outlined add-card-btn" >add</span>
          <span class="material-symbols-outlined close-card-btn" >close</span>
        </div>
        <div class="list-wrapper">
          <form class="item-add-box hidden">
            <input type="text" class="title-input" placeholder="제목을 입력하세요">
            <textarea type="text" class="detail-input" placeholder="내용을 입력하세요"></textarea>
            <div class="btn-wrapper">
              <input type='button' value='취소'  class="cancel-btn"></input>
              <button type='submit' class="register-btn registerTodoBtn">등록</button>
            </div>
          </form>
          <ul class="item-list"></ul>
        </div>
      </div>
  `;
};

export { makeColumn };
