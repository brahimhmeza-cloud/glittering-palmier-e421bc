import { useState } from 'react';
import { FiSearch, FiPackage, FiClock, FiCheckCircle, FiTruck, FiXCircle, FiPhone, FiMapPin } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const statusInfo: Record<string, { label: string; icon: React.ReactNode; color: string; bg: string }> = {
  pending: { label: 'قيد المراجعة', icon: <FiClock className="w-5 h-5" />, color: 'text-yellow-600', bg: 'bg-yellow-100' },
  confirmed: { label: 'تم التأكيد', icon: <FiCheckCircle className="w-5 h-5" />, color: 'text-blue-600', bg: 'bg-blue-100' },
  shipped: { label: 'قيد الشحن', icon: <FiTruck className="w-5 h-5" />, color: 'text-purple-600', bg: 'bg-purple-100' },
  delivered: { label: 'تم التوصيل', icon: <FiCheckCircle className="w-5 h-5" />, color: 'text-green-600', bg: 'bg-green-100' },
  cancelled: { label: 'ملغي', icon: <FiXCircle className="w-5 h-5" />, color: 'text-red-600', bg: 'bg-red-100' },
};

export default function MyOrders() {
  const { orders, settings } = useStore();
  const [searchType, setSearchType] = useState<'id' | 'phone'>('phone');
  const [searchValue, setSearchValue] = useState('');
  const [foundOrders, setFoundOrders] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      toast.error('يرجى إدخال رقم الطلب أو رقم الهاتف');
      return;
    }

    const results = orders.filter((order: any) => {
      if (searchType === 'id') {
        return order.id?.toString().includes(searchValue.trim());
      } else {
        return order.customer?.phone?.includes(searchValue.trim()) || 
               order.customer?.phone?.replace(/\s/g, '').includes(searchValue.trim().replace(/\s/g, ''));
      }
    });

    setFoundOrders(results);
    setHasSearched(true);

    if (results.length === 0) {
      toast.error('لم يتم العثور على طلبات');
    } else {
      toast.success(`تم العثور على ${results.length} طلب(ات)`);
    }
  };

  const getStatusSteps = (currentStatus: string) => {
    const allStatuses = ['pending', 'confirmed', 'shipped', 'delivered'];
    const currentIndex = allStatuses.indexOf(currentStatus);
    
    return allStatuses.map((status, index) => {
      const info = statusInfo[status];
      const isActive = index <= currentIndex;
      const isCurrent = status === currentStatus;
      
      return {
        ...info,
        status,
        isActive,
        isCurrent,
      };
    });
  };

  return (
    <section id="my-orders" className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
            📦 تتبع الطلبات
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            طلبياتي
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            تتبع حالة طلبك بسهولة - أدخل رقم الطلب أو رقم هاتفك
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            {/* Search Type Toggle */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => { setSearchType('phone'); setSearchValue(''); setFoundOrders([]); setHasSearched(false); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  searchType === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FiPhone className="w-4 h-4 inline ml-1" />
                رقم الهاتف
              </button>
              <button
                onClick={() => { setSearchType('id'); setSearchValue(''); setFoundOrders([]); setHasSearched(false); }}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  searchType === 'id' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <FiPackage className="w-4 h-4 inline ml-1" />
                رقم الطلب
              </button>
            </div>

            <form onSubmit={handleSearch} className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type={searchType === 'phone' ? 'tel' : 'text'}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={searchType === 'phone' ? 'أدخل رقم هاتفك (06xxxxxxxx)' : 'أدخل رقم الطلب'}
                  className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  dir={searchType === 'id' ? 'ltr' : undefined}
                />
                <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-l from-blue-600 to-indigo-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
              >
                بحث
              </button>
            </form>

            <p className="text-xs text-gray-400 mt-3 text-center">
              💡 يمكنك البحث برقم الهاتف الذي استخدمته عند الطلب
            </p>
          </div>
        </div>

        {/* Results */}
        {hasSearched && (
          <div className="max-w-3xl mx-auto">
            {foundOrders.length > 0 ? (
              <div className="space-y-6">
                <p className="text-center text-gray-600 mb-4">
                  تم العثور على <span className="font-bold text-blue-600">{foundOrders.length}</span> طلب(ات)
                </p>

                {foundOrders.reverse().map((order: any) => {
                  const currentStatus = statusInfo[order.status] || statusInfo.pending;
                  const steps = getStatusSteps(order.status || 'pending');

                  return (
                    <div key={order.id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                      {/* Order Header */}
                      <div className="bg-gradient-to-l from-blue-600 to-indigo-700 p-4 text-white">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div>
                            <p className="text-sm opacity-80">رقم الطلب</p>
                            <p className="font-bold text-lg">#{order.id?.slice(-6)}</p>
                          </div>
                          <div className={`px-4 py-2 rounded-full ${currentStatus.bg} ${currentStatus.color} flex items-center gap-2`}>
                            {currentStatus.icon}
                            <span className="font-medium text-sm">{currentStatus.label}</span>
                          </div>
                        </div>
                      </div>

                      {/* Order Progress */}
                      <div className="p-6">
                        {order.status !== 'cancelled' && (
                          <div className="flex items-center justify-between mb-8 relative">
                            {/* Progress Line */}
                            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0">
                              <div 
                                className="h-full bg-gradient-to-l from-green-500 to-blue-500 transition-all duration-500"
                                style={{ width: `${(steps.filter(s => s.isActive).length - 1) / (steps.length - 1) * 100}%` }}
                              />
                            </div>
                            
                            {steps.map((step, i) => (
                              <div key={i} className="relative z-10 flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  step.isActive ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
                                } ${step.isCurrent ? 'ring-4 ring-green-200 scale-110' : ''} transition-all`}>
                                  {step.icon}
                                </div>
                                <span className={`text-xs mt-2 font-medium ${step.isActive ? 'text-green-600' : 'text-gray-400'}`}>
                                  {step.label}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {order.status === 'cancelled' && (
                          <div className="bg-red-50 p-4 rounded-xl mb-6 flex items-center gap-3">
                            <FiXCircle className="w-6 h-6 text-red-500" />
                            <div>
                              <p className="font-bold text-red-700">تم إلغاء الطلب</p>
                              <p className="text-sm text-red-600">تواصل معنا لمعرفة السبب</p>
                            </div>
                          </div>
                        )}

                        {/* Order Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                              <FiMapPin className="w-4 h-4 text-blue-500" />
                              معلومات التوصيل
                            </h4>
                            <p className="text-sm text-gray-600">الاسم: {order.customer?.name}</p>
                            <p className="text-sm text-gray-600">الهاتف: {order.customer?.phone}</p>
                            <p className="text-sm text-gray-600">المدينة: {order.customer?.city}</p>
                            <p className="text-sm text-gray-600">العنوان: {order.customer?.address}</p>
                          </div>

                          <div className="bg-gray-50 p-4 rounded-xl">
                            <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                              <FiPackage className="w-4 h-4 text-purple-500" />
                              المنتجات
                            </h4>
                            {order.items?.map((item: any, i: number) => (
                              <p key={i} className="text-sm text-gray-600">
                                • {item.product} × {item.quantity}
                              </p>
                            ))}
                          </div>
                        </div>

                        {/* Order Total */}
                        <div className="bg-blue-50 p-4 rounded-xl">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">المجموع</span>
                            <span>{order.subtotal?.toLocaleString('ar-SA')} {settings.currencyAr}</span>
                          </div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-600">الشحن</span>
                            <span className={order.shipping === 0 ? 'text-green-600' : ''}>
                              {order.shipping === 0 ? 'مجاني' : `${order.shipping} ${settings.currencyAr}`}
                            </span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-blue-200">
                            <span className="font-bold">الإجمالي</span>
                            <span className="font-bold text-blue-600">{order.total?.toLocaleString('ar-SA')} {settings.currencyAr}</span>
                          </div>
                        </div>

                        <p className="text-xs text-gray-400 mt-3 text-center">
                          تاريخ الطلب: {new Date(order.date).toLocaleString('ar-SA')}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg border border-gray-100">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">لم يتم العثور على طلبات</h3>
                <p className="text-gray-500 mb-4">
                  تأكد من إدخال {searchType === 'phone' ? 'رقم الهاتف' : 'رقم الطلب'} الصحيح
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl">
                  <FiPhone className="w-4 h-4" />
                  <span className="text-sm">هل تحتاج مساعدة؟ تواصل معنا على واتساب</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Help Section */}
        <div className="max-w-2xl mx-auto mt-12 text-center">
          <div className="bg-gradient-to-l from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
            <h3 className="font-bold text-gray-900 mb-2">هل تحتاج مساعدة؟ 🤝</h3>
            <p className="text-gray-600 text-sm mb-4">
              تواصل معنا عبر واتساب لأي استفسار حول طلبك
            </p>
            <a
              href={`https://wa.me/${settings.whatsappNumber?.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              تواصل معنا
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
