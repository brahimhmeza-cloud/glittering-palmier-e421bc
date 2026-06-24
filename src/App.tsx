import { db } from './firebase'; 
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useStore } from './store/useStore';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Categories from './components/Categories';
import FeaturedProducts from './components/FeaturedProducts';
import AllProducts from './components/AllProducts';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CartSidebar from './components/CartSidebar';
import AdminPanel from './components/AdminPanel';
import MyOrders from './components/MyOrders';

function App() {
  const [products, setProducts] = useState([]); // هادي باش نحفظو فيها المنتجات

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
      console.log("المنتجات اللي جبنا:", productsData);
    };
    
    fetchProducts();
  }, []);

  // ... باقي الكود ديالك ...
    if (settings.facebookPixelId) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${settings.facebookPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      const noscript = document.createElement('noscript');
      const img = document.createElement('img');
      img.height = 1;
      img.width = 1;
      img.style.display = 'none';
      img.src = `https://www.facebook.com/tr?id=${settings.facebookPixelId}&ev=PageView&noscript=1`;
      noscript.appendChild(img);
      document.body.appendChild(noscript);
    }
  }, [settings.facebookPixelId]);

  // Initialize TikTok Pixel
  useEffect(() => {
    if (settings.tiktokPixelId) {
      const script = document.createElement('script');
      script.innerHTML = `
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
        ttq.load('${settings.tiktokPixelId}');
        ttq.page();
      `;
      document.head.appendChild(script);
    }
  }, [settings.tiktokPixelId]);

  // Update document title and meta
  useEffect(() => {
    document.title = `${settings.storeNameAr} | متجر إلكتروني للإلكترونيات والإكسسوارات والعطور`;
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', `تسوق من ${settings.storeNameAr} - ${settings.storeSloganAr}. شحن سريع، دفع آمن، ضمان الجودة.`);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', `${settings.storeNameAr} | متجر الإلكترونيات والإكسسوارات والعطور`);
    }

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', `تسوق من ${settings.storeNameAr} - ${settings.storeSloganAr}. شحن سريع ودفع آمن.`);
    }
  }, [settings.storeNameAr, settings.storeSloganAr]);

  // Update CSS variables for primary color
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
  }, [settings.primaryColor, settings.secondaryColor]);

  if (isAdminOpen) {
    return <AdminPanel />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" dir="rtl">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            borderRadius: '12px',
            fontFamily: 'Tajawal, sans-serif',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Skip to main content for accessibility */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
        انتقل إلى المحتوى الرئيسي
      </a>

      <Header />
      <main id="main-content">
        <HeroBanner />
        <Categories />
        <FeaturedProducts />
        <AllProducts />
        <MyOrders />
        <Newsletter />
      </main>
      <Footer />
      <CartSidebar />
    </div>
  );
}

export default App;
