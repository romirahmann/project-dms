import { useState } from "react";
import { Sidebar } from "./navbar/Sidebar";
import { Topbar } from "./navbar/Topbar";
import { Outlet } from "@tanstack/react-router";
// eslint-disable-next-line no-unused-vars
import { PageNameProvider } from "./context/PageName";

export function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PageNameProvider>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0 sm:relative sm:w-64`}
        >
          <Sidebar isOpen={() => setSidebarOpen(false)} />
        </div>

        {/* Konten utama */}
        <div className="flex-1 min-h-screen ">
          {/* Navbar */}
          <div className="sm:hidden">
            <button
              className="p-2 text-gray-700 "
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              <img src="/icons/sidebar-1.svg" className="w-10" alt="" />
            </button>
          </div>

          {/* Konten di sini */}
          <div className="p-4">
            <Topbar />
            <div className="contents p-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </PageNameProvider>
  );
}
