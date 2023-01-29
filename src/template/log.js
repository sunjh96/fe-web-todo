const addLogMsg = ({ action, title, from, to, id, time }) => {
  if (action === 'Add') {
    const LOG_MESSAGE = `<strong>${to}</strong>에 <strong>${title}</strong>를 <strong>등록</strong>하였습니다.`;
    return logTemplate(LOG_MESSAGE, time);
  }
  if (action === 'Delete') {
    const LOG_MESSAGE = `<strong>${to}</strong>에 <strong>${title}</strong>를 <strong>제거</strong>하였습니다.`;
    return logTemplate(LOG_MESSAGE, time);
  }
  if (action === 'Update') {
    const LOG_MESSAGE = `<strong>${to}</strong>에 <strong>${title}</strong>로 <strong>수정</strong>하였습니다.`;
    return logTemplate(LOG_MESSAGE, time);
  }
  if (action === 'Move') {
    const LOG_MESSAGE = `<strong>${title}</strong>를 <strong>${from}</strong>에서 <strong>${to}</strong>로 <strong>이동</strong>하였습니다.`;
    return logTemplate(LOG_MESSAGE, time);
  }
};

const logTemplate = (msg, id) => {
  return `
    <li class="menu-log-box">
      <div class="log-profile">
        <div class="log-profile-img">🥳</div>
      </div>
      <div class="log-content-box">
        <div class="log-profile-name">@sam</div>
        <div class="log-content-text">${msg} </div>
        <div class="log-content-time">${id}</div>
      </div>
    </li>
    `;
};

export { addLogMsg };