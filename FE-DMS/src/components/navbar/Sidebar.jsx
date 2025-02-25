/* eslint-disable no-unused-vars */
import { Link, useRouterState } from "@tanstack/react-router";
import { usePageName } from "../context/PageName";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { MenuNavbar } from "../../data/MenuNavbar";

/* eslint-disable react/prop-types */
export function Sidebar({ isOpen }) {
  const { setPageName } = usePageName();
  const { location } = useRouterState();

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  return (
    <aside
      className="fixed top-0 left-0 z-40 w-64 min-h-screen "
      aria-label="Sidebar"
    >
      <div className="min-h-screen px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        {/* Tombol Close */}
        <div className="btn-close flex sm:hidden">
          <button onClick={() => isOpen()} className="ms-auto p-1">
            <img src="/icons/close.svg" className="w-5 bg-black" alt="Close" />
          </button>
        </div>

        {/* Brand Logo */}
        <div className="brand flex items-center mt-4">
          <img src="/icons/brand.png" className="w-10" alt="Brand" />
          <span className="ms-2 font-bold text-3xl">Kloudia</span>
        </div>

        {/* Menu Sidebar */}
        <ul className="mt-10 space-y-2">
          {MenuNavbar.filter(({ role }) => {
            if (!userData) return false;
            if (role === 0) return true;
            if (role === 1 && (userData.roleId === 1 || userData.roleId === 2))
              return true;
          }).map(({ name, path, icon }) => {
            const isActive = location.pathname === path;
            return (
              <li key={name} className="group">
                <Link
                  to={path}
                  onClick={() => {
                    setPageName(name);
                    isOpen();
                  }}
                  className={clsx(
                    "flex items-center p-2 rounded-lg transition-colors",
                    "text-gray-900 dark:text-white hover:bg-blue-800 group-hover:text-white",
                    { "bg-blue-800 text-white": isActive }
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span
                    className={clsx(
                      "w-6 h-6 transition duration-75",
                      isActive
                        ? "text-white"
                        : "text-blue-800 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
                    )}
                  >
                    {icon}
                  </span>
                  <span className="ms-3">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
