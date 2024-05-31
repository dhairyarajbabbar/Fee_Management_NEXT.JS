"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="en">
      <body className={`${inter.className} flex items-start`}>
        <main className="flex flex-col md:flex-row w-full h-full">
          {pathname !== "/signup" && pathname !== "/login" && (
            <>
              <div className="hidden md:flex md:w-64">
                <Sidebar />
              </div>
              <div className={`fixed top-0 left-0 z-50 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
                <div className="bg-gray-800 bg-opacity-75 h-screen w-[170] mt-[25px]">
                  <Sidebar />
                </div>
              </div>
              <button
                onClick={toggleSidebar}
                className="md:hidden p-4 fixed top-0 left-0 z-50"
              >
                <FaBars size={24} />
              </button>
            </>
          )}
          <div className={`p-4 w-full ${(pathname !== "/login" && pathname !== "/signup")  ? "mt-12 md:mt-0" : "pl-20 pr-20"}`}>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
