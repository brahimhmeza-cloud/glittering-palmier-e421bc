import { useState, useEffect, useRef } from 'react';
import {
  FiHome, FiPackage, FiGrid, FiImage, FiSettings, FiArrowRight,
  FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiSearch,
  FiTruck, FiCode, FiShoppingCart, FiBell,
  FiCheckCircle, FiClock, FiXCircle, FiEye, FiDatabase
} from 'react-icons/fi';
import { useStore, Product, Category, Banner } from '../store/useStore';
import toast from 'react-hot-toast';
import SettingsPanel from './admin/SettingsPanel';
import ShippingPanel from './admin/ShippingPanel';
import TrackingPanel from './admin/TrackingPanel';
import DatabasePanel from './admin/DatabasePanel';

// Order status options
const orderStatuses = [
  { id: 'pending', label: 'قيد المراجعة', labelEn: 'Pending', icon: <FiClock className="w-4 h-4" />, color: 'bg-yellow-100 text-yellow-700' },
  { id: 'confirmed', label: 'مؤكد', labelEn: 'Confirmed', icon: <FiCheckCircle className="w-4 h-4" />, color: 'bg-blue-100 text-blue-700' },
  { id: 'shipped', label: 'قيد الشحن', labelEn: 'Shipped', icon: <FiTruck className="w-4 h-4" />, color: 'bg-purple-100 text-purple-700' },
  { id: 'delivered', label: 'تم التوصيل', labelEn: 'Delivered', icon: <FiCheckCircle className="w-4 h-4" />, color: 'bg-green-100 text-green-700' },
  { id: 'cancelled', label: 'ملغي', labelEn: 'Cancelled', icon: <FiXCircle className="w-4 h-4" />, color: 'bg-red-100 text-red-700' },
];

export default function AdminPanel() {
  const {
    products, categories, banners, settings, orders, notifications, unreadNotifications,
    toggleAdmin, updateProduct, addProduct, deleteProduct,
    updateCategory, addCategory, deleteCategory,
    updateBanner, addBanner, deleteBanner,
    updateOrderStatus, markNotificationsAsRead, clearNotifications
  } = useStore();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const totalProducts = products.length;
  const totalCategories = categories.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o: any) => o.status === 'pending').length;

  // Play sound and show notification on new order
  useEffect(() => {
    if (unreadNotifications > 0) {
      // Try to play notification sound
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;
        oscillator.start();
        setTimeout(() => oscillator.stop(), 200);
      } catch (e) {}

      // Show browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('طلب جديد! 🎉', {
          body: `لديك ${unreadNotifications} طلب(ات) جديد(ة) - افتح لوحة التحكم للمراجعة`,
          icon: '🛍️'
        });
      }
    }
  }, [unreadNotifications]);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const getStatusInfo = (status: string) => {
    return orderStatuses.find(s => s.id === status) || orderStatuses[0];
  };

  const tabs = [
    { id: 'dashboard', label: 'لوحة القيادة', icon: <FiHome className="w-5 h-5" /> },
    { id: 'products', label: 'المنتجات', icon: <FiPackage className="w-5 h-5" /> },
    { id: 'categories', label: 'الأقسام', icon: <FiGrid className="w-5 h-5" /> },
    { id: 'banners', label: 'البانرات', icon: <FiImage className="w-5 h-5" /> },
    { id: 'orders', label: 'الطلبات', icon: <FiShoppingCart className="w-5 h-5" />, badge: pendingOrders },
    { id: 'shipping', label: 'الشحن', icon: <FiTruck className="w-5 h-5" /> },
    { id: 'tracking', label: 'التتبع', icon: <FiCode className="w-5 h-5" /> },
    { id: 'database', label: 'قاعدة البيانات', icon: <FiDatabase className="w-5 h-5" /> },
    { id: 'settings', label: 'الإعدادات', icon: <FiSettings className="w-5 h-5" /> },
  ];

  const stats = [
    { title: 'إجمالي المنتجات', value: totalProducts, icon: <FiPackage className="w-6 h-6" />, color: 'from-blue-500 to-blue-600' },
    { title: 'الأقسام', value: totalCategories, icon: <FiGrid className="w-6 h-6" />, color: 'from-purple-500 to-purple-600' },
    { title: 'الطلبات الجديدة', value: pendingOrders, icon: <FiBell className="w-6 h-6" />, color: 'from-orange-500 to-orange-600' },
    { title: 'إجمالي الطلبات', value: totalOrders, icon: <FiShoppingCart className="w-6 h-6" />, color: 'from-green-500 to-green-600' },
  ];

  // Dashboard
  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-l from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-2">مرحباً بك في لوحة التحكم 👋</h2>
        <p className="text-white/80">يمكنك إدارة متجرك بالكامل من هنا</p>
        {pendingOrders > 0 && (
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full animate-pulse">
            <FiBell className="w-4 h-4" />
            <span>لديك {pendingOrders} طلب(ات) جديد(ة) بانتظار المراجعة!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} text-white flex items-center justify-center`}>
                {stat.icon}
              </div>
              {stat.title === 'الطلبات الجديدة' && pendingOrders > 0 && (
                <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs font-bold animate-bounce">جديد</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-500">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Notifications */}
      {notifications.length > 0 && (
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FiBell className="w-5 h-5 text-orange-500" />
              آخر الإشعارات
            </h3>
            <button onClick={() => { markNotificationsAsRead(); }} className="text-blue-600 text-sm font-medium hover:text-blue-700">
              تحديد الكل كمقروء
            </button>
          </div>
          <div className="space-y-3">
            {notifications.slice(0, 5).map((notif: any) => (
              <div key={notif.id} className={`flex items-center gap-3 p-3 rounded-xl ${notif.read ? 'bg-gray-50' : 'bg-blue-50 border border-blue-200'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notif.read ? 'bg-gray-200' : 'bg-blue-500 text-white'}`}>
                  🛒
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{notif.title}</p>
                  <p className="text-sm text-gray-500">{notif.message}</p>
                </div>
                <span className="text-xs text-gray-400">{new Date(notif.date).toLocaleTimeString('ar-SA')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">إجراءات سريعة</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'الطلبات الجديدة', icon: '📋', tab: 'orders', badge: pendingOrders },
            { label: 'إضافة منتج', icon: '📦', tab: 'products' },
            { label: 'إعدادات الشحن', icon: '🚚', tab: 'shipping' },
            { label: 'تتبع الزوار', icon: '📊', tab: 'tracking' },
            { label: 'إعدادات المتجر', icon: '⚙️', tab: 'settings' },
            { label: 'إدارة الأقسام', icon: '📂', tab: 'categories' },
            { label: 'تعديل البانرات', icon: '🖼️', tab: 'banners' },
            { label: 'العودة للمتجر', icon: '🏪', tab: 'store' },
          ].map((action, i) => (
            <button
              key={i}
              onClick={() => action.tab === 'store' ? toggleAdmin() : setActiveTab(action.tab)}
              className="relative p-4 rounded-xl bg-gray-50 hover:bg-blue-50 hover:border-blue-200 border border-gray-100 transition-all text-center active:scale-95"
            >
              {action.badge && action.badge > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                  {action.badge}
                </span>
              )}
              <span className="text-2xl mb-2 block">{action.icon}</span>
              <span className="text-sm font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">آخر الطلبات</h3>
          <button onClick={() => setActiveTab('orders')} className="text-blue-600 text-sm font-medium hover:text-blue-700">عرض الكل ←</button>
        </div>
        {orders.length > 0 ? (
          <div className="space-y-3">
            {(orders as any[]).slice(-5).reverse().map((order: any) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => { setSelectedOrder(order); setActiveTab('orders'); }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      🛒
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{order.customer?.name || 'عميل'}</p>
                      <p className="text-sm text-gray-500">{order.items?.length || 0} منتجات</p>
                    </div>
                  </div>
                  <div className="text-left flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                    <div>
                      <p className="font-bold text-blue-600">{order.total?.toLocaleString('ar-SA')} {settings.currencyAr}</p>
                      <p className="text-xs text-gray-400">{new Date(order.date).toLocaleDateString('ar-SA')}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">📦</div>
            <p className="text-gray-500">لا توجد طلبات بعد</p>
            <p className="text-sm text-gray-400">ستظهر الطلبات هنا عندما يقوم العملاء بالشراء</p>
          </div>
        )}
      </div>
    </div>
  );

  // Orders Section - Enhanced
  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">إدارة الطلبات</h2>
          <p className="text-sm text-gray-500">إجمالي الطلبات: {totalOrders} | جديدة: {pendingOrders}</p>
        </div>
        <div className="flex gap-2">
          {orderStatuses.map(status => {
            const count = orders.filter((o: any) => o.status === status.id).length;
            return (
              <button
                key={status.id}
                onClick={() => setSearchTerm(status.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${searchTerm === status.id ? status.color : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {status.label} ({count})
              </button>
            );
          })}
          <button onClick={() => setSearchTerm('')} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-200 text-gray-700 hover:bg-gray-300">
            الكل
          </button>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">تفاصيل الطلب #{selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">
                <FiX className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-bold text-gray-700 mb-3">معلومات العميل:</h4>
                <div className="space-y-2 bg-gray-50 p-4 rounded-xl">
                  <p><span className="text-gray-500">الاسم:</span> <span className="font-medium">{selectedOrder.customer?.name}</span></p>
                  <p><span className="text-gray-500">الهاتف:</span> <span className="font-medium" dir="ltr">{selectedOrder.customer?.phone}</span></p>
                  <p><span className="text-gray-500">البريد:</span> <span className="font-medium">{selectedOrder.customer?.email || 'غير محدد'}</span></p>
                  <p><span className="text-gray-500">المدينة:</span> <span className="font-medium">{selectedOrder.customer?.city}</span></p>
                  <p><span className="text-gray-500">العنوان:</span> <span className="font-medium">{selectedOrder.customer?.address}</span></p>
                  {selectedOrder.customer?.notes && <p><span className="text-gray-500">ملاحظات:</span> <span className="font-medium">{selectedOrder.customer?.notes}</span></p>}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-700 mb-3">المنتجات:</h4>
                <div className="space-y-2 bg-gray-50 p-4 rounded-xl">
                  {selectedOrder.items?.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                      <span className="text-gray-700">{item.product}</span>
                      <span className="text-sm text-gray-500">× {item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">المجموع الفرعي:</span>
                <span className="font-medium">{selectedOrder.subtotal?.toLocaleString('ar-SA')} {settings.currencyAr}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">الشحن:</span>
                <span className="font-medium">{selectedOrder.shipping?.toLocaleString('ar-SA')} {settings.currencyAr}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-blue-200">
                <span className="font-bold text-lg">الإجمالي:</span>
                <span className="font-bold text-lg text-blue-600">{selectedOrder.total?.toLocaleString('ar-SA')} {settings.currencyAr}</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-700 mb-3">تحديث حالة الطلب:</h4>
              <div className="flex flex-wrap gap-2">
                {orderStatuses.map(status => (
                  <button
                    key={status.id}
                    onClick={() => {
                      updateOrderStatus(selectedOrder.id, status.id);
                      setSelectedOrder({ ...selectedOrder, status: status.id });
                      toast.success(`تم تحديث حالة الطلب إلى: ${status.label}`);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedOrder.status === status.id ? status.color + ' ring-2 ring-offset-2' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status.icon}
                    {status.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Orders List */}
      {orders.length > 0 ? (
        <div className="space-y-4">
          {(orders as any[])
            .filter((o: any) => !searchTerm || o.status === searchTerm)
            .reverse()
            .map((order: any) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <div key={order.id} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-lg">
                        🛒
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">طلب #{order.id.slice(-6)}</h3>
                        <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString('ar-SA')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusInfo.color} flex items-center gap-2`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </span>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="px-4 py-2 bg-blue-100 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-200 flex items-center gap-2"
                      >
                        <FiEye className="w-4 h-4" />
                        التفاصيل
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">العميل</p>
                      <p className="font-medium text-gray-900">{order.customer?.name}</p>
                      <p className="text-sm text-gray-500" dir="ltr">{order.customer?.phone}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">المنتجات</p>
                      <p className="font-medium text-gray-900">{order.items?.length} منتجات</p>
                      <p className="text-sm text-gray-500 truncate">{order.items?.map((i: any) => i.product).join(', ')}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500 mb-1">المبلغ</p>
                      <p className="font-bold text-blue-600 text-lg">{order.total?.toLocaleString('ar-SA')} {settings.currencyAr}</p>
                      <p className="text-xs text-gray-400">شحن: {order.shipping?.toLocaleString('ar-SA')}</p>
                    </div>
                  </div>

                  {/* Quick Status Update */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500 py-2">تحديث الحالة:</span>
                    {orderStatuses.map(status => (
                      <button
                        key={status.id}
                        onClick={() => {
                          updateOrderStatus(order.id, status.id);
                          toast.success(`تم تحديث الحالة إلى: ${status.label}`);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          order.status === status.id ? status.color : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">لا توجد طلبات بعد</h3>
          <p className="text-gray-500 mb-4">ستظهر الطلبات هنا عندما يقوم العملاء بالشراء من متجرك</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl">
            <FiBell className="w-4 h-4" />
            <span className="text-sm">سيتم إشعارك فوراً عند وصول أي طلب جديد</span>
          </div>
        </div>
      )}
    </div>
  );

  // Products Section
  const renderProducts = () => {
    const filtered = products.filter(p =>
      p.nameAr.includes(searchTerm) || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.categoryAr.includes(searchTerm)
    );

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-xl font-bold text-gray-900">إدارة المنتجات ({products.length})</h2>
          <button onClick={() => { setIsAddingNew(true); setEditingItem(null); }} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
            <FiPlus className="w-4 h-4" /> إضافة منتج
          </button>
        </div>

        <div className="relative">
          <input type="text" placeholder="ابحث عن منتج..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 pr-10 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" />
          <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>

        {(isAddingNew || editingItem) && (
          <ProductForm product={editingItem} categories={categories} onSave={(product) => {
            if (editingItem) { updateProduct(product.id, product); toast.success('تم تحديث المنتج ✅'); }
            else { addProduct({ ...product, id: Date.now().toString() }); toast.success('تم إضافة المنتج ✅'); }
            setEditingItem(null); setIsAddingNew(false);
          }} onCancel={() => { setEditingItem(null); setIsAddingNew(false); }} />
        )}

        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">المنتج</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">القسم</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">السعر</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">الحالة</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">إجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product) => (
                  <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt="" className="w-12 h-12 rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48'; }} />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{product.nameAr}</p>
                          <p className="text-xs text-gray-500">{product.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">{product.categoryAr}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-gray-900 text-sm">{product.price.toLocaleString('ar-SA')} {settings.currencyAr}</span>
                      {product.originalPrice && <span className="block text-xs text-gray-400 line-through">{product.originalPrice.toLocaleString('ar-SA')}</span>}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.inStock ? 'متوفر' : 'غير متوفر'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => { setEditingItem(product); setIsAddingNew(false); }} className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200"><FiEdit2 className="w-4 h-4" /></button>
                        <button onClick={() => { if (confirm('هل أنت متأكد؟')) { deleteProduct(product.id); toast.success('تم حذف المنتج'); } }} className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200"><FiTrash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Categories Section
  const renderCategories = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">إدارة الأقسام</h2>
        <button onClick={() => { setIsAddingNew(true); setEditingItem(null); }} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
          <FiPlus className="w-4 h-4" /> إضافة قسم
        </button>
      </div>

      {(isAddingNew || editingItem) && (
        <CategoryForm category={editingItem} onSave={(category) => {
          if (editingItem) { updateCategory(category.id, category); toast.success('تم تحديث القسم ✅'); }
          else { addCategory({ ...category, id: Date.now().toString() }); toast.success('تم إضافة القسم ✅'); }
          setEditingItem(null); setIsAddingNew(false);
        }} onCancel={() => { setEditingItem(null); setIsAddingNew(false); }} />
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center text-3xl">{category.icon}</div>
              <div className="flex gap-2">
                <button onClick={() => { setEditingItem(category); setIsAddingNew(false); }} className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200"><FiEdit2 className="w-4 h-4" /></button>
                <button onClick={() => { if (confirm('هل أنت متأكد؟')) { deleteCategory(category.id); toast.success('تم حذف القسم'); } }} className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200"><FiTrash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900 mb-1">{category.nameAr}</h3>
            <p className="text-sm text-gray-500">{category.name}</p>
            <span className="mt-3 inline-block px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium">{category.count} منتج</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Banners Section
  const renderBanners = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">إدارة البانرات</h2>
        <button onClick={() => { setIsAddingNew(true); setEditingItem(null); }} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700">
          <FiPlus className="w-4 h-4" /> إضافة بانر
        </button>
      </div>

      {(isAddingNew || editingItem) && (
        <BannerForm banner={editingItem} onSave={(banner) => {
          if (editingItem) { updateBanner(banner.id, banner); toast.success('تم تحديث البانر ✅'); }
          else { addBanner({ ...banner, id: Date.now().toString() }); toast.success('تم إضافة البانر ✅'); }
          setEditingItem(null); setIsAddingNew(false);
        }} onCancel={() => { setEditingItem(null); setIsAddingNew(false); }} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {banners.map((banner) => {
          const getGradient = (g: string) => {
            if (g.includes('blue')) return 'from-blue-900 to-indigo-900';
            if (g.includes('gray')) return 'from-gray-900 to-black';
            if (g.includes('purple')) return 'from-purple-900 to-pink-900';
            if (g.includes('green')) return 'from-green-900 to-emerald-900';
            return 'from-red-900 to-orange-900';
          };
          return (
            <div key={banner.id} className={`relative overflow-hidden rounded-2xl bg-gradient-to-l ${getGradient(banner.gradient)} h-48`}>
              <div className="relative p-6 text-white h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{banner.titleAr}</h3>
                  <p className="text-white/80">{banner.subtitleAr}</p>
                </div>
                <div className="flex items-center justify-between">
                  <button className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium">{banner.buttonTextAr}</button>
                  <div className="flex gap-2">
                    <button onClick={() => { setEditingItem(banner); setIsAddingNew(false); }} className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center hover:bg-white/30"><FiEdit2 className="w-4 h-4" /></button>
                    <button onClick={() => { if (confirm('هل أنت متأكد؟')) { deleteBanner(banner.id); toast.success('تم حذف البانر'); } }} className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center hover:bg-red-500/80"><FiTrash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'products': return renderProducts();
      case 'categories': return renderCategories();
      case 'banners': return renderBanners();
      case 'orders': return renderOrders();
      case 'shipping': return <ShippingPanel />;
      case 'tracking': return <TrackingPanel />;
      case 'database': return <DatabasePanel />;
      case 'settings': return <SettingsPanel />;
      default: return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold">T</div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">لوحة التحكم</h1>
              <p className="text-xs text-gray-500">{settings.storeNameAr}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <FiBell className="w-5 h-5 text-gray-600" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute left-0 top-12 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">الإشعارات</h3>
                    <button onClick={() => { markNotificationsAsRead(); }} className="text-blue-600 text-xs font-medium">تحديد الكل كمقروء</button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? notifications.slice(0, 10).map((notif: any) => (
                      <div key={notif.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${!notif.read ? 'bg-blue-50' : ''}`} onClick={() => { setActiveTab('orders'); setShowNotifications(false); }}>
                        <p className="font-medium text-gray-900 text-sm">{notif.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{notif.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{new Date(notif.date).toLocaleTimeString('ar-SA')}</p>
                      </div>
                    )) : (
                      <div className="p-8 text-center text-gray-500">لا توجد إشعارات</div>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="p-3 border-t border-gray-100">
                      <button onClick={() => { clearNotifications(); setShowNotifications(false); }} className="w-full text-center text-red-600 text-sm font-medium hover:text-red-700">
                        حذف جميع الإشعارات
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button onClick={toggleAdmin} className="flex items-center gap-2 px-4 py-2.5 bg-gray-100 rounded-xl text-gray-700 font-medium hover:bg-gray-200 transition-colors">
              <FiArrowRight className="w-4 h-4" />
              العودة للمتجر
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white border-l border-gray-100 md:min-h-[calc(100vh-65px)] md:sticky md:top-[65px]">
          <nav className="p-4 flex md:flex-col gap-1 overflow-x-auto md:overflow-visible">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setEditingItem(null); setIsAddingNew(false); setSearchTerm(''); }}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                {tab.icon}
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

// Product Form Component
function ProductForm({ product, categories, onSave, onCancel }: { product: Product | null; categories: Category[]; onSave: (p: Product) => void; onCancel: () => void; }) {
  const { settings } = useStore();
  const [form, setForm] = useState<Product>(product || {
    id: '', name: '', nameAr: '', price: 0, originalPrice: undefined, image: '',
    category: categories[0]?.name.toLowerCase() || '', categoryAr: categories[0]?.nameAr || '',
    description: '', descriptionAr: '', rating: 4.5, reviews: 0, inStock: true, featured: false, badge: '', specs: []
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{product ? 'تعديل المنتج' : 'إضافة منتج جديد'}</h3>
        <button onClick={onCancel} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"><FiX className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">اسم المنتج (عربي) *</label>
          <input type="text" value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">اسم المنتج (إنجليزي) *</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" dir="ltr" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">القسم</label>
          <select value={form.category} onChange={(e) => { const cat = categories.find(c => c.name.toLowerCase() === e.target.value); setForm({ ...form, category: e.target.value, categoryAr: cat?.nameAr || '' }); }} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none">
            {categories.map(c => <option key={c.id} value={c.name.toLowerCase()}>{c.nameAr}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">السعر ({settings.currencyAr}) *</label>
          <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">السعر قبل الخصم</label>
          <input type="number" value={form.originalPrice || ''} onChange={(e) => setForm({ ...form, originalPrice: e.target.value ? Number(e.target.value) : undefined })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">صورة المنتج</label>
          <div className="flex gap-4">
            <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" placeholder="رابط الصورة أو ارفع من جهازك" dir="ltr" />
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">📁 رفع</button>
          </div>
          {form.image && <img src={form.image} alt="معاينة" className="mt-3 w-32 h-32 object-cover rounded-xl border" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">الوصف</label>
          <textarea value={form.descriptionAr} onChange={(e) => setForm({ ...form, descriptionAr: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none min-h-[80px]" />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} className="w-5 h-5 rounded text-blue-600" /><span className="text-sm font-medium text-gray-700">متوفر</span></label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="w-5 h-5 rounded text-blue-600" /><span className="text-sm font-medium text-gray-700">مميز</span></label>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={() => { if (!form.nameAr || !form.name || !form.price) { toast.error('يرجى ملء الحقول'); return; } onSave(form); }} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"><FiSave className="w-4 h-4" />{product ? 'تحديث' : 'إضافة'}</button>
        <button onClick={onCancel} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">إلغاء</button>
      </div>
    </div>
  );
}

// Category Form
function CategoryForm({ category, onSave, onCancel }: { category: Category | null; onSave: (c: Category) => void; onCancel: () => void; }) {
  const [form, setForm] = useState<Category>(category || { id: '', name: '', nameAr: '', icon: '📦', count: 0 });
  const emojis = ['📱', '💻', '🎧', '⌚', '🔌', '📲', '📷', '🎮', '🖥️', '⌨️', '🖱️', '📺', '🔋', '💾', '🧴', '💄', '✨'];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{category ? 'تعديل القسم' : 'إضافة قسم جديد'}</h3>
        <button onClick={onCancel} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"><FiX className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">اسم القسم (عربي) *</label>
          <input type="text" value={form.nameAr} onChange={(e) => setForm({ ...form, nameAr: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">اسم القسم (إنجليزي) *</label>
          <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" dir="ltr" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">الأيقونة</label>
          <div className="flex flex-wrap gap-2">
            {emojis.map((emoji) => (
              <button key={emoji} onClick={() => setForm({ ...form, icon: emoji })} className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${form.icon === emoji ? 'bg-blue-100 ring-2 ring-blue-500 scale-110' : 'bg-gray-100 hover:bg-gray-200'}`}>{emoji}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={() => { if (!form.nameAr || !form.name) { toast.error('يرجى ملء الحقول'); return; } onSave(form); }} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"><FiSave className="w-4 h-4" />{category ? 'تحديث' : 'إضافة'}</button>
        <button onClick={onCancel} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">إلغاء</button>
      </div>
    </div>
  );
}

// Banner Form
function BannerForm({ banner, onSave, onCancel }: { banner: Banner | null; onSave: (b: Banner) => void; onCancel: () => void; }) {
  const [form, setForm] = useState<Banner>(banner || { id: '', title: '', titleAr: '', subtitle: '', subtitleAr: '', image: '', buttonText: '', buttonTextAr: '', gradient: 'from-blue-900 via-blue-800 to-indigo-900', link: '#products' });

  const gradients = [
    { value: 'from-blue-900 via-blue-800 to-indigo-900', preview: 'bg-gradient-to-l from-blue-900 to-indigo-900' },
    { value: 'from-gray-900 via-gray-800 to-black', preview: 'bg-gradient-to-l from-gray-900 to-black' },
    { value: 'from-purple-900 via-purple-800 to-pink-900', preview: 'bg-gradient-to-l from-purple-900 to-pink-900' },
    { value: 'from-green-900 via-green-800 to-emerald-900', preview: 'bg-gradient-to-l from-green-900 to-emerald-900' },
    { value: 'from-red-900 via-red-800 to-orange-900', preview: 'bg-gradient-to-l from-red-900 to-orange-900' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">{banner ? 'تعديل البانر' : 'إضافة بانر جديد'}</h3>
        <button onClick={onCancel} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200"><FiX className="w-4 h-4" /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">العنوان (عربي) *</label>
          <input type="text" value={form.titleAr} onChange={(e) => setForm({ ...form, titleAr: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">العنوان (إنجليزي) *</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" dir="ltr" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">النص الفرعي (عربي)</label>
          <input type="text" value={form.subtitleAr} onChange={(e) => setForm({ ...form, subtitleAr: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">نص الزر (عربي)</label>
          <input type="text" value={form.buttonTextAr} onChange={(e) => setForm({ ...form, buttonTextAr: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">رابط الصورة *</label>
          <input type="text" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none" dir="ltr" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">اللون الخلفي</label>
          <div className="flex gap-3">
            {gradients.map((g) => (
              <button key={g.value} onClick={() => setForm({ ...form, gradient: g.value })} className={`flex-1 h-12 rounded-xl ${g.preview} transition-all ${form.gradient === g.value ? 'ring-2 ring-blue-500 ring-offset-2 scale-105' : 'hover:scale-105'}`} />
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-6">
        <button onClick={() => { if (!form.titleAr || !form.title) { toast.error('يرجى ملء الحقول'); return; } onSave(form); }} className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700"><FiSave className="w-4 h-4" />{banner ? 'تحديث' : 'إضافة'}</button>
        <button onClick={onCancel} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200">إلغاء</button>
      </div>
    </div>
  );
}
