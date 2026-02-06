import Layout from "../layout/Layout";

// Reklam Səhifəsi Komponenti
export function AdsPage() {
  return (
   <Layout>
     <div className="max-w-4xl mx-auto py-20">
      <div className="border-l-4 border-orange-500 pl-4 mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Bizimlə Reklam Verin</h1>
      </div>

      <div className="space-y-8">
        <p className="text-xl text-gray-700 leading-relaxed">
          The Wire reklam həlləri ilə milyonlarla aktiv oxucuya çatın. Platformamız məlumatlı və müxtəlif auditoriyaya bənzərsiz çıxış imkanı təqdim edir.
        </p>

        <div className="bg-gradient-to-br from-black to-gray-900 text-white p-8">
          <h2 className="text-3xl font-bold mb-4">Niyə The Wire-da Reklam Verməlisiniz?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">10M+</div>
              <p className="text-gray-300">Aylıq Oxucu</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">500K+</div>
              <p className="text-gray-300">Gündəlik Aktiv İstifadəçi</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">95%</div>
              <p className="text-gray-300">Oxucu Məmnuniyyəti</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Reklam Seçimləri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-2 border-gray-200 p-6 hover:border-orange-500 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-orange-500">Vizual Reklamlar</h3>
              <p className="text-gray-600 mb-4">
                Ana səhifə və kateqoriya səhifələrində yüksək görünürlük və istifadəçi cəlbi təmin edən premium yerləşdirmələr.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Banner reklamları</li>
                <li>• Yan panel yerləşdirmələri</li>
                <li>• Fərdi ölçülər mövcuddur</li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 p-6 hover:border-orange-500 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-orange-500">Sponsorlu Məzmun</h3>
              <p className="text-gray-600 mb-4">
                Redaksiya məzmununa uyğunlaşdırılmış və açıq şəkildə işarələnmiş yerli reklam formatları.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Məqalə sponsorluğu</li>
                <li>• Kateqoriya üzrə təqdimatlar</li>
                <li>• Brendli məzmun seriyaları</li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 p-6 hover:border-orange-500 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-orange-500">Xəbər Bülleteni Sponsorluğu</h3>
              <p className="text-gray-600 mb-4">
                Gündəlik və həftəlik bülletenlərimiz vasitəsilə aktiv e-poçt abunəçilərimizə birbaşa çatın.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Başlıq yerləşdirmələri</li>
                <li>• Xüsusi göndərişlər</li>
                <li>• Kateqoriya üzrə hədəfləmə</li>
              </ul>
            </div>

            <div className="border-2 border-gray-200 p-6 hover:border-orange-500 transition-colors">
              <h3 className="font-bold text-lg mb-2 text-orange-500">Fərdi Kampaniyalar</h3>
              <p className="text-gray-600 mb-4">
                Məqsədlərinizə uyğun xüsusi reklam həlləri yaratmaq üçün komandamızla birbaşa əməkdaşlıq edin.
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Tədbir tərəfdaşlıqları</li>
                <li>• Çoxplatformalı kampaniyalar</li>
                <li>• Performans izləmə</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border-l-4 border-orange-500 p-6">
          <h3 className="font-bold text-lg mb-3 text-gray-900">Reklam Vermək İstəyirsiniz?</h3>
          <p className="text-gray-700 mb-4">
            Marketinq məqsədlərinizə çatmaq üçün reklam komandamızla əlaqə saxlayın.
          </p>
          <a
            href="mailto:ads@thewire.com"
            className="inline-block bg-orange-500 text-white py-3 px-6 font-bold uppercase tracking-wide hover:bg-orange-600 transition-colors"
          >
            Reklam Komandası ilə Əlaqə
          </a>
        </div>
      </div>
    </div>
   </Layout>
  );
}
