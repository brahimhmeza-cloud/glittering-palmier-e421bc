import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useStore } from '../store/useStore';

export default function HeroBanner() {
  const { banners } = useStore();
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const scrollToProducts = () => {
    const element = document.getElementById('all-products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (banners.length === 0) return null;

  const banner = banners[currentBanner];

  return (
    <section id="hero" className="relative pt-[140px] md:pt-[160px]">
      <div className="container mx-auto px-4 py-6">
        <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-l ${banner.gradient} min-h-[350px] md:min-h-[450px]`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 25% 50%, rgba(255,255,255,0.2) 0%, transparent 50%), radial-gradient(circle at 75% 50%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            }} />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-16 py-12">
            {/* Content */}
            <div className="text-white space-y-6 md:space-y-8 text-center md:text-right z-10 max-w-lg">
              <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium">
                🔥 عرض لفترة محدودة
              </div>
              <h2 className="text-4xl md:text-6xl font-black leading-tight">
                {banner.titleAr}
              </h2>
              <p className="text-xl md:text-2xl text-white/80 font-light">
                {banner.subtitleAr}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button 
                  onClick={scrollToProducts}
                  className="px-8 py-3.5 bg-white text-gray-900 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl shadow-black/20 hover:shadow-2xl hover:scale-105 active:scale-95"
                >
                  {banner.buttonTextAr}
                </button>
                <button 
                  onClick={scrollToProducts}
                  className="px-8 py-3.5 border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm active:scale-95"
                >
                  اعرف المزيد
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative mt-8 md:mt-0">
              <div className="w-64 h-64 md:w-80 md:h-80 relative">
                <img
                  src={banner.image}
                  alt={banner.titleAr}
                  className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-black/30 transform hover:scale-105 transition-transform duration-500"
                  loading="eager"
                />
                <div className="absolute -inset-4 bg-gradient-to-t from-white/10 to-transparent rounded-2xl" />
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-90"
          >
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all active:scale-90"
          >
            <FiChevronRight className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentBanner ? 'w-8 bg-white' : 'w-2 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
