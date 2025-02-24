import { Link, useRouterState } from "@tanstack/react-router";
import { usePageName } from "../context/PageName";
import clsx from "clsx";

/* eslint-disable react/prop-types */
export function Sidebar({ isOpen }) {
  const { setPageName } = usePageName();
  const { location } = useRouterState();
  return (
    <>
      <aside
        className="fixed top-0 h-screen shadow-slate-900 shadow-2xl left-0 z-40 w-64 "
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <div className="btn-close flex sm:hidden">
            <button onClick={isOpen} className="ms-auto p-1">
              <img src="/icons/close.svg" className="w-5 bg-black" alt="" />
            </button>
          </div>
          <div className="brand flex place-items-center mt-4 ">
            <div className="imgBrand">
              <img src="/icons/brand.png" className="w-10" alt="" />
            </div>
            <div className="brandName ms-2 font-bold text-3xl">
              <span>Kloudia</span>
            </div>
          </div>
          <ul className="space-y-2 mt-10">
            {menuItems.map(({ name, path, icon }) => {
              const isActive = location.pathname === path;
              return (
                <li key={name}>
                  <Link
                    to={path}
                    onClick={() => {
                      setPageName(name);
                      isOpen;
                    }}
                    className={clsx(
                      "flex items-center p-2 rounded-lg transition-colors",
                      "text-gray-900 dark:text-white hover:bg-blue-800 hover:text-white",
                      { "bg-blue-800 text-white": isActive }
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span className="w-6 h-6 text-blue-800 dark:text-gray-400 group-hover:text-white">
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
    </>
  );
}
const menuItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: (
      <svg
        className="w-5 h-5 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 21"
      >
        <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
        <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
      </svg>
    ),
  },
  {
    name: "Search",
    path: "/search",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
      >
        <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Files",
    path: "/files",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
      >
        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z" />
        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
      </svg>
    ),
  },
  {
    name: "Classifications",
    path: "/classifications",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 text-blue-800 transition duration-75 dark:text-gray-400 group-hover:text-white dark:group-hover:text-white"
      >
        <path
          fillRule="evenodd"
          d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];
