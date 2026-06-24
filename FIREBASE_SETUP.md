# 🔥 إعداد Firebase لجعل المنتجات تظهر للجميع

## الخطوة 1: إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com)
2. اضغط على **"Add Project"** أو **"إنشاء مشروع"**
3. أدخل اسم المشروع: `bh-cosmetics-store`
4. اضغط **Continue** → **Continue** → **Create Project**

## الخطوة 2: إضافة تطبيق الويب

1. اضغط على أيقونة **Web** (</>)
2. أدخل اسم التطبيق: `bh-cosmetics-web`
3. اضغط **Register App**
4. **انسخ الإعدادات** التي تظهر (ستحتاجها لاحقاً)

## الخطوة 3: إنشاء قاعدة بيانات

1. من القائمة الجانبية، اختر **Realtime Database**
2. اضغط **Create Database**
3. اختر الموقع الأقرب لك (europ-west1 مناسب للمغرب)
4. اختر **Start in test mode** (سنغيره لاحقاً)
5. اضغط **Enable**

## الخطوة 4: إعدادات الأمان

من تبويب **Rules**، ضع هذا الكود:

```json
{
  "rules": {
    ".read": true,
    "products": {
      ".write": true
    },
    "categories": {
      ".write": true
    },
    "banners": {
      ".write": true
    },
    "settings": {
      ".write": true
    },
    "orders": {
      ".write": true
    }
  }
}
```

ثم اضغط **Publish**

## الخطوة 5: تحديث الإعدادات في المشروع

افتح ملف `src/firebase/config.ts` واستبدل الإعدادات:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSy... (من Firebase)",
  authDomain: "bh-cosmetics-xxxxx.firebaseapp.com",
  databaseURL: "https://bh-cosmetics-xxxxx-default-rtdb.firebaseio.com",
  projectId: "bh-cosmetics-xxxxx",
  storageBucket: "bh-cosmetics-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

## الخطوة 6: نشر الموقع

### على Vercel (مجاني):
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول بـ GitHub
3. ارفع المشروع
4. سيظهر لك رابط مثل: `bh-cosmetics.vercel.app`

### على Netlify (مجاني):
1. اذهب إلى [netlify.com](https://netlify.com)
2. اسحب مجلد `dist` وأفلته
3. سيظهر لك رابط

## ✅ النتيجة النهائية

بعد إعداد Firebase:
- ✅ أي منتج تضيفه سيظهر لجميع المستخدمين
- ✅ أي تعديل في الإعدادات سيظهر للجميع
- ✅ الطلبات ستُحفظ في مكان واحد
- ✅ الموقع يعمل على أي جهاز في العالم

## 📱 تغيير الدومين

للحصول على `priimestore.ma`:
1. اشترِ الدومين من [GoDaddy](https://godaddy.com) أو [Namecheap](https://namecheap.com)
2. في Vercel/Netlify، أضف الدومين
3. حدّث DNS records حسب التعليمات

## 🔑 ملاحظات أمان

- غيّر `adminPassword` من لوحة التحكم
- لا تشارك إعدادات Firebase مع أحد
- استخدم قواعد أمان أفضل في الإنتاج
