import { useState } from 'react';
import { FiGrid, FiList, FiChevronDown, FiRefreshCw } from 'react-icons/fi';
import { useStore } from '../store/useStore';
import ProductCard from './ProductCard';

export default function AllProducts() {
  const { products, categories, searchQuery, selectedCategory, setSelectedCategory, setSearchQuery } = useStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('default');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = searchQuery === '' || 
      product.nameAr.includes(searchQuery) || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.descriptionAr.includes(searchQuery) ||
      product.categoryAr.includes(searchQuery);
    
    const matchesCategory = selectedCategory === '' || 
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc': return a.price - b.price;
      case 'price-desc': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      case 'name': return a.nameAr.localeCompare(b.nameAr);
      default: return 0;
    }
  });

  const resetFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setSortBy('default');
  };

  return (
    <section id="all-products" className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
            🛍️ جميع المنتجات
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            تصفح مجموعتنا الكاملة
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            {sortedProducts.length} منتج متاح لك
          </p>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all active:scale-95 ${
                  selectedCategory === ''
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                الكل
              </button>
              {categories.slice(0, 9).map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.name.toLowerCase() ? '' : category.name.toLowerCase()
                  )}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 active:scale-95 ${
                    selectedCategory === category.name.toLowerCase()
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{category.icon}</span>
                  {category.nameAr}
                </button>
              ))}
            </div>

            {/* Sort & View */}
            <div className="flex items-center gap-3">
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 px-3 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                >
                  <FiRefreshCw className="w-3.5 h-3.5" />
                  إعادة ضبط
                </button>
              )}
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none pl-8 pr-4 py-2 bg-gray-100 rounded-xl text-sm text-gray-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="default">الترتيب الافتراضي</option>
                  <option value="price-asc">السعر: من الأقل</option>
                  <option value="price-desc">السعر: من الأعلى</option>
                  <option value="rating">الأعلى تقييماً</option>
                  <option value="name">الاسم</option>
                </select>
                <FiChevronDown className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>

              <div className="flex bg-gray-100 rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  <FiGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-500 hover:bg-gray-200'}`}
                >
                  <FiList className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategory || searchQuery) && (
          <div className="flex items-center gap-2 mb-6 flex-wrap">
            <span className="text-sm text-gray-500">الفلاتر النشطة:</span>
            {selectedCategory && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-1">
                {categories.find(c => c.name.toLowerCase() === selectedCategory)?.icon}{' '}
                {categories.find(c => c.name.toLowerCase() === selectedCategory)?.nameAr}
                <button onClick={() => setSelectedCategory('')} className="ml-1 hover:text-blue-900">✕</button>
              </span>
            )}
            {searchQuery && (
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1">
                🔍 "{searchQuery}"
                <button onClick={() => setSearchQuery('')} className="ml-1 hover:text-purple-900">✕</button>
              </span>
            )}
          </div>
        )}

        {/* Products Grid */}
        {sortedProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">لم يتم العثور على منتجات</h3>
            <p className="text-gray-500 mb-6">جرب تغيير معايير البحث أو التصفية</p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors active:scale-95"
            >
              عرض جميع المنتجات
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
