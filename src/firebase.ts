// ===== Firebase Configuration =====
// هذا الملف يوفر اتصال بقاعدة البيانات

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  // خلي هاد المعلومات كيما هي عندك في الملف القديم (لا تغيريها)
  apiKey: "...", 
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // هاد السطر هو اللي كيخلينا نعيطو لقاعدة البيانات Firestore

// ===== تهيئة Firebase =====
let app: any = null;
let db: any = null;
let isConnected = false;

try {
  app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  isConnected = true;
} catch (error) {
  console.log('Firebase not configured. Using localStorage.');
}

// ===== حفظ البيانات =====
export const saveData = async (data: any): Promise<boolean> => {
  // حفظ محلي دائماً
  localStorage.setItem('bh-store', JSON.stringify(data));
  
  // محاولة حفظ في Firebase
  if (isConnected && db) {
    try {
      await set(ref(db, 'store'), data);
      return true;
    } catch (error) {
      console.error('Firebase save error:', error);
    }
  }
  return false;
};

// ===== تحميل البيانات =====
export const loadData = async (): Promise<any | null> => {
  // محاولة تحميل من Firebase
  if (isConnected && db) {
    try {
      const snapshot = await get(ref(db, 'store'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        localStorage.setItem('bh-store', JSON.stringify(data));
        return data;
      }
    } catch (error) {
      console.error('Firebase load error:', error);
    }
  }
  
  // تحميل من localStorage
  const local = localStorage.getItem('bh-store');
  return local ? JSON.parse(local) : null;
};

// ===== الاستماع للتغييرات =====
export const listenToChanges = (callback: (data: any) => void) => {
  if (!isConnected || !db) return () => {};
  
  const storeRef = ref(db, 'store');
  return onValue(storeRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      localStorage.setItem('bh-store', JSON.stringify(data));
      callback(data);
    }
  });
};

// ===== التحقق من الاتصال =====
export const isFirebaseConnected = (): boolean => isConnected;
