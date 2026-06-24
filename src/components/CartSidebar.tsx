import { useState } from 'react';
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingBag, FiTruck, FiMessageCircle } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

// Moroccan Cities
const moroccanCities = [
  // جهات المغرب
  { value: 'casablanca', label: 'الدار البيضاء (Casablanca)' },
  { value: 'rabat', label: 'الرباط (Rabat)' },
  { value: 'marrakech', label: 'مراكش (Marrakech)' },
  { value: 'fes', label: 'فاس (Fès)' },
  { value: 'tanger', label: 'طنجة (Tanger)' },
  { value: 'agadir', label: 'أكادير (Agadir)' },
  { value: 'meknes', label: 'مكناس (Meknès)' },
  { value: 'oujda', label: 'وجدة (Oujda)' },
  { value: 'kenitra', label: 'القنيطرة (Kénitra)' },
  { value: 'tetouan', label: 'تطوان (Tétouan)' },
  { value: 'safi', label: 'آسفي (Safi)' },
  { value: 'mohammedia', label: 'المحمدية (Mohammedia)' },
  { value: 'khouribga', label: 'خريبكة (Khouribga)' },
  { value: 'beni-mellal', label: 'بني ملال (Béni Mellal)' },
  { value: 'el-jadida', label: 'الجديدة (El Jadida)' },
  { value: 'nador', label: 'الناظور (Nador)' },
  { value: 'taza', label: 'تازة (Taza)' },
  { value: 'settat', label: 'سطات (Settat)' },
  { value: 'berrechid', label: 'برشيد (Berrechid)' },
  { value: 'khemisset', label: 'الخميسات (Khémisset)' },
  { value: 'errachidia', label: 'الراشيدية (Errachidia)' },
  { value: 'guelmim', label: 'كلميم (Guelmim)' },
  { value: 'ifrane', label: 'إفران (Ifrane)' },
  { value: 'larache', label: 'العرائش (Larache)' },
  { value: 'ksar-el-kebir', label: 'القصر الكبير (Ksar El Kebir)' },
  { value: 'kenitra', label: 'القنيطرة (Kénitra)' },
  { value: 'sale', label: 'سلا (Salé)' },
  { value: 'temara', label: 'تمارة (Témara)' },
  { value: 'berkane', label: 'بركان (Berkane)' },
  { value: 'ouarzazate', label: 'ورزازات (Ouarzazate)' },
  { value: 'taroudant', label: 'تارودانت (Taroudant)' },
  { value: 'sidi-kacem', label: 'سيدي قاسم (Sidi Kacem)' },
  { value: 'youssoufia', label: 'اليوسفية (Youssoufia)' },
  { value: 'chefchaouen', label: 'شفشاون (Chefchaouen)' },
  { value: 'essaouira', label: 'الصويرة (Essaouira)' },
  { value: 'azrou', label: 'أزرو (Azrou)' },
  { value: 'midelt', label: 'ميدلت (Midelt)' },
  { value: 'ben-guerir', label: 'بن جرير (Ben Guerir)' },
  { value: 'kelaa-sraghna', label: 'قلعة السراغنة (Kelaa Sraghna)' },
  { value: 'other', label: 'مدينة أخرى (Autre ville)' },
];

export default function CartSidebar() {
  const { cart, isCartOpen, toggleCart, updateQuantity, removeFromCart, clearCart, settings, addOrder } = useStore();
  const whatsappNumber = settings.whatsappNumber;
  const [isCheckout, setIsCheckout] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: '',
  });

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal >= settings.freeShippingMin ? 0 : settings.shippingCost;
  const total = subtotal + shipping;

  const generateWhatsAppMessage = () => {
    let message = `🛍️ *طلب جديد من Priime Store - برايم ستور*\n`;
    message += `═══════════════════════\n\n`;
    message += `👤 *معلومات العميل:*\n`;
    message += `• الاسم: ${orderForm.name}\n`;
    message += `• الهاتف: ${orderForm.phone}\n`;
    if (orderForm.email) message += `• البريد: ${orderForm.email}\n`;
    message += `• المدينة: ${moroccanCities.find(c => c.value === orderForm.city)?.label || orderForm.city}\n`;
    message += `• العنوان: ${orderForm.address}\n`;
    if (orderForm.notes) message += `• ملاحظات: ${orderForm.notes}\n`;
    message += `\n`;
    message += `📦 *المنتجات:*\n`;
    message += `───────────────────────\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.product.nameAr}\n`;
      message += `   الكمية: ${item.quantity}\n`;
      message += `   السعر: ${(item.product.price * item.quantity).toLocaleString('ar-SA')} ${settings.currencyAr}\n`;
    });
    message += `\n`;
    message += `💰 *ملخص الطلب:*\n`;
    message += `───────────────────────\n`;
    message += `• المجموع: ${subtotal.toLocaleString('ar-SA')} ${settings.currencyAr}\n`;
    message += `• الشحن: ${shipping === 0 ? 'مجاني 🎉' : `${shipping} ${settings.currencyAr}`}\n`;
    message += `• *الإجمالي: ${total.toLocaleString('ar-SA')} ${settings.currencyAr}*\n`;
    message += `\n`;
    message += `✅ في انتظار تأكيد الطلب`;

    return encodeURIComponent(message);
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.name || !orderForm.phone || !orderForm.address || !orderForm.city) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }

    // Save order
    const order = {
      items: cart.map(item => ({
        product: item.product.nameAr,
        quantity: item.quantity,
        price: item.product.price
      })),
      customer: orderForm,
      subtotal,
      shipping,
      total,
      status: 'pending'
    };

    addOrder(order);

    // Generate WhatsApp message and redirect
    const whatsappMsg = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    toast.success(
      <div>
        <p className="font-bold mb-1">تم إرسال طلبك بنجاح! 🎉</p>
        <p className="text-sm">يتم توجيهك إلى واتساب لتأكيد الطلب</p>
      </div>,
      { duration: 5000 }
    );

    // Reset
    clearCart();
    setIsCheckout(false);
    setOrderForm({ name: '', phone: '', email: '', address: '', city: '', notes: '' });
    toggleCart();
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity"
        onClick={toggleCart}
      />

      {/* Sidebar */}
      <div className="fixed top-0 left-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slideIn">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FiShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isCheckout ? 'إتمام الطلب' : 'سلة التسوق'}
              </h2>
              <p className="text-xs text-gray-500">{cart.length} منتجات</p>
            </div>
          </div>
          <button
            onClick={() => isCheckout ? setIsCheckout(false) : toggleCart()}
            className="w-10 h-10 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {!isCheckout ? (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-4">
                    🛒
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">السلة فارغة</h3>
                  <p className="text-gray-500 text-sm mb-4">لم تقم بإضافة أي منتجات بعد</p>
                  <button
                    onClick={toggleCart}
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors active:scale-95"
                  >
                    تصفح المنتجات
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.nameAr}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80x80?text=صورة';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm truncate">{item.product.nameAr}</h4>
                      <p className="text-xs text-gray-500 mb-2">{item.product.categoryAr}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200">
                          <button
                            onClick={() => updateQuantity(item.product.id, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <FiMinus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors"
                          >
                            <FiPlus className="w-3 h-3" />
                          </button>
                        </div>
                        <span className="font-bold text-blue-600 text-sm">
                          {(item.product.price * item.quantity).toLocaleString('ar-SA')} {settings.currencyAr}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item.product.id);
                        toast.success('تم حذف المنتج من السلة');
                      }}
                      className="self-start w-8 h-8 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-6 space-y-4">
                {/* Shipping Info */}
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl">
                  <FiTruck className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">
                      {shipping === 0 ? 'شحن مجاني لجميع المدن المغربية! 🇲🇦' : `الشحن: ${settings.shippingCost} ${settings.currencyAr}`}
                    </p>
                    {shipping > 0 && (
                      <p className="text-xs text-green-600">
                        اطلب بقيمة {settings.freeShippingMin} {settings.currencyAr} أو أكثر للحصول على شحن مجاني
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">المجموع الفرعي</span>
                    <span className="font-medium">{subtotal.toLocaleString('ar-SA')} {settings.currencyAr}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">الشحن</span>
                    <span className={`font-medium ${shipping === 0 ? 'text-green-600' : ''}`}>
                      {shipping === 0 ? 'مجاني' : `${shipping} ${settings.currencyAr}`}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-100">
                    <span className="font-bold text-lg">الإجمالي</span>
                    <span className="font-bold text-lg text-blue-600">
                      {total.toLocaleString('ar-SA')} {settings.currencyAr}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckout(true)}
                  className="w-full py-4 bg-gradient-to-l from-green-600 to-emerald-700 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 active:scale-98"
                >
                  <FiMessageCircle className="w-5 h-5" />
                  إتمام الطلب عبر واتساب
                </button>

                <button
                  onClick={() => {
                    clearCart();
                    toast.success('تم إفراغ السلة');
                  }}
                  className="w-full py-3 text-gray-500 text-sm font-medium hover:text-red-500 transition-colors"
                >
                  إفراغ السلة
                </button>
              </div>
            )}
          </>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleCheckout} className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="bg-green-50 p-4 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <FiMessageCircle className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-green-800">سيتم إرسال الطلب عبر واتساب</p>
                <p className="text-xs text-green-600">املأ البيانات وأرسل الطلب مباشرة</p>
              </div>
            </div>

            <h3 className="font-bold text-gray-900">معلومات التوصيل 🇲🇦</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">الاسم الكامل *</label>
              <input
                type="text"
                value={orderForm.name}
                onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">رقم الهاتف *</label>
              <input
                type="tel"
                value={orderForm.phone}
                onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="06xxxxxxxx أو 07xxxxxxxx"
                dir="ltr"
                required
              />
              <p className="text-xs text-gray-400 mt-1">رقم هاتف مغربي (06 أو 07)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">البريد الإلكتروني (اختياري)</label>
              <input
                type="email"
                value={orderForm.email}
                onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                placeholder="example@email.com"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">المدينة *</label>
              <select
                value={orderForm.city}
                onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              >
                <option value="">اختر المدينة</option>
                {moroccanCities.map((city) => (
                  <option key={city.value} value={city.value}>
                    {city.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">العنوان بالتفصيل *</label>
              <textarea
                value={orderForm.address}
                onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[80px]"
                placeholder="الحي، الزنقة، رقم المنزل، المدينة..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ملاحظات إضافية (اختياري)</label>
              <textarea
                value={orderForm.notes}
                onChange={(e) => setOrderForm({ ...orderForm, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[60px]"
                placeholder="أي ملاحظات خاصة بالطلب..."
              />
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <h4 className="font-bold text-gray-900">ملخص الطلب</h4>
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.product.nameAr} × {item.quantity}</span>
                  <span className="font-medium">{(item.product.price * item.quantity).toLocaleString('ar-SA')} {settings.currencyAr}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span className="text-gray-500">الشحن</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'مجاني' : `${shipping} ${settings.currencyAr}`}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-bold">الإجمالي</span>
                <span className="font-bold text-blue-600">{total.toLocaleString('ar-SA')} {settings.currencyAr}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-l from-green-600 to-emerald-700 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-2 active:scale-98"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              إرسال الطلب عبر واتساب
            </button>

            <button
              type="button"
              onClick={() => setIsCheckout(false)}
              className="w-full py-3 text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors"
            >
              العودة للسلة
            </button>
          </form>
        )}
      </div>
    </>
  );
}
