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

export async function updateTaskCard(data) {
  const { statusName, taskId, taskTitle, taskContent } = data;
  const docRef = doc(db, 'user', 'jangoh');
  const updateData = {};

  taskTitle && (updateData[`todo.${statusName}.${taskId}.title`] = taskTitle);
  taskContent && (updateData[`todo.${statusName}.${taskId}.content`] = taskContent);
  updateData[`todo.${statusName}.${taskId}.active`] = false;

  await updateDoc(docRef, updateData);
}
