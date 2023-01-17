import { postLogData } from "./dataUtil.js";
import { makeLogMsg } from "./template/logItem.js";

const addLogItem = ({ action, title, from, to }) => {
  let today = new Date();
  const time = today.toLocaleString();
  const menuLogWrapper = document.querySelector(".menu-log-wrapper");
  const newLogItem = {
    action: action,
    title: title,
    from: from,
    to: to,
    time: time,
  };
  console.log(newLogItem);
  makeLogMsg(newLogItem);
  menuLogWrapper.insertAdjacentHTML("afterbegin", newLogItem);
  console.log(newLogItem);
  postLogData(newLogItem);
};

export { addLogItem };
