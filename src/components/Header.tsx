import { useState, useEffect, useCallback } from 'react';
import { FiSearch, FiShoppingCart, FiMenu, FiX, FiHeart, FiPhone, FiMapPin, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export default function Header() {
  const { cart, toggleCart, toggleAdmin, searchQuery, setSearchQuery, settings, favorites } = useStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Admin access state
  const [clickCount, setClickCount] = useState(0);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset click count after 3 seconds of inactivity
  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => {
        setClickCount(0);
      }, 3000);
      setClickTimer(timer);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleLogoClick = useCallback(() => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5) {
      setClickCount(0);
      setShowPasswordModal(true);
      if (clickTimer) clearTimeout(clickTimer);
    }

    // Scroll to top on single click
    if (newCount === 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [clickCount, clickTimer]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === settings.adminPassword) {
      setShowPasswordModal(false);
      setAdminPassword('');
      toggleAdmin();
      toast.success('مرحباً بك في لوحة التحكم! 👋');
    } else {
      toast.error('كلمة المرور غير صحيحة ❌');
      setAdminPassword('');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        {/* Top Bar */}
        <div className="bg-gradient-to-l from-blue-600 to-indigo-700 text-white text-xs py-1.5">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                🚚 شحن مجاني للطلبات فوق {settings.freeShippingMin} {settings.currencyAr}
              </span>
              <span className="hidden md:flex items-center gap-1">
                <FiPhone className="w-3 h-3" />
                {settings.phone}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden md:flex items-center gap-1">
                <FiMapPin className="w-3 h-3" />
                {settings.addressAr}
              </span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo - Click 5 times for admin */}
            <button 
              onClick={handleLogoClick}
              className="flex items-center gap-2 relative"
              title={clickCount > 0 ? `${5 - clickCount} نقرات أخرى للوحة التحكم` : ''}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/30">
                T
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-l from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  {settings.storeNameAr}
                </h1>
                <p className="text-[10px] text-gray-500 -mt-1">{settings.storeSloganAr}</p>
              </div>
              {/* Click indicator */}
              {clickCount > 0 && (
                <span className="absolute -top-2 -left-2 w-5 h-5 bg-yellow-400 text-gray-900 text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                  {clickCount}
                </span>
              )}
            </button>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="ابحث عن منتجات... (هواتف، لابتوبات، سماعات، عطور)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => scrollToSection('all-products')}
                  className="w-full px-5 py-2.5 pr-12 rounded-xl border-2 border-gray-100 bg-gray-50/50 focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-300 text-sm"
                />
                <FiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-300"
                  >
                    <FiX className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              {/* Mobile Search Toggle */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <FiSearch className="w-5 h-5 text-gray-600" />
              </button>

              {/* Favorites */}
              <button className="relative p-2.5 rounded-xl hover:bg-pink-50 transition-colors group">
                <FiHeart className="w-5 h-5 text-gray-600 group-hover:text-pink-600 transition-colors" />
                {favorites.length > 0 && (
                  <span className="absolute -top-0.5 -left-0.5 w-4 h-4 bg-gradient-to-br from-pink-500 to-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-blue-50 transition-colors group"
              >
                <FiShoppingCart className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                <span className="hidden md:inline text-sm font-medium text-gray-700 group-hover:text-blue-600">السلة</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1 -left-1 w-5 h-5 bg-gradient-to-br from-red-500 to-pink-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg shadow-red-500/30 animate-bounce">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
              >
                {isMobileMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          {isSearchOpen && (
            <div className="md:hidden mt-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن منتجات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border-2 border-gray-100 bg-gray-50 focus:border-blue-500 focus:outline-none text-sm"
                />
                <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="hidden md:flex items-center justify-center gap-1 mt-2 pt-2 border-t border-gray-100">
            {[
              { label: 'الرئيسية', id: 'hero' },
              { label: 'الأقسام', id: 'categories' },
              { label: 'الأكثر مبيعاً', id: 'featured' },
              { label: 'جميع المنتجات', id: 'all-products' },
              { label: '📦 طلبياتي', id: 'my-orders' },
              { label: 'تواصل معنا', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1 animate-fadeIn">
            {[
              { label: '🏠 الرئيسية', id: 'hero' },
              { label: '📂 الأقسام', id: 'categories' },
              { label: '⭐ الأكثر مبيعاً', id: 'featured' },
              { label: '🛍️ جميع المنتجات', id: 'all-products' },
              { label: '🧴 العطور والعناية', id: 'all-products' },
              { label: '🍳 الأواني والمطبخ', id: 'all-products' },
              { label: '📦 طلبياتي', id: 'my-orders' },
              { label: '📞 تواصل معنا', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id + item.label}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-right px-4 py-3 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2 mt-2 border-t border-gray-100">
              <p className="text-xs text-gray-400 text-center">اضغط على الشعار 5 مرات للوحة التحكم</p>
            </div>
          </div>
        )}
      </header>

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 animate-fadeIn">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-white mb-4">
                <FiLock className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">لوحة التحكم</h2>
              <p className="text-sm text-gray-500 mt-1">أدخل كلمة المرور للوصول</p>
            </div>

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="كلمة المرور"
                  className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-center text-lg"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-l from-blue-600 to-indigo-700 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  دخول
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordModal(false);
                    setAdminPassword('');
                  }}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                >
                  إلغاء
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-400 text-center mt-4">
              كلمة المرور الافتراضية: 20070609
            </p>
          </div>
        </div>
      )}
    </>
  );
}
