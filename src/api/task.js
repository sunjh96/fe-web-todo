import db from '@/store/firebase';
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

export async function getTaskList() {
  const docRef = doc(db, 'user', 'jangoh');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let taskList = {};

    const todoData = Object.entries(docSnap.data().todo);

    todoData.map((data) => {
      taskList[data[0]] = Object.values(data[1]);
    });

    return taskList;
  } else {
    console.log('데이터가 없습니다.');
  }
}

export async function getTaskCount() {
  const docRef = doc(db, 'user', 'jangoh');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const countTask = docSnap.data().countTask;

    return countTask;
  } else {
    console.log('데이터가 없습니다.');
  }
}

export async function updateTaskCard(data) {
  const { statusName, taskId, taskTitle, taskContent } = data;
  const docRef = doc(db, 'user', 'jangoh');
  const updateTaskData = {};

  taskTitle && (updateTaskData[`todo.${statusName}.${taskId}.title`] = taskTitle);
  taskContent && (updateTaskData[`todo.${statusName}.${taskId}.content`] = taskContent);
  updateTaskData[`todo.${statusName}.${taskId}.active`] = false;

  await updateDoc(docRef, updateTaskData);
}

export async function setTaskCard(data) {
  const { statusName, taskId, taskTitle, taskContent } = data;

  const newTask = {};
  newTask[`todo.${statusName}.${taskId}.title`] = taskTitle;
  newTask[`todo.${statusName}.${taskId}.content`] = taskContent;
  newTask[`todo.${statusName}.${taskId}.id`] = taskId;
  newTask[`todo.${statusName}.${taskId}.active`] = false;

  await increaseTaskCount();
  await updateDoc(doc(db, 'user', 'jangoh'), newTask);

  window.location.reload();
}

export async function increaseTaskCount() {
  const docRef = doc(db, 'user', 'jangoh');
  const docSnap = await getDoc(docRef);

  const countTask = docSnap.data().countTask;

  await updateDoc(docRef, { countTask: countTask + 1 });
}
