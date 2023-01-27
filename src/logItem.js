import { postLogData } from './api/dataUtil.js';
import { addLogMsg } from './template/log.js';

const addLogItem = ({ action, title, from, to }) => {
  let today = new Date();
  const time = today.toLocaleString();
  const menuLogWrapper = document.querySelector('.menu-log-wrapper');
  const newLogItem = {
    action,
    title,
    from,
    to,
    time,
    id: time,
  };
  addLogMsg(newLogItem);
  menuLogWrapper.insertAdjacentHTML('afterbegin', newLogItem);
  postLogData(newLogItem);
};

export { addLogItem };
