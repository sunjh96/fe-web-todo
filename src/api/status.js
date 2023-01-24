import db from '@/store/firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export async function getStatusList() {
  const docRef = doc(db, 'user', 'jangoh');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return Object.keys(docSnap.data().todo);
  } else {
    console.log('데이터가 없습니다.');
  }
}

export async function setStatusList() {
  const statusRef = doc(db, 'user', 'jangoh');
}
