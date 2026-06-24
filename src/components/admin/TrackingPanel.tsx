import { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import { useStore } from '../../store/useStore';
import toast from 'react-hot-toast';

export default function TrackingPanel() {
  const { settings, updateSettings } = useStore();
  const [facebookPixelId, setFacebookPixelId] = useState(settings.facebookPixelId);
  const [tiktokPixelId, setTiktokPixelId] = useState(settings.tiktokPixelId);

  const handleSave = () => {
    updateSettings({ facebookPixelId, tiktokPixelId });
    toast.success('تم حفظ إعدادات التتبع بنجاح ✅');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">تتبع الزوار (Pixel Tracking)</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Facebook Pixel */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl">
              📘
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Facebook Pixel</h3>
              <p className="text-sm text-gray-500">تتبع زيارات المتجر عبر فيسبوك</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook Pixel ID</label>
              <input
                type="text"
                value={facebookPixelId}
                onChange={(e) => setFacebookPixelId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                placeholder="مثال: 1234567890123456"
                dir="ltr"
              />
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600 mb-2 font-medium">كيفية الحصول على Pixel ID:</p>
              <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
                <li>اذهب إلى Events Manager في Facebook</li>
                <li>أنشئ Pixel جديد أو اختر موجود</li>
                <li>انسخ Pixel ID وألصقه هنا</li>
              </ol>
            </div>

            {facebookPixelId && (
              <div className="p-3 bg-green-50 rounded-xl">
                <p className="text-sm text-green-700">✅ Facebook Pixel مفعل: {facebookPixelId}</p>
              </div>
            )}
          </div>
        </div>

        {/* TikTok Pixel */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gray-900 text-white flex items-center justify-center text-2xl">
              🎵
            </div>
            <div>
              <h3 className="font-bold text-gray-900">TikTok Pixel</h3>
              <p className="text-sm text-gray-500">تتبع زيارات المتجر عبر تيك توك</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">TikTok Pixel ID</label>
              <input
                type="text"
                value={tiktokPixelId}
                onChange={(e) => setTiktokPixelId(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none"
                placeholder="مثال: C4A7B8D9E0F1G2H3I4"
                dir="ltr"
              />
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600 mb-2 font-medium">كيفية الحصول على TikTok Pixel ID:</p>
              <ol className="text-xs text-gray-500 space-y-1 list-decimal list-inside">
                <li>اذهب إلى TikTok Ads Manager</li>
                <li>اختر Events ثم Web Events</li>
                <li>أنشئ Pixel جديد وانسخ الـ ID</li>
              </ol>
            </div>

            {tiktokPixelId && (
              <div className="p-3 bg-green-50 rounded-xl">
                <p className="text-sm text-green-700">✅ TikTok Pixel مفعل: {tiktokPixelId}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors active:scale-95"
      >
        <FiSave className="w-4 h-4" />
        حفظ إعدادات التتبع
      </button>

      {/* Code Preview */}
      {(facebookPixelId || tiktokPixelId) && (
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4">معاينة الكود المضاف تلقائياً</h3>
          <div className="bg-gray-900 text-green-400 p-4 rounded-xl text-xs font-mono overflow-x-auto" dir="ltr">
            {facebookPixelId && (
              <pre>{`<!-- Facebook Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', '${facebookPixelId}');
  fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none"
       src="https://www.facebook.com/tr?id=${facebookPixelId}&ev=PageView&noscript=1" />
</noscript>`}</pre>
            )}
            {tiktokPixelId && (
              <pre className="mt-4">{`<!-- TikTok Pixel Code -->
<script>
  !function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
  ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
  ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
  for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
  ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";
  ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};
  ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};
  var o=document.createElement("script");o.type="text/javascript";
  o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;
  var a=document.getElementsByTagName("script")[0];
  a.parentNode.insertBefore(o,a)};
  ttq.load('${tiktokPixelId}');
  ttq.page();
}(window, document, 'ttq');
</script>`}</pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
