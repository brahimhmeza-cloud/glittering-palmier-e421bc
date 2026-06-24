import { useState, useEffect } from 'react';
import { FiClock, FiZap } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import ProductCard from './ProductCard';

export default function SpecialOffers() {
  const { products } = useStore();
  const offerProducts = products.filter((p) => p.originalPrice);

  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) {
              hours = 23;
              minutes = 59;
              seconds = 59;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <section id="offers" className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900" />
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-yellow-300 text-sm font-medium mb-6">
            <FiZap className="w-4 h-4" />
            عروض محدودة
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">⚡ عروض البرق</h2>

          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
              <FiClock className="w-5 h-5 text-yellow-300" />
              <span className="text-yellow-300 text-sm font-medium">ينتهي خلال:</span>
            </div>
            <div className="flex gap-3">
              {[
                { value: timeLeft.hours, label: 'ساعة' },
                { value: timeLeft.minutes, label: 'دقيقة' },
                { value: timeLeft.seconds, label: 'ثانية' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                    <span className="text-2xl font-black text-white">{formatTime(item.value)}</span>
                  </div>
                  <span className="text-xs text-white/60 mt-1 block">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {offerProducts.slice(0, 4).map((product) => (
            <div key={product.id} className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 via-orange-400/30 to-red-400/30 rounded-3xl blur-lg" />
              <div className="relative">
                <ProductCard product={product} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <span className="text-3xl">💰</span>
            <div className="text-right">
              <p className="text-white font-bold">وفّر حتى 30% على مشترياتك</p>
              <p className="text-white/60 text-sm">استخدم كود <span className="text-yellow-300 font-bold">TECH30</span> عند الدفع</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
