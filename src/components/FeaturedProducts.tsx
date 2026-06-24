import { FiArrowLeft } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import ProductCard from './ProductCard';

export default function FeaturedProducts() {
  const { products } = useStore();
  const featuredProducts = products.filter((p) => p.featured);

  const scrollToAll = () => {
    const element = document.getElementById('all-products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="featured" className="py-16 bg-gradient-to-b from-gray-50/50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-12 gap-4">
          <div>
            <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium mb-4">
              ⭐ منتجات مميزة
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              الأكثر مبيعاً
            </h2>
            <p className="text-gray-500 mt-2">{featuredProducts.length} منتج مميز</p>
          </div>
          <button 
            onClick={scrollToAll}
            className="flex items-center gap-2 px-6 py-3 bg-white rounded-xl text-blue-600 font-medium text-sm border border-blue-100 hover:bg-blue-50 hover:border-blue-200 transition-all group active:scale-95"
          >
            عرض الكل
            <FiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
