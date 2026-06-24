import { FiHeart, FiShoppingCart, FiStar, FiEye, FiCheck } from 'react-icons/fi';
import { useStore, Product } from '../store/useStore';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleFavorite, favorites } = useStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const isFavorite = favorites.includes(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`تمت إضافة ${product.nameAr} إلى السلة`, {
      icon: '🛒',
      duration: 2000,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(product.id);
    toast.success(isFavorite ? 'تم الإزالة من المفضلة' : 'تمت الإضافة للمفضلة', {
      icon: isFavorite ? '💔' : '❤️',
      duration: 1500,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <div className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-1">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
              <span className="text-4xl">📦</span>
            </div>
          )}
          <img
            src={product.image}
            alt={product.nameAr}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=صورة+المنتج';
              setImageLoaded(true);
            }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            {product.badge && (
              <span className="px-3 py-1 bg-gradient-to-l from-blue-600 to-indigo-600 text-white text-xs font-bold rounded-lg shadow-lg">
                {product.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="px-3 py-1 bg-gradient-to-l from-red-500 to-pink-600 text-white text-xs font-bold rounded-lg shadow-lg">
                -{discount}%
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            <button
              onClick={handleToggleFavorite}
              className={`w-9 h-9 rounded-xl shadow-lg flex items-center justify-center transition-all active:scale-90 ${
                isFavorite 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-white text-gray-600 hover:text-pink-500 hover:bg-pink-50'
              }`}
            >
              <FiHeart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setShowQuickView(true); }}
              className="w-9 h-9 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-all active:scale-90"
            >
              <FiEye className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Add */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full py-2.5 bg-white text-gray-900 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-blue-600 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FiShoppingCart className="w-4 h-4" />
              {product.inStock ? 'أضف إلى السلة' : 'غير متوفر'}
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-blue-600 font-medium mb-1">{product.categoryAr}</p>
          <h3 className="font-bold text-gray-900 text-sm mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.nameAr}
          </h3>
          <p className="text-xs text-gray-500 mb-3 line-clamp-1">{product.descriptionAr}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({product.reviews} تقييم)</span>
          </div>

          {/* Specs Preview */}
          {product.specs && product.specs.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.specs.slice(0, 2).map((spec, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                  {spec}
                </span>
              ))}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-gray-900">
                {product.price.toLocaleString('ar-SA')}
              </span>
              <span className="text-xs text-gray-500">{useStore.getState().settings.currencyAr}</span>
            </div>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {product.originalPrice.toLocaleString('ar-SA')}
              </span>
            )}
          </div>

          {/* Stock Status & Add to Cart */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
              <span className={`text-xs font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'متوفر' : 'غير متوفر'}
              </span>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="md:hidden flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition-colors active:scale-95 disabled:opacity-50"
            >
              <FiShoppingCart className="w-3 h-3" />
              أضف
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowQuickView(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 relative">
                <img src={product.image} alt={product.nameAr} className="w-full h-64 md:h-full object-cover" />
                {discount > 0 && (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-lg">
                    -{discount}%
                  </span>
                )}
              </div>
              <div className="md:w-1/2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">{product.categoryAr}</p>
                    <h3 className="text-xl font-bold text-gray-900">{product.nameAr}</h3>
                  </div>
                  <button onClick={() => setShowQuickView(false)} className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200">✕</button>
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{product.descriptionAr}</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} تقييم)</span>
                </div>

                {product.specs && (
                  <div className="mb-4">
                    <h4 className="font-bold text-sm text-gray-900 mb-2">المواصفات:</h4>
                    <ul className="space-y-1">
                      {product.specs.map((spec, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                          <FiCheck className="w-4 h-4 text-green-500" />
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-3xl font-black text-gray-900">{product.price.toLocaleString('ar-SA')}</span>
                  <span className="text-lg text-gray-500">{useStore.getState().settings.currencyAr}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">{product.originalPrice.toLocaleString('ar-SA')}</span>
                  )}
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 py-3 bg-gradient-to-l from-blue-600 to-indigo-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95 disabled:opacity-50"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                    {product.inStock ? 'أضف إلى السلة' : 'غير متوفر'}
                  </button>
                  <button
                    onClick={handleToggleFavorite}
                    className={`w-12 rounded-xl flex items-center justify-center transition-all ${isFavorite ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-pink-500'}`}
                  >
                    <FiHeart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
