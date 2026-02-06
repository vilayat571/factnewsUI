import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import NewsDetail from "./Pages/NewsDetail";
import CategoryPage from "./Pages/CategoryPage";
import { AboutPage } from "./Pages/AboutPage";
import { AdsPage } from "./Pages/AdsPage";
import { ContactPage } from "./Pages/ContactPage";
import ScrollToTop from "./components/ScrollToTop";
import SavedNews from "./Pages/SavedNews";
import ReadNews from "./Pages/ReadNews";


function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/ads" element={<AdsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/saved" element={<SavedNews />} />
        <Route path="/read" element={<ReadNews />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;