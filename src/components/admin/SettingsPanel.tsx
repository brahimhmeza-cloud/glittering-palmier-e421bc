import { useState } from 'react';
import { FiHome, FiUsers, FiDollarSign, FiSave } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function SettingsPanel() {
  const { settings, updateSettings } = useStore();
  const [localSettings, setLocalSettings] = useState({ ...settings });

  const handleSave = () => {
    updateSettings(localSettings);
    toast.success('تم حفظ الإعدادات بنجاح ✅');
  };

  const handleCurrencyChange = (value: string) => {
    const currencyMap: Record<string, { currencyAr: string; currencySymbol: string }> = {
      'SAR': { currencyAr: 'ر.س', currencySymbol: '﷼' },
      'USD': { currencyAr: '$', currencySymbol: '$' },
      'EUR': { currencyAr: '€', currencySymbol: '€' },
      'AED': { currencyAr: 'د.إ', currencySymbol: 'د.إ' },
      'EGP': { currencyAr: 'ج.م', currencySymbol: 'ج.م' },
      'KWD': { currencyAr: 'د.ك', currencySymbol: 'د.ك' },
      'BHD': { currencyAr: 'د.ب', currencySymbol: 'د.ب' },
      'QAR': { currencyAr: 'ر.ق', currencySymbol: 'ر.ق' },
      'MAD': { currencyAr: 'د.م', currencySymbol: 'د.م' },
      'TND': { currencyAr: 'د.ت', currencySymbol: 'د.ت' },
      'DZD': { currencyAr: 'د.ج', currencySymbol: 'د.ج' },
      'LYD': { currencyAr: 'د.ل', currencySymbol: 'د.ل' },
    };
    const curr = currencyMap[value] || { currencyAr: value, currencySymbol: value };
    setLocalSettings({ ...localSettings, currency: value, ...curr });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">إعدادات المتجر</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Store Info */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
              <FiHome className="w-4 h-4" />
            </span>
            معلومات المتجر
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المتجر (عربي)</label>
              <input
                type="text"
                value={localSettings.storeNameAr}
                onChange={(e) => setLocalSettings({ ...localSettings, storeNameAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اسم المتجر (إنجليزي)</label>
              <input
                type="text"
                value={localSettings.storeName}
                onChange={(e) => setLocalSettings({ ...localSettings, storeName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الشعار (عربي)</label>
              <input
                type="text"
                value={localSettings.storeSloganAr}
                onChange={(e) => setLocalSettings({ ...localSettings, storeSloganAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الشعار (إنجليزي)</label>
              <input
                type="text"
                value={localSettings.storeSlogan}
                onChange={(e) => setLocalSettings({ ...localSettings, storeSlogan: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-green-100 text-green-600 flex items-center justify-center">
              <FiUsers className="w-4 h-4" />
            </span>
            معلومات التواصل
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف</label>
              <input
                type="text"
                value={localSettings.phone}
                onChange={(e) => setLocalSettings({ ...localSettings, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني</label>
              <input
                type="email"
                value={localSettings.email}
                onChange={(e) => setLocalSettings({ ...localSettings, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العنوان (عربي)</label>
              <input
                type="text"
                value={localSettings.addressAr}
                onChange={(e) => setLocalSettings({ ...localSettings, addressAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العنوان (إنجليزي)</label>
              <input
                type="text"
                value={localSettings.address}
                onChange={(e) => setLocalSettings({ ...localSettings, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Currency */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
              <FiDollarSign className="w-4 h-4" />
            </span>
            إعدادات العملة
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العملة</label>
              <select
                value={localSettings.currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
              >
                <option value="SAR">ريال سعودي (SAR) - ر.س</option>
                <option value="USD">دولار أمريكي (USD) - $</option>
                <option value="EUR">يورو (EUR) - €</option>
                <option value="AED">درهم إماراتي (AED) - د.إ</option>
                <option value="EGP">جنيه مصري (EGP) - ج.م</option>
                <option value="KWD">دينار كويتي (KWD) - د.ك</option>
                <option value="BHD">دينار بحريني (BHD) - د.ب</option>
                <option value="QAR">ريال قطري (QAR) - ر.ق</option>
                <option value="MAD">درهم مغربي (MAD) - د.م</option>
                <option value="TND">دينار تونسي (TND) - د.ت</option>
                <option value="DZD">دينار جزائري (DZD) - د.ج</option>
                <option value="LYD">دينار ليبي (LYD) - د.ل</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رمز العملة بالعربي</label>
              <input
                type="text"
                value={localSettings.currencyAr}
                onChange={(e) => setLocalSettings({ ...localSettings, currencyAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800">
                💡 عند تغيير العملة هنا، ستتغير أسعار جميع المنتجات في الموقع تلقائياً
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-600">
                العملة الحالية: <span className="font-bold text-blue-600">{localSettings.currency}</span> - <span className="font-bold">{localSettings.currencyAr}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">🎨</span>
            ألوان المتجر
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اللون الرئيسي</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={localSettings.primaryColor}
                  onChange={(e) => setLocalSettings({ ...localSettings, primaryColor: e.target.value })}
                  className="w-12 h-12 rounded-xl cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={localSettings.primaryColor}
                  onChange={(e) => setLocalSettings({ ...localSettings, primaryColor: e.target.value })}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                  dir="ltr"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">اللون الثانوي</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={localSettings.secondaryColor}
                  onChange={(e) => setLocalSettings({ ...localSettings, secondaryColor: e.target.value })}
                  className="w-12 h-12 rounded-xl cursor-pointer border-0"
                />
                <input
                  type="text"
                  value={localSettings.secondaryColor}
                  onChange={(e) => setLocalSettings({ ...localSettings, secondaryColor: e.target.value })}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                  dir="ltr"
                />
              </div>
            </div>
            {/* Color Preview */}
            <div className="flex gap-3">
              <div
                className="flex-1 h-16 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: localSettings.primaryColor }}
              >
                اللون الرئيسي
              </div>
              <div
                className="flex-1 h-16 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: localSettings.secondaryColor }}
              >
                اللون الثانوي
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 lg:col-span-2">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">📱</span>
            حسابات التواصل الاجتماعي
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 text-blue-600">📘</span>
                  رابط فيسبوك
                </span>
              </label>
              <input
                type="url"
                value={localSettings.facebookUrl}
                onChange={(e) => setLocalSettings({ ...localSettings, facebookUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                placeholder="https://facebook.com/your-page"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 text-pink-600">📸</span>
                  رابط إنستغرام
                </span>
              </label>
              <input
                type="url"
                value={localSettings.instagramUrl}
                onChange={(e) => setLocalSettings({ ...localSettings, instagramUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                placeholder="https://instagram.com/your-account"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 text-green-600">💬</span>
                  رقم واتساب
                </span>
              </label>
              <input
                type="tel"
                value={localSettings.whatsappNumber}
                onChange={(e) => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                placeholder="+966501234567"
                dir="ltr"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 text-gray-900">🎵</span>
                  رابط تيك توك
                </span>
              </label>
              <input
                type="url"
                value={localSettings.tiktokUrl}
                onChange={(e) => setLocalSettings({ ...localSettings, tiktokUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                placeholder="https://tiktok.com/@your-account"
                dir="ltr"
              />
            </div>
          </div>
          <div className="mt-4 p-4 bg-blue-50 rounded-xl">
            <p className="text-sm text-blue-800">
              💡 ستظهر هذه الحسابات في أسفل الموقع (الفوتر) مع أيقونات خاصة لكل منصة. كما سيظهر زر واتساب عائم في أسفل الشاشة للتواصل السريع.
            </p>
          </div>
        </div>

        {/* Admin Password */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 lg:col-span-2">
          <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">🔒</span>
            أمان لوحة التحكم
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">كلمة مرور لوحة التحكم</label>
              <input
                type="password"
                value={localSettings.adminPassword}
                onChange={(e) => setLocalSettings({ ...localSettings, adminPassword: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                placeholder="أدخل كلمة مرور جديدة"
              />
            </div>
            <div className="flex items-center">
              <div className="p-4 bg-yellow-50 rounded-xl w-full">
                <p className="text-sm text-yellow-800">
                  ⚠️ <strong>ملاحظة:</strong> اضغط على شعار المتجر 5 مرات متتالية ثم أدخل كلمة المرور للوصول للوحة التحكم.
                </p>
                <p className="text-xs text-yellow-600 mt-2">
                  كلمة المرور الحالية: {localSettings.adminPassword ? '••••••••' : 'غير محددة'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-4">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-8 py-3 bg-gradient-to-l from-blue-600 to-indigo-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
        >
          <FiSave className="w-5 h-5" />
          حفظ جميع الإعدادات
        </button>
        <button
          onClick={() => setLocalSettings({ ...settings })}
          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          إعادة تعيين
        </button>
      </div>
    </div>
  );
}
