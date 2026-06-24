// Firebase Configuration
// ======================
// لإعداد Firebase، اتبع الخطوات التالية:
// 1. اذهب إلى https://console.firebase.google.com
// 2. أنشئ مشروع جديد
// 3. اضغط على "Add App" واختر Web
// 4. انسخ الإعدادات والصقها هنا

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, onValue, update, remove } from 'firebase/database';

// إعدادات Firebase - قم بتحديث هذه القيم بإعدادات مشروعك
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// تهيئة Firebase
let app: any = null;
let database: any = null;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.log('Firebase not configured yet. Using local storage.');
}

// دوال قاعدة البيانات
export const saveData = async (path: string, data: any) => {
  if (!database) {
    localStorage.setItem(`store_${path}`, JSON.stringify(data));
    return;
  }
  try {
    await set(ref(database, path), data);
  } catch (error) {
    console.error('Error saving data:', error);
    localStorage.setItem(`store_${path}`, JSON.stringify(data));
  }
};

export const loadData = async (path: string): Promise<any> => {
  if (!database) {
    const data = localStorage.getItem(`store_${path}`);
    return data ? JSON.parse(data) : null;
  }
  try {
    const snapshot = await get(ref(database, path));
    return snapshot.exists() ? snapshot.val() : null;
  } catch (error) {
    console.error('Error loading data:', error);
    const data = localStorage.getItem(`store_${path}`);
    return data ? JSON.parse(data) : null;
  }
};

export const subscribeToData = (path: string, callback: (data: any) => void) => {
  if (!database) {
    const data = localStorage.getItem(`store_${path}`);
    callback(data ? JSON.parse(data) : null);
    return () => {};
  }
  try {
    const dataRef = ref(database, path);
    return onValue(dataRef, (snapshot) => {
      callback(snapshot.exists() ? snapshot.val() : null);
    });
  } catch (error) {
    console.error('Error subscribing to data:', error);
    const data = localStorage.getItem(`store_${path}`);
    callback(data ? JSON.parse(data) : null);
    return () => {};
  }
};

export const updateData = async (path: string, data: any) => {
  if (!database) {
    const existing = localStorage.getItem(`store_${path}`);
    const parsed = existing ? JSON.parse(existing) : {};
    localStorage.setItem(`store_${path}`, JSON.stringify({ ...parsed, ...data }));
    return;
  }
  try {
    await update(ref(database, path), data);
  } catch (error) {
    console.error('Error updating data:', error);
    const existing = localStorage.getItem(`store_${path}`);
    const parsed = existing ? JSON.parse(existing) : {};
    localStorage.setItem(`store_${path}`, JSON.stringify({ ...parsed, ...data }));
  }
};

export const deleteData = async (path: string) => {
  if (!database) {
    localStorage.removeItem(`store_${path}`);
    return;
  }
  try {
    await remove(ref(database, path));
  } catch (error) {
    console.error('Error deleting data:', error);
    localStorage.removeItem(`store_${path}`);
  }
};

export { database };
export default app;
