import { postLogData } from "./dataUtil.js";
import { makeLogMsg } from "./template/logItem.js";

const addLogItem = ({ action, title, from, to }) => {
  let today = new Date();
  const time = today.toLocaleString();
  console.log(time);
  const menuLogWrapper = document.querySelector(".menu-log-wrapper");
  const newLogItem = {
    action: action,
    title: title,
    from: from,
    to: to,
    time: time,
    id: time,
  };
  makeLogMsg(newLogItem);
  menuLogWrapper.insertAdjacentHTML("afterbegin", newLogItem);
  postLogData(newLogItem);
};

export { addLogItem };
