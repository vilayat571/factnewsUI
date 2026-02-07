import React from 'react';
import Layout from '../layout/Layout';
import { Shield, Lock, Eye, FileText, Mail, AlertCircle } from 'lucide-react';

const Privacy = () => {
  return (
    <Layout>
      <div className="w-full bg-gradient-to-b from-gray-50 to-white">
        <div className=" px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Header Section with Gradient */}
          <div className="relative bg-gradient-to-br from-orange-500 via-red-500 to-pink-600 text-white rounded-2xl p-8 lg:p-12 mb-8 shadow-xl overflow-hidden">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Decorative blurs */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-10 h-10" />
                <h1 className="text-3xl lg:text-5xl font-bold">Məxfilik Siyasəti</h1>
              </div>
              <p className="text-lg text-white/90 max-w-3xl">
                Fact News olaraq, istifadəçilərimizin məxfiliyinə hörmət edirik və şəxsi məlumatlarınızın təhlükəsizliyini təmin edirik.
              </p>
              <p className="text-sm text-white/70 mt-4">
                Son yenilənmə: 6 Fevral, 2026
              </p>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            
            {/* Section 1 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-orange-100">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">1. Topladığımız Məlumatlar</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Saytımızdan istifadə edərkən aşağıdakı məlumatları toplaya bilərik:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li><strong>Brauzer məlumatları:</strong> IP ünvanı, brauzer növü, əməliyyat sistemi</li>
                  <li><strong>İstifadə məlumatları:</strong> Baxdığınız səhifələr, keçid müddəti, kliklər</li>
                  <li><strong>Cookie məlumatları:</strong> Təcrübənizi şəxsiləşdirmək üçün cookie-lər</li>
                  <li><strong>Saxlanılan xəbərlər:</strong> Brauzerin local storage-də saxladığınız xəbərlər (yalnız cihazınızda qalır)</li>
                </ul>
                <div className="mt-4 p-4 bg-orange-50 border-l-4 border-orange-500 rounded-r-lg">
                  <p className="text-sm font-medium text-orange-900">
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    Qeyd: Biz heç bir şəxsi məlumat (ad, email, telefon) toplamırıq.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-orange-100">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">2. Məlumatların İstifadəsi</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Topladığımız məlumatları aşağıdakı məqsədlər üçün istifadə edirik:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Saytın performansını və istifadə təcrübəsini yaxşılaşdırmaq</li>
                  <li>Xəbər tövsiyələrini şəxsiləşdirmək</li>
                  <li>Sayt statistikalarını təhlil etmək</li>
                  <li>Texniki problemləri həll etmək</li>
                  <li>Zərərli fəaliyyətləri aşkar etmək və qarşısını almaq</li>
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-orange-100">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <Lock className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">3. Cookie-lər</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Saytımız cookie-lərdən istifadə edir. Cookie-lər cihazınızda saxlanılan kiçik mətn fayllarıdır və aşağıdakı məqsədlər üçün istifadə olunur:
                </p>
                <div className="grid md:grid-cols-2 gap-4 my-4">
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">Zəruri Cookie-lər</h3>
                    <p className="text-sm text-gray-600">Saytın düzgün işləməsi üçün lazımdır və söndürülə bilməz.</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-2">Analitik Cookie-lər</h3>
                    <p className="text-sm text-gray-600">Saytdan necə istifadə etdiyinizi anlamağa kömək edir.</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  Brauzerinizin parametrlərindən cookie-ləri idarə edə bilərsiniz.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-orange-100">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">4. Məlumatların Təhlükəsizliyi</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Məlumatlarınızın təhlükəsizliyini təmin etmək üçün müasir texnologiyalardan istifadə edirik:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>HTTPS protokolu ilə şifrələnmiş əlaqə</li>
                  <li>Müntəzəm təhlükəsizlik yeniləmələri</li>
                  <li>Məhdud giriş nəzarəti</li>
                  <li>Məlumat bazalarının şifrələnməsi</li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-orange-100">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">5. Üçüncü Tərəflər</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Saytımız aşağıdakı üçüncü tərəf xidmətlərindən istifadə edə bilər:
                </p>
                <div className="space-y-3">
                  <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                    <h3 className="font-bold text-blue-900 mb-1">Google Analytics</h3>
                    <p className="text-sm text-blue-800">Sayt statistikası və istifadəçi davranışlarının təhlili</p>
                  </div>
                  <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
                    <h3 className="font-bold text-green-900 mb-1">CDN Xidmətləri</h3>
                    <p className="text-sm text-green-800">Sürətli və etibarlı məzmun çatdırılması</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  Bu xidmətlərin öz məxfilik siyasətləri var və biz onların fəaliyyətinə görə məsuliyyət daşımırıq.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-orange-100">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">6. İstifadəçi Hüquqları</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Siz aşağıdakı hüquqlara maliksiniz:
                </p>
                <ul className="space-y-2 ml-6 list-disc">
                  <li>Haqqınızda toplanan məlumatları öyrənmək</li>
                  <li>Məlumatlarınızın silinməsini tələb etmək</li>
                  <li>Cookie-ləri rədd etmək</li>
                  <li>Məxfilik siyasətinin pozulması barədə şikayət etmək</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-orange-100">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">7. Uşaqların Məxfiliyi</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Saytımız 13 yaşdan kiçik uşaqlar üçün nəzərdə tutulmayıb. Biz bilərəkdən 13 yaşdan kiçik uşaqlardan məlumat toplamırıq. Əgər valideyn və ya qəyyum olaraq uşağınızın bizə şəxsi məlumat verdiyini düşünürsünüzsə, bizimlə əlaqə saxlayın.
                </p>
              </div>
            </section>

            {/* Section 8 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-orange-100">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">8. Dəyişikliklər</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>
                  Bu məxfilik siyasətini vaxtaşırı yeniləyə bilərik. Əhəmiyyətli dəyişikliklər olarsa, saytda bildiriş yerləşdirəcəyik. Məxfilik siyasətini müntəzəm yoxlamanızı tövsiyə edirik.
                </p>
              </div>
            </section>

            {/* Contact Section */}
            <section>
              <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-orange-100">
                <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">9. Əlaqə</h2>
              </div>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p className="mb-4">
                  Məxfilik siyasəti ilə bağlı suallarınız varsa, bizimlə əlaqə saxlayın:
                </p>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-gray-900">Email:</span>
                      <a href="mailto:info@fact-news.info" className="text-orange-600 hover:text-orange-700 font-semibold">
                        info@fact-news.info
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-orange-600" />
                      <span className="font-medium text-gray-900">Website:</span>
                      <a href="https://www.fact-news.info" className="text-orange-600 hover:text-orange-700 font-semibold">
                        www.fact-news.info
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>

          {/* Footer Note */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-white rounded-xl shadow-lg px-6 py-4 border border-gray-100">
              <p className="text-sm text-gray-600">
                <Shield className="w-4 h-4 inline mr-2 text-orange-500" />
                Bu səhifə son dəfə <strong>6 Fevral, 2026</strong> tarixində yenilənib
              </p>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        section {
          animation: fadeIn 0.6s ease-out;
        }

        .prose ul {
          list-style-type: disc;
        }

        .prose strong {
          color: #111827;
          font-weight: 700;
        }
      `}</style>
    </Layout>
  );
};

export default Privacy;