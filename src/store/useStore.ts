import { create } from 'zustand';

// ===== Interfaces =====
export interface Product {
  id: string;
  name: string;
  nameAr: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  categoryAr: string;
  description: string;
  descriptionAr: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  featured: boolean;
  badge?: string;
  specs?: string[];
}

export interface Category {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  count: number;
}

export interface Banner {
  id: string;
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  image: string;
  buttonText: string;
  buttonTextAr: string;
  gradient: string;
  link: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreSettings {
  storeName: string;
  storeNameAr: string;
  storeSlogan: string;
  storeSloganAr: string;
  primaryColor: string;
  secondaryColor: string;
  currency: string;
  currencyAr: string;
  currencySymbol: string;
  phone: string;
  email: string;
  address: string;
  addressAr: string;
  shippingCost: number;
  freeShippingMin: number;
  facebookPixelId: string;
  tiktokPixelId: string;
  facebookUrl: string;
  instagramUrl: string;
  whatsappNumber: string;
  tiktokUrl: string;
  adminPassword: string;
}

interface AppState {
  products: Product[];
  categories: Category[];
  banners: Banner[];
  cart: CartItem[];
  settings: StoreSettings;
  isCartOpen: boolean;
  isAdminOpen: boolean;
  activeTab: string;
  searchQuery: string;
  selectedCategory: string;
  isCheckoutOpen: boolean;
  orders: any[];
  favorites: string[];
  notifications: any[];
  unreadNotifications: number;

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  toggleAdmin: () => void;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setIsCheckoutOpen: (open: boolean) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateCategory: (id: string, data: Partial<Category>) => void;
  addCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  updateBanner: (id: string, data: Partial<Banner>) => void;
  addBanner: (banner: Banner) => void;
  deleteBanner: (id: string) => void;
  updateSettings: (settings: Partial<StoreSettings>) => void;
  toggleFavorite: (productId: string) => void;
  addOrder: (order: any) => void;
  updateOrderStatus: (orderId: string, status: string) => void;
  markNotificationsAsRead: () => void;
  clearNotifications: () => void;
  formatPrice: (price: number) => string;
  getShareLink: () => string;
  exportData: () => string;
  importData: (json: string) => boolean;
}

// ===== Defaults =====
const defaultCategories: Category[] = [
  { id: '1', name: 'Perfumes', nameAr: 'العطور', icon: '🧴', count: 0 },
  { id: '2', name: 'Cookware', nameAr: 'الأواني والمطبخ', icon: '🍳', count: 0 },
  { id: '3', name: 'Smartphones', nameAr: 'الهواتف الذكية', icon: '📱', count: 0 },
  { id: '4', name: 'Headphones', nameAr: 'السماعات', icon: '🎧', count: 0 },
  { id: '5', name: 'Smartwatches', nameAr: 'الساعات الذكية', icon: '⌚', count: 0 },
  { id: '6', name: 'Accessories', nameAr: 'الإكسسوارات', icon: '🔌', count: 0 },
  { id: '7', name: 'Gaming', nameAr: 'الألعاب', icon: '🎮', count: 0 },
  { id: '8', name: 'Hair', nameAr: 'العناية بالشعر', icon: '💇', count: 0 },
];

const defaultBanners: Banner[] = [
  {
    id: '1', title: 'BH Cosmétiques TRD', titleAr: 'BH Cosmétiques TRD',
    subtitle: 'Beauty Products', subtitleAr: 'مستحضرات التجميل والعناية بالجمال',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=500&fit=crop',
    buttonText: 'Shop Now', buttonTextAr: 'تسوق الآن',
    gradient: 'from-pink-900 via-purple-800 to-indigo-900', link: '#products'
  },
  {
    id: '2', title: 'New Collection', titleAr: 'مجموعة جديدة',
    subtitle: 'Shop Now', subtitleAr: 'تسوق الآن مع خصومات حصرية',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=500&fit=crop',
    buttonText: 'Explore', buttonTextAr: 'اكتشف',
    gradient: 'from-purple-900 via-pink-800 to-red-900', link: '#products'
  }
];

const defaultSettings: StoreSettings = {
  storeName: 'BH Cosmétiques TRD',
  storeNameAr: 'BH Cosmétiques TRD',
  storeSlogan: 'Your destination for premium cosmetics',
  storeSloganAr: 'وجهتك لمستحضرات التجميل ومنتجات العناية بالجمال',
  primaryColor: '#ec4899',
  secondaryColor: '#8b5cf6',
  currency: 'MAD',
  currencyAr: 'د.م',
  currencySymbol: 'د.م',
  phone: '+212 6 79 34 12 49',
  email: 'info@bhcosmetics-trd.ma',
  address: 'Taroudant, Morocco',
  addressAr: 'تارودانت، المغرب',
  shippingCost: 30,
  freeShippingMin: 300,
  facebookPixelId: '',
  tiktokPixelId: '',
  facebookUrl: 'https://www.facebook.com/hmza.elaali.5',
  instagramUrl: 'https://instagram.com/bhcosmetics-trd',
  whatsappNumber: '+212679341249',
  tiktokUrl: 'https://tiktok.com/@bhcosmetics-trd',
  adminPassword: '20070609',
};

// ===== Firebase Config (مجاني) =====
const FIREBASE_URL = 'https://bh-cosmetics-store-default-rtdb.firebaseio.com';

// ===== معرف المتجر الثابت =====
const STORE_ID = 'main-store';

// ===== حفظ في Firebase =====
const saveToCloud = async (data: any): Promise<boolean> => {
  try {
    const response = await fetch(`${FIREBASE_URL}/stores/${STORE_ID}.json`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      localStorage.setItem('bh-store', JSON.stringify(data));
      return true;
    }
  } catch (e) {
    console.log('Firebase not available, using localStorage');
  }
  localStorage.setItem('bh-store', JSON.stringify(data));
  return false;
};

// ===== تحميل من Firebase =====
const loadFromCloud = async (): Promise<any | null> => {
  try {
    const response = await fetch(`${FIREBASE_URL}/stores/${STORE_ID}.json`);
    if (response.ok) {
      const data = await response.json();
      if (data) {
        localStorage.setItem('bh-store', JSON.stringify(data));
        return data;
      }
    }
  } catch (e) {
    console.log('Firebase not available, using localStorage');
  }
  const local = localStorage.getItem('bh-store');
  return local ? JSON.parse(local) : null;
};

// ===== تحميل البيانات الأولية =====
let initialData: any = null;

// محاولة تحميل من URL أولاً
const params = new URLSearchParams(window.location.search);
const urlData = params.get('data');
if (urlData) {
  try {
    initialData = JSON.parse(decodeURIComponent(urlData));
    localStorage.setItem('bh-store', JSON.stringify(initialData));
    window.history.replaceState({}, '', window.location.pathname);
  } catch {}
}

// ===== Store =====
export const useStore = create<AppState>((set, get) => ({
  products: initialData?.products || [],
  categories: initialData?.categories || defaultCategories,
  banners: initialData?.banners || defaultBanners,
  cart: [],
  settings: { ...defaultSettings, ...(initialData?.settings || {}) },
  isCartOpen: false,
  isAdminOpen: false,
  activeTab: 'dashboard',
  searchQuery: '',
  selectedCategory: '',
  isCheckoutOpen: false,
  orders: initialData?.orders || [],
  favorites: [],
  notifications: initialData?.notifications || [],
  unreadNotifications: 0,

  // تحميل تلقائي من Firebase
  ...((): Partial<AppState> => {
    if (!initialData) {
      loadFromCloud().then(data => {
        if (data) {
          set({
            products: data.products || [],
            categories: data.categories || defaultCategories,
            banners: data.banners || defaultBanners,
            settings: { ...defaultSettings, ...(data.settings || {}) },
            orders: data.orders || [],
          });
        }
      });
    }
    return {};
  })(),

  // Cart
  addToCart: (product) => set((s) => ({
    cart: s.cart.find(i => i.product.id === product.id)
      ? s.cart.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      : [...s.cart, { product, quantity: 1 }]
  })),
  removeFromCart: (id) => set((s) => ({ cart: s.cart.filter(i => i.product.id !== id) })),
  updateQuantity: (id, q) => set((s) => ({
    cart: q === 0 ? s.cart.filter(i => i.product.id !== id) : s.cart.map(i => i.product.id === id ? { ...i, quantity: q } : i)
  })),
  clearCart: () => set({ cart: [] }),
  toggleCart: () => set((s) => ({ isCartOpen: !s.isCartOpen })),
  toggleAdmin: () => set((s) => ({ isAdminOpen: !s.isAdminOpen })),
  setActiveTab: (t) => set({ activeTab: t }),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setSelectedCategory: (c) => set({ selectedCategory: c }),
  setIsCheckoutOpen: (o) => set({ isCheckoutOpen: o }),

  // Products (مع حفظ تلقائي في Firebase)
  updateProduct: (id, data) => {
    set((s) => ({ products: s.products.map(p => p.id === id ? { ...p, ...data } : p) }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },
  addProduct: (product) => {
    set((s) => ({ products: [...s.products, product] }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },
  deleteProduct: (id) => {
    set((s) => ({ products: s.products.filter(p => p.id !== id) }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },

  // Categories
  updateCategory: (id, data) => {
    set((s) => ({ categories: s.categories.map(c => c.id === id ? { ...c, ...data } : c) }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },
  addCategory: (cat) => {
    set((s) => ({ categories: [...s.categories, cat] }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },
  deleteCategory: (id) => {
    set((s) => ({ categories: s.categories.filter(c => c.id !== id) }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },

  // Banners
  updateBanner: (id, data) => {
    set((s) => ({ banners: s.banners.map(b => b.id === id ? { ...b, ...data } : b) }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },
  addBanner: (banner) => {
    set((s) => ({ banners: [...s.banners, banner] }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },
  deleteBanner: (id) => {
    set((s) => ({ banners: s.banners.filter(b => b.id !== id) }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },

  // Settings
  updateSettings: (settings) => {
    set((s) => ({ settings: { ...s.settings, ...settings } }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },

  // Others
  toggleFavorite: (id) => set((s) => ({
    favorites: s.favorites.includes(id) ? s.favorites.filter(f => f !== id) : [...s.favorites, id]
  })),
  addOrder: (order) => {
    set((s) => ({
      orders: [...s.orders, { ...order, id: Date.now().toString(), date: new Date().toISOString(), status: 'pending' }],
      notifications: [{ id: Date.now().toString(), type: 'new_order', title: 'طلب جديد! 🎉', message: `طلب من ${order.customer?.name || 'عميل'}`, read: false, date: new Date().toISOString() }, ...s.notifications],
      unreadNotifications: s.unreadNotifications + 1
    }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },
  updateOrderStatus: (orderId, status) => {
    set((s) => ({ orders: s.orders.map(o => o.id === orderId ? { ...o, status } : o) }));
    const s = get();
    saveToCloud({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders });
  },
  markNotificationsAsRead: () => set((s) => ({
    notifications: s.notifications.map(n => ({ ...n, read: true })), unreadNotifications: 0
  })),
  clearNotifications: () => set({ notifications: [], unreadNotifications: 0 }),
  formatPrice: (price) => `${price.toLocaleString('ar-SA')} ${get().settings.currencyAr}`,

  // رابط المشاركة القصير
  getShareLink: () => {
    return window.location.origin + window.location.pathname;
  },

  // تصدير البيانات
  exportData: () => {
    const s = get();
    return JSON.stringify({ products: s.products, categories: s.categories, banners: s.banners, settings: s.settings, orders: s.orders }, null, 2);
  },

  // استيراد البيانات
  importData: (json: string) => {
    try {
      const data = JSON.parse(json);
      if (data.products) {
        set({
          products: data.products || [],
          categories: data.categories || defaultCategories,
          banners: data.banners || defaultBanners,
          settings: { ...defaultSettings, ...(data.settings || {}) },
          orders: data.orders || [],
        });
        saveToCloud(data);
        return true;
      }
      return false;
    } catch { return false; }
  },
}));
