const makeListCard = ({ title, details, id }) => {
  return `
    <li class="item-wrapper" id="${id}" data-title="${title}">
      <div class="item-content-wrapper">
        <div class="item-content-box">
          <div class="item-title-box">
            <h3 class="item-title">${title}</h3>
          </div>
          <div class="item-detail-box">
            <p class="item-detail">${details}</p>
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
            <textarea class="item-edit-detail-input" placeholder="${details}"></textarea>
          </div>
        </div>
        <div class="item-editBtn-wrapper">
          <button class="item-edit-cancel-btn">취소</button>
          <button class="item-edit-active-btn">수정</button>
        </div>
      </div>
    </li>`;
};

export { makeListCard };
