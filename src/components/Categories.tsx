import { useStore } from '../store/useStore';

export default function Categories() {
  const { categories, setSelectedCategory, selectedCategory } = useStore();

  const scrollToProducts = () => {
    const element = document.getElementById('all-products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4">
            تصفح الأقسام
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            تسوق حسب الفئة
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            اكتشف مجموعة واسعة من الإلكترونيات والإكسسوارات والعطور بأفضل الأسعار
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-4">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(selectedCategory === category.name.toLowerCase() ? '' : category.name.toLowerCase());
                setTimeout(scrollToProducts, 100);
              }}
              className={`group relative overflow-hidden rounded-2xl p-6 text-center transition-all duration-500 border hover:-translate-y-1 ${
                selectedCategory === category.name.toLowerCase()
                  ? 'bg-blue-50 border-blue-300 shadow-lg shadow-blue-500/20'
                  : 'bg-white border-gray-100 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-200'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative">
                <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-all duration-500 shadow-sm ${
                  selectedCategory === category.name.toLowerCase()
                    ? 'bg-blue-100'
                    : 'bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-blue-50 group-hover:to-indigo-50'
                }`}>
                  {category.icon}
                </div>
                <h3 className={`font-bold text-sm mb-1 transition-colors ${
                  selectedCategory === category.name.toLowerCase() ? 'text-blue-600' : 'text-gray-800 group-hover:text-blue-600'
                }`}>
                  {category.nameAr}
                </h3>
                <p className="text-xs text-gray-400">{category.count} منتج</p>
              </div>
            </button>
          ))}
        </div>

        {/* Clear Filter */}
        {selectedCategory && (
          <div className="text-center mt-6">
            <button
              onClick={() => setSelectedCategory('')}
              className="px-6 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              ✕ مسح الفلتر
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
