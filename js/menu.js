import { makeLogMsg } from "./template/logItem.js";
import { getLogData } from "./dataUtil.js";

const menuLogWrapper = document.querySelector(".menu-log-wrapper");

//menu 열기
const openMenu = (e) => {
  if (e.target.id === "hamburger-btn")
    document.querySelector(".menu-wrapper").classList.add("sidebar-show");
};
//menu닫기
const closeMenu = (e) => {
  if (e.target.id == "menu-close-btn")
    document.querySelector(".menu-wrapper").classList.remove("sidebar-show");
};
//로그보여주기
const ShowLogs = async () => {
  const logData = await getLogData();
  logData.map((item) => {
    const newLogItem = makeLogMsg({
      action: item.action,
      title: item.title,
      from: item.from,
      to: item.to,
      time: item.time,
    });
    menuLogWrapper.insertAdjacentHTML("afterbegin", newLogItem);
  });
};
export { openMenu, closeMenu, ShowLogs };
