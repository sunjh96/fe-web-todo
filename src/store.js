export function getTasks(status) {
  return JSON.parse(localStorage.getItem(`${status}`));
}

export function setTasks(status, data) {
  // localStorage.clear();
  let tasks = JSON.parse(localStorage.getItem(`${status}`));
  if (!tasks) tasks = [];

  tasks.push(data);
  JSON.parse(localStorage.getItem('count'))
    ? localStorage.setItem('count', JSON.parse(localStorage.getItem('count')) + 1)
    : localStorage.setItem('count', 1);
  localStorage.setItem(`${status}`, JSON.stringify(tasks));
}
