import { useState } from 'react';
import { FiTruck, FiSave } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function ShippingPanel() {
  const { settings, updateSettings } = useStore();
  const [shippingCost, setShippingCost] = useState(settings.shippingCost);
  const [freeShippingMin, setFreeShippingMin] = useState(settings.freeShippingMin);

  const handleSave = () => {
    updateSettings({ shippingCost, freeShippingMin });
    toast.success('تم حفظ إعدادات الشحن بنجاح ✅');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">إعدادات الشحن والتوصيل</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FiTruck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">تكلفة الشحن</h3>
              <p className="text-sm text-gray-500">حدد سعر التوصيل الافتراضي</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                سعر الشحن ({settings.currencyAr})
              </label>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                الحد الأدنى للشحن المجاني ({settings.currencyAr})
              </label>
              <input
                type="number"
                value={freeShippingMin}
                onChange={(e) => setFreeShippingMin(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                min="0"
              />
            </div>

            <div className="p-4 bg-green-50 rounded-xl">
              <p className="text-sm text-green-800">
                ✅ الشحن مجاني للطلبات فوق {freeShippingMin.toLocaleString('ar-SA')} {settings.currencyAr}
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors active:scale-95"
          >
            <FiSave className="w-4 h-4" />
            حفظ إعدادات الشحن
          </button>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">معاينة إعدادات الشحن</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">سعر الشحن</span>
              <span className="font-bold text-blue-600">{shippingCost} {settings.currencyAr}</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-600">الحد للشحن المجاني</span>
              <span className="font-bold text-green-600">{freeShippingMin} {settings.currencyAr}</span>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg space-y-2">
              <p className="text-sm text-blue-800 font-medium">أمثلة:</p>
              <p className="text-sm text-blue-700">
                📦 طلب بقيمة 100 {settings.currencyAr} = شحن {shippingCost} {settings.currencyAr}
              </p>
              <p className="text-sm text-blue-700">
                📦 طلب بقيمة {freeShippingMin} {settings.currencyAr} = شحن مجاني 🎉
              </p>
              <p className="text-sm text-blue-700">
                📦 طلب بقيمة {freeShippingMin + 100} {settings.currencyAr} = شحن مجاني 🎉
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
