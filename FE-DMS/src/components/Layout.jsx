/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Sidebar } from "./navbar/Sidebar";
import { Topbar } from "./navbar/Topbar";
import { Outlet } from "@tanstack/react-router";
// eslint-disable-next-line no-unused-vars
import { PageNameProvider } from "./context/PageName";
import { useDarkMode } from "./context/useDarkMode";

export function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { theme } = useDarkMode();

  return (
    <PageNameProvider>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-64  shadow-lg transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:relative sm:w-64`}
        >
          <Sidebar isOpen={() => setSidebarOpen(false)} />
        </div>

        {/* Konten utama */}
        <div className="flex-1 ">
          {/* Navbar */}
          <div className="lg:hidden">
            <button
              className="p-2 "
              onClick={() => setSidebarOpen(!isSidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Konten di sini */}
          <div className="">
            <Topbar />
            <div className="contents">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </PageNameProvider>
  );
}
