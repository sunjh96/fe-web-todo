export function getTasks(status) {
  let tasks = JSON.parse(localStorage.getItem(`${status}`));
  if (!tasks) {
    tasks = [];
    localStorage.setItem(`${status}`, JSON.stringify(tasks));
  }

  return tasks;
}

export function setTasks(status, data) {
  let tasks = JSON.parse(localStorage.getItem(`${status}`));
  if (!tasks) tasks = [];

  tasks.push(data);
  JSON.parse(localStorage.getItem('count'))
    ? localStorage.setItem('count', JSON.parse(localStorage.getItem('count')) + 1)
    : localStorage.setItem('count', 1);
  localStorage.setItem(`${status}`, JSON.stringify(tasks));
}

export function getStatus() {
  let status = JSON.parse(localStorage.getItem('statusList'));
  if (!status) {
    status = [];
    localStorage.setItem('statusList', JSON.stringify(status));
  }

  return status;
}

export function setStatus(name) {
  let status = JSON.parse(localStorage.getItem('statusList'));
  if (!status) status = [];

  status.push(name);
  localStorage.setItem('statusList', JSON.stringify(status));
}

export function clear() {
  localStorage.clear();

  setTimeout(() => {
    location.reload();
  }, 1000);
}
