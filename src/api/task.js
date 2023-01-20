import db from '@/store/firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export async function getTaskList() {
  const docRef = doc(db, 'user', 'jangoh');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().tasks;
  } else {
    console.log('데이터가 없습니다.');
  }
}
