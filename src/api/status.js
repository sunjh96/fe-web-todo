import db from '@/store/firebase';
import { collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export async function getStatusList() {
  const docRef = doc(db, 'user', 'jangoh');
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data().status;
  } else {
    console.log('데이터가 없습니다.');
  }
}

export async function setStatusList() {
  const statusRef = doc(db, 'user', 'jangoh');
  console.log(statusRef);
  // "DC" 문서의 capital 필드(키) 값 수정하기
  // await updateDoc(statusRef, {
  //   status: {},
  // });
}
