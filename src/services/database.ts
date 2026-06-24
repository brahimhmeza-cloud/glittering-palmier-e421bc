// ======================================
// خدمة قاعدة البيانات - JSONBin.io
// ======================================
// هذا الملف يوفر واجهة لتخزين البيانات على الإنترنت
// حتى تظهر لجميع الزوار

const API_URL = 'https://api.jsonbin.io/v3';

// مفتاح API - قم بتغييره من https://jsonbin.io
// أو استخدم هذا المفتاح المجاني للتجربة
let API_KEY = '$2a$10$YOUR_API_KEY_HERE';

// معرف الـ Bin (سيتم إنشاؤه تلقائياً)
let STORE_BIN_ID = '';

// تحميل الإعدادات من localStorage
const loadConfig = () => {
  const config = localStorage.getItem('db_config');
  if (config) {
    const parsed = JSON.parse(config);
    API_KEY = parsed.apiKey || API_KEY;
    STORE_BIN_ID = parsed.binId || STORE_BIN_ID;
  }
};

// حفظ الإعدادات
const saveConfig = (apiKey: string, binId: string) => {
  API_KEY = apiKey;
  STORE_BIN_ID = binId;
  localStorage.setItem('db_config', JSON.stringify({ apiKey, binId }));
};

// تحميل الإعدادات عند البدء
loadConfig();

// إنشاء Bin جديد
export const createBin = async (data: any): Promise<string | null> => {
  try {
    const response = await fetch(`${API_URL}/b`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
        'X-Bin-Name': 'bh-cosmetics-store',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create bin');
    }

    const result = await response.json();
    STORE_BIN_ID = result.metadata.id;
    saveConfig(API_KEY, STORE_BIN_ID);
    return STORE_BIN_ID;
  } catch (error) {
    console.error('Error creating bin:', error);
    return null;
  }
};

// قراءة البيانات من Bin
export const readBin = async (): Promise<any | null> => {
  if (!STORE_BIN_ID) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/b/${STORE_BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to read bin');
    }

    const result = await response.json();
    return result.record;
  } catch (error) {
    console.error('Error reading bin:', error);
    return null;
  }
};

// تحديث البيانات في Bin
export const updateBin = async (data: any): Promise<boolean> => {
  if (!STORE_BIN_ID) {
    // إنشاء Bin جديد إذا لم يكن موجوداً
    const binId = await createBin(data);
    return binId !== null;
  }

  try {
    const response = await fetch(`${API_URL}/b/${STORE_BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('Error updating bin:', error);
    return false;
  }
};

// تهيئة قاعدة البيانات
export const initDatabase = async (apiKey: string): Promise<boolean> => {
  API_KEY = apiKey;
  
  // محاولة قراءة Bin موجود
  if (STORE_BIN_ID) {
    const data = await readBin();
    if (data) {
      return true;
    }
  }

  // إنشاء Bin جديد مع البيانات الافتراضية
  const defaultData = {
    products: [],
    categories: [],
    banners: [],
    settings: {},
    orders: [],
  };

  const binId = await createBin(defaultData);
  return binId !== null;
};

// مزامنة البيانات
export const syncData = async (localData: any): Promise<any> => {
  // محاولة تحميل البيانات من السحابة
  const cloudData = await readBin();
  
  if (cloudData) {
    // دمج البيانات (السحابة لها الأولوية)
    return {
      ...localData,
      ...cloudData,
      // دمج المنتجات (إضافة الجديدة فقط)
      products: mergeProducts(localData.products || [], cloudData.products || []),
      orders: mergeOrders(localData.orders || [], cloudData.orders || []),
    };
  }
  
  // إذا لم تكن هناك بيانات سحابية، احفظ المحلية
  await updateBin(localData);
  return localData;
};

// دمج المنتجات
const mergeProducts = (local: any[], cloud: any[]) => {
  const merged = [...cloud];
  const cloudIds = new Set(cloud.map(p => p.id));
  
  local.forEach(product => {
    if (!cloudIds.has(product.id)) {
      merged.push(product);
    }
  });
  
  return merged;
};

// دمج الطلبات
const mergeOrders = (local: any[], cloud: any[]) => {
  const merged = [...cloud];
  const cloudIds = new Set(cloud.map(o => o.id));
  
  local.forEach(order => {
    if (!cloudIds.has(order.id)) {
      merged.push(order);
    }
  });
  
  return merged;
};

// التحقق من حالة الاتصال
export const isConnected = (): boolean => {
  return !!STORE_BIN_ID && !!API_KEY && API_KEY !== '$2a$10$YOUR_API_KEY_HERE';
};

// الحصول على معلومات الاتصال
export const getConnectionInfo = () => ({
  apiKey: API_KEY,
  binId: STORE_BIN_ID,
  isConnected: isConnected(),
});

export default {
  createBin,
  readBin,
  updateBin,
  initDatabase,
  syncData,
  isConnected,
  getConnectionInfo,
  saveConfig,
};
