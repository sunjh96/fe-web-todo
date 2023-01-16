import { makeLogMsg } from "./template/logItem.js";
import { logData } from "./data/logData.js";

const addLogItem = ({ action, title, from, to }) => {
  let today = new Date();
  const time = today.toLocaleString();
  const menuLogWrapper = document.querySelector(".menu-log-wrapper");
  const newLogItem = makeLogMsg({
    action,
    title,
    from,
    to,
    time,
  });
  menuLogWrapper.insertAdjacentHTML("afterbegin", newLogItem);
  logData.push({
    Action: action,
    Title: title,
    From: from,
    To: to,
    time: today.toLocaleString(),
  });
};

export { addLogItem };
