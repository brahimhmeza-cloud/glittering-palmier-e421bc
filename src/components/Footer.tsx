import { FiPhone, FiMail, FiMapPin, FiCreditCard, FiTruck, FiShield, FiHeadphones, FiHeart, FiMessageCircle } from 'react-icons/fi';
import { useStore } from '../store/useStore';

// Social Media Icons Components
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export default function Footer() {
  const { settings } = useStore();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const number = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${number}`, '_blank');
  };

  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      {/* Features Bar */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <FiTruck className="w-6 h-6" />, title: 'شحن سريع', desc: `شحن مجاني فوق ${settings.freeShippingMin} ${settings.currencyAr}` },
              { icon: <FiShield className="w-6 h-6" />, title: 'ضمان الجودة', desc: 'منتجات أصلية 100%' },
              { icon: <FiCreditCard className="w-6 h-6" />, title: 'دفع آمن', desc: 'طرق دفع متعددة' },
              { icon: <FiHeadphones className="w-6 h-6" />, title: 'دعم 24/7', desc: 'خدمة عملاء متميزة' },
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{feature.title}</h4>
                  <p className="text-xs text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg">T</div>
              <div>
                <h3 className="text-xl font-bold text-white">{settings.storeNameAr}</h3>
                <p className="text-xs text-gray-500">{settings.storeSloganAr}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              نحن وجهتك الأولى للحصول على أحدث الأجهزة الإلكترونية والإكسسوارات التقنية والعطور الفاخرة بأسعار تنافسية وجودة عالية.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3">
              {settings.facebookUrl && (
                <a 
                  href={settings.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-800 text-gray-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"
                  title="فيسبوك"
                >
                  <FacebookIcon />
                </a>
              )}
              {settings.instagramUrl && (
                <a 
                  href={settings.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-800 text-gray-400 flex items-center justify-center hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300"
                  title="إنستغرام"
                >
                  <InstagramIcon />
                </a>
              )}
              {settings.whatsappNumber && (
                <button 
                  onClick={openWhatsApp}
                  className="w-10 h-10 rounded-xl bg-gray-800 text-gray-400 flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                  title="واتساب"
                >
                  <WhatsAppIcon />
                </button>
              )}
              {settings.tiktokUrl && (
                <a 
                  href={settings.tiktokUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-800 text-gray-400 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300"
                  title="تيك توك"
                >
                  <TikTokIcon />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              {[
                { label: 'الرئيسية', id: 'hero' },
                { label: 'المنتجات', id: 'all-products' },
                { label: 'العروض الخاصة', id: 'offers' },
                { label: 'الأقسام', id: 'categories' },
                { label: 'تواصل معنا', id: 'contact' },
              ].map((link) => (
                <li key={link.id}>
                  <button onClick={() => scrollToSection(link.id)} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-bold mb-6">الأقسام</h4>
            <ul className="space-y-3">
              {['الهواتف الذكية', 'اللابتوبات', 'السماعات', 'الساعات الذكية', 'الإكسسوارات', 'العطور والعناية بالشعر'].map((link) => (
                <li key={link}>
                  <button onClick={() => scrollToSection('all-products')} className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-800 text-blue-400 flex items-center justify-center"><FiPhone className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm text-gray-500">اتصل بنا</p>
                  <p className="text-white font-medium" dir="ltr">{settings.phone}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-800 text-green-400 flex items-center justify-center"><FiMessageCircle className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm text-gray-500">واتساب</p>
                  <button onClick={openWhatsApp} className="text-white font-medium hover:text-green-400 transition-colors" dir="ltr">
                    {settings.whatsappNumber}
                  </button>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-800 text-purple-400 flex items-center justify-center"><FiMail className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                  <p className="text-white font-medium">{settings.email}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-800 text-orange-400 flex items-center justify-center"><FiMapPin className="w-5 h-5" /></div>
                <div>
                  <p className="text-sm text-gray-500">العنوان</p>
                  <p className="text-white font-medium">{settings.addressAr}</p>
                </div>
              </li>
            </ul>

            {/* Social Media Links - Contact Section */}
            <div className="mt-6 flex flex-wrap gap-2">
              {settings.facebookUrl && (
                <a 
                  href={settings.facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg text-sm text-gray-400 hover:bg-blue-600 hover:text-white transition-all"
                >
                  <FacebookIcon />
                  <span>فيسبوك</span>
                </a>
              )}
              {settings.instagramUrl && (
                <a 
                  href={settings.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg text-sm text-gray-400 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all"
                >
                  <InstagramIcon />
                  <span>إنستغرام</span>
                </a>
              )}
              {settings.whatsappNumber && (
                <button 
                  onClick={openWhatsApp}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg text-sm text-gray-400 hover:bg-green-600 hover:text-white transition-all"
                >
                  <WhatsAppIcon />
                  <span>واتساب</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      {settings.whatsappNumber && (
        <button
          onClick={openWhatsApp}
          className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30 hover:bg-green-600 hover:scale-110 transition-all duration-300 animate-pulse"
          title="تواصل معنا عبر واتساب"
        >
          <WhatsAppIcon />
        </button>
      )}

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            © 2024 {settings.storeNameAr}. جميع الحقوق محفوظة | صنع بـ <FiHeart className="w-3 h-3 text-red-500 fill-red-500" />
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600">طرق الدفع:</span>
            <div className="flex gap-2">
              {['💳', '🏦', '📱', '💰'].map((icon, i) => (
                <span key={i} className="w-10 h-7 bg-gray-800 rounded-lg flex items-center justify-center text-sm">{icon}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
