export function getData(key) {
  let data = JSON.parse(localStorage.getItem(`${key}`));
  if (!data) {
    data = [];
    localStorage.setItem(`${key}`, JSON.stringify(data));
  }

  return data;
}

export function setData(key, name) {
  let data = JSON.parse(localStorage.getItem(`${key}`));
  if (!data) data = [];

  data.push(name);
  localStorage.setItem(`${key}`, JSON.stringify(data));
}

export function clear() {
  localStorage.clear();
  location.reload();
}
