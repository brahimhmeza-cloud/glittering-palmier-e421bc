import { useState } from 'react';
import { FiDatabase, FiCheck, FiCopy, FiDownload, FiUpload, FiLink } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function DatabasePanel() {
  const { products, categories, orders, getShareLink, exportData, importData } = useStore();
  const [isCopied, setIsCopied] = useState(false);

  const shareLink = getShareLink();

  // نسخ الرابط
  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setIsCopied(true);
      toast.success('تم نسخ الرابط! ✅ شاركه مع任何人');
      setTimeout(() => setIsCopied(false), 2000);
    }).catch(() => {
      const input = document.createElement('input');
      input.value = shareLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setIsCopied(true);
      toast.success('تم نسخ الرابط! ✅');
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  // مشاركة واتساب
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`تسوق من متجرنا: ${shareLink}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // تصدير ملف
  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bh-cosmetics.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('تم تحميل الملف! ✅');
  };

  // استيراد ملف
  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = ev.target?.result as string;
      if (importData(text)) {
        toast.success('تم استيراد البيانات! ✅');
        setTimeout(() => window.location.reload(), 500);
      } else {
        toast.error('خطأ في الملف');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FiDatabase className="w-6 h-6 text-pink-600" />
          قاعدة البيانات
        </h2>
        <p className="text-sm text-green-600 mt-1">✅ متصل بـ Firebase - يعمل للجميع!</p>
      </div>

      {/* إحصائيات */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-l from-pink-500 to-rose-500 p-4 rounded-xl text-white text-center">
          <p className="text-3xl font-bold">{products.length}</p>
          <p className="text-sm opacity-80">منتج</p>
        </div>
        <div className="bg-gradient-to-l from-purple-500 to-indigo-500 p-4 rounded-xl text-white text-center">
          <p className="text-3xl font-bold">{categories.length}</p>
          <p className="text-sm opacity-80">قسم</p>
        </div>
        <div className="bg-gradient-to-l from-blue-500 to-cyan-500 p-4 rounded-xl text-white text-center">
          <p className="text-3xl font-bold">{orders.length}</p>
          <p className="text-sm opacity-80">طلب</p>
        </div>
      </div>

      {/* ===== رابط المشاركة ===== */}
      <div className="bg-gradient-to-l from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300">
        <h3 className="font-bold text-green-800 mb-4 text-xl flex items-center gap-2">
          <FiLink className="w-6 h-6" />
          🔗 رابط متجرك الثابت
        </h3>
        <p className="text-sm text-green-700 mb-4">
          هذا الرابط <strong>ثابت وقصير</strong>. شاركه مرة واحدة مع الجميع!
        </p>

        {/* الرابط */}
        <div className="bg-white p-4 rounded-xl mb-4">
          <p className="font-mono text-sm text-gray-700 break-all" dir="ltr">{shareLink}</p>
        </div>

        {/* زر النسخ */}
        <button
          onClick={handleCopy}
          className={`w-full flex items-center justify-center gap-3 px-6 py-5 rounded-2xl font-bold text-xl transition-all ${
            isCopied 
              ? 'bg-green-500 text-white scale-95' 
              : 'bg-gradient-to-l from-green-500 to-emerald-600 text-white hover:shadow-2xl hover:scale-105 active:scale-95'
          }`}
        >
          {isCopied ? <><FiCheck className="w-7 h-7" /> تم النسخ!</> : <><FiCopy className="w-7 h-7" /> انسخ الرابط</>}
        </button>

        {/* أزرار المشاركة */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          <button onClick={handleWhatsApp} className="flex items-center justify-center gap-2 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600">
            📱 واتساب
          </button>
          <a href={shareLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600">
            🔗 فتح الرابط
          </a>
        </div>
      </div>

      {/* ===== نسخة احتياطية ===== */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-4 text-lg">📁 نسخة احتياطية</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button onClick={handleExport} className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-blue-300 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all">
            <FiDownload className="w-10 h-10 text-blue-600" />
            <p className="font-bold text-blue-800">تحميل ملف</p>
          </button>
          <label className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-purple-300 rounded-xl bg-purple-50 hover:bg-purple-100 transition-all cursor-pointer">
            <FiUpload className="w-10 h-10 text-purple-600" />
            <p className="font-bold text-purple-800">استيراد ملف</p>
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>
      </div>

      {/* ===== ملاحظة ===== */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h4 className="font-bold text-green-800 mb-3 text-lg">✅ كيف يعمل؟</h4>
        <div className="text-sm text-green-700 space-y-2">
          <p>✅ <strong>المنتجات تُحفظ تلقائياً</strong> في قاعدة البيانات</p>
          <p>✅ <strong>الرابط ثابت</strong> - لا يتغير أبداً</p>
          <p>✅ <strong>أي شخص يفتح الرابط</strong> - يرى منتجاتك</p>
          <p>✅ <strong>يعمل في أي مكان في العالم</strong> 🌍</p>
        </div>
      </div>
    </div>
  );
}
