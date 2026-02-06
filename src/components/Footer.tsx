import { Link } from "react-router-dom";
import { CATEGORIES, quickLinks } from "../types";
import { socialMedia } from "../constants/footer";
import { useState } from "react";
import { API_ENDPOINT } from "../constants/urls";
import {
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API_ENDPOINT}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.status === "OK") {
        setMessage("success");
        setEmail("");
        setTimeout(() => setMessage(""), 5000);
      } else {
        setMessage("error");
        setTimeout(() => setMessage(""), 5000);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("error");
      setTimeout(() => setMessage(""), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-linear-to-br from-gray-900 via-black to-gray-900 text-white mt-16 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>
      </div>

      {/* Gradient Line */}
      <div className="h-1 bg-linear-to-r from-orange-500 via-red-500 to-pink-600 shadow-lg"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Link
                to="/"
                className="flex font-light items-center group relative cursor-pointer"
              >
                {/* Glow effect */}
                <div className="absolute -inset-3 bg-linear-to-r from-orange-600 via-red-500 to-orange-600 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>

                {/* Logo container */}
                <div className="relative bg-linear-to-r from-gray-900 to-black px-4 py-2 rounded-xl border border-gray-800 group-hover:border-orange-500 transition-all duration-300 shadow-lg group-hover:shadow-orange-500/20">
                  <p className="text-3xl md:text-4xl flex items-center tracking-widest gap-1 relative">
                    {/* "fact" part */}
                    <span className="font-black tracking-wide bg-linear-to-br from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-lg">
                      fact
                    </span>

                    {/* Separator */}
                    <span className="w-0.75 h-8 bg-linear-to-b from-orange-500 to-red-500 rounded-full mx-0.5 group-hover:scale-y-110 transition-transform duration-300"></span>

                    {/* "news" part */}
                    <span className="font-black tracking-wide bg-linear-to-br from-orange-500 via-orange-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg animate-gradient flex items-center">
                      news
                    </span>

                    {/* Sparkle effect */}
                    <Sparkles className="w-5 h-5 text-orange-500 ml-2 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300 drop-shadow-lg" />
                  </p>

                  {/* Subtitle */}
                  <div className="absolute -bottom-0.5 right-2 text-[10px] font-bold text-orange-500 opacity-60 uppercase tracking-wider">
                    Son Xəbərlər
                  </div>
                </div>
              </Link>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted source for breaking news, in-depth analysis, and
              compelling stories from around the world. Stay informed with THE
              WIRE.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-400">Canlı Yayında</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              <span className="relative z-10">Kateqoriyalar</span>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-orange-500/30 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {CATEGORIES.map((category) => (
                <li key={category.value}>
                  <Link
                    to={category.value}
                    className="group flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-all duration-300"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-orange-500 group-hover:w-2 transition-all duration-300"></span>
                    <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                      {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              <span className="relative z-10">Sürətli Keçidlər</span>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-orange-500/30 to-transparent"></div>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-gray-400 hover:text-orange-500 transition-all duration-300"
                  >
                    <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-orange-500 group-hover:w-2 transition-all duration-300"></span>
                    <span className="text-sm group-hover:translate-x-1 transition-transform duration-300">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6 relative inline-block">
              <span className="relative z-10">Abunə Ol</span>
              <div className="absolute bottom-0 left-0 w-full h-2 bg-linear-to-r from-orange-500/30 to-transparent"></div>
            </h4>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Ən son xəbərləri birbaşa e-poçt ünvanınıza alın.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-poçt ünvanınız"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-sm text-white rounded-xl border border-gray-700 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all duration-300 text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="group w-full bg-linear-to-r from-orange-500 via-red-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 text-sm font-bold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Abunə Ol</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Success/Error Messages */}
              {message === "success" && (
                <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg animate-fadeIn">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <p className="text-sm text-green-400 font-medium">
                    Abunəlik uğurla tamamlandı!
                  </p>
                </div>
              )}
              {message === "error" && (
                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg animate-fadeIn">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                  <p className="text-sm text-red-400 font-medium">
                    Xəta baş verdi. Yenidən cəhd edin.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-800"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="px-4 bg-linear-to-r from-transparent via-black to-transparent">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-pink-600 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {currentYear}{" "}
            <span className="text-orange-500 font-semibold">THE WIRE</span>.
            Bütün hüquqlar qorunur.
          </p>

          {/* Social Media */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-sm hidden sm:block">
              Bizi izləyin:
            </span>
            <div className="flex gap-3">
              {socialMedia.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-orange-500 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-orange-500/20"
                  aria-label={social.name}
                >
                  <div className="text-gray-400 group-hover:text-orange-500 transition-colors duration-300">
                    {social.icon}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Extra Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-xs flex items-center justify-center gap-2">
            <span>
              Dünya miqyasında keyfiyyətli jurnalistikanın çatdırılması üçün
            </span>
            <span className="text-red-500 animate-pulse">❤️</span>
            <span>ilə hazırlanmışdır</span>
          </p>
        </div>
      </div>

      {/* Decorative bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-orange-500/50 to-transparent"></div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
