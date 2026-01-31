import { type ReactNode } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex flex-1">
        {/* Left Sidebar - 1/10 of screen */}
        <aside className="hidden xl:flex w-[20%] bg-gray-100 border-r border-gray-200">
          <div className="sticky top-20 w-full h-[600px] flex items-center justify-center bg-gray-200 m-4 rounded-lg border-2 border-dashed border-gray-400">
            <span 
              className="text-gray-500 text-xl font-semibold whitespace-nowrap"
              style={{ 
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)'
              }}
            >
              Advertisement Area
            </span>
          </div>
        </aside>

        {/* Main Content - 4/5 of screen */}
        <main className="w-full xl:w-[60%]">
          {children}
        </main>

        {/* Right Sidebar - 1/10 of screen */}
        <aside className="hidden xl:flex w-[20%] bg-gray-100 border-l border-gray-200">
          <div className="sticky top-20 w-full h-[600px] flex items-center justify-center bg-gray-200 m-4 rounded-lg border-2 border-dashed border-gray-400">
            <span 
              className="text-gray-500 text-xl font-semibold whitespace-nowrap"
              style={{ 
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                transform: 'rotate(180deg)'
              }}
            >
              Advertisement Area
            </span>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
};

export default Layout;