import client from './client';

export async function getUser(userName) {
  const response = await client.get(`/api/users/${userName}`);
  return response.data;
}

export async function createUser(userName) {
  const response = await client.post('/api', { userName });
  response.status === (201 || 409) && localStorage.setItem('loginedUser', JSON.stringify(userName));

  return response.data;
}

export async function addStatus(statusName) {
  const response = await client.patch('/api', { statusName });
  return response.data;
}

export async function addTask(data) {
  const response = await client.patch('/api', data);
  return response.data;
}
