import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Layout from "../layout/Layout";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Bütün xanaları doldurun");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Düzgün email daxil edin");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("https://agsanews-production.up.railway.app/api/v1/contact", formData);

      if (response.data.status === "OK") {
        toast.success("Mesajınız göndərildi!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Xəta baş verdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto py-20 px-4">
        <div className="border-l-4 border-orange-500 pl-4 mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Get in Touch
            </h2>
            <p className="text-gray-700 mb-6">
              We'd love to hear from you. Whether you have a news tip, feedback,
              or a general inquiry, our team is here to help.
            </p>

            <div className="space-y-4">
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-1">
                  Email
                </h3>
                <p className="text-gray-900">contact@thewire.com</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-1">
                  News Tips
                </h3>
                <p className="text-gray-900">tips@thewire.com</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-1">
                  Address
                </h3>
                <p className="text-gray-900">
                  123 News Boulevard
                  <br />
                  Media City, MC 12345
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 px-4 py-2 focus:border-orange-500 outline-none transition-colors"
                  placeholder="Your name"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 px-4 py-2 focus:border-orange-500 outline-none transition-colors"
                  placeholder="your@email.com"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border-2 border-gray-300 px-4 py-2 focus:border-orange-500 outline-none transition-colors resize-none"
                  placeholder="Your message..."
                  disabled={loading}
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white py-3 px-6 font-bold uppercase tracking-wide hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Göndərilir..." : "Send Message"}</span>
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}