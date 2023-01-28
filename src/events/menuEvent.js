import { addLogMsg } from '../template/log.js';
import { getLogData } from '../api/dataUtil.js';

const menuLogWrapper = document.querySelector('.menu-log-wrapper');

const menuEvent = () => {
  const header = document.querySelector('.header-wrapper');
  const menu = document.querySelector('.menu-wrapper');

  header.addEventListener('click', openMenu);
  menu.addEventListener('click', closeMenu);
};
//menu 열기
const openMenu = ({ target }) => {
  if (target.id === 'hamburger-btn') document.querySelector('.menu-wrapper').classList.add('sidebar-show');
};
//menu닫기
const closeMenu = ({ target }) => {
  if (target.id === 'menu-close-btn') document.querySelector('.menu-wrapper').classList.remove('sidebar-show');
};
//로그보여주기
export const ShowLogs = async () => {
  const logData = await getLogData();
  logData.map((item) => {
    const newLogItem = addLogMsg({
      action: item.action,
      title: item.title,
      from: item.from,
      to: item.to,
      time: item.time,
    });
    menuLogWrapper.insertAdjacentHTML('afterbegin', newLogItem);
  });
};

export default menuEvent;
