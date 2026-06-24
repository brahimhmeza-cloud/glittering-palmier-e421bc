import { useState } from 'react';
import { FiMail, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      setTimeout(() => {
        toast.success('شكراً لاشتراكك! سنرسل لك آخر العروض 🎉');
        setEmail('');
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-l from-blue-600 via-indigo-600 to-purple-700 p-8 md:p-16">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-1/2 -translate-x-1/2" />
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-right max-w-lg">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white/90 mb-6">
                <FiMail className="w-4 h-4" />
                النشرة البريدية
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">احصل على أحدث العروض</h2>
              <p className="text-white/80 text-lg">اشترك في نشرتنا البريدية واحصل على خصم 10% على طلبك الأول</p>
            </div>

            <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="w-full sm:w-80 px-6 py-4 pr-12 rounded-xl bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white placeholder-white/50 focus:border-white/40 focus:outline-none transition-all"
                  required
                />
                <FiMail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl shadow-black/20 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    اشترك الآن
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
