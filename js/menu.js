import { logData } from "./data/logData.js";
import { makeLogMsg } from "./template/makeTemplate.js";

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
const ShowLogs = () => {
  logData.map((data) => {
    const newLogItem = makeLogMsg({
      action: data.Action,
      title: data.Title,
      from: data.From,
      to: data.To,
      time: data.time,
    });
    menuLogWrapper.insertAdjacentHTML("afterbegin", newLogItem);
  });
};
export { openMenu, closeMenu, ShowLogs };
