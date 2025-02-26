import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { MenuConf } from "../../data/MenuConf";
import { useEffect, useState } from "react";
import clsx from "clsx";

export function ConfigurationsLayouts() {
  const [userData, setUserData] = useState(null);

  const location = useLocation();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, []);

  // Cek apakah berada di "/configurations" tanpa sub-route lainnya
  const isDefaultPage = location.pathname === "/configurations";

  return (
    <>
      <div className="container-fluid p-5 lg:p-0">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-2 lg:gap-5 ">
          {/* Sidebar Navigation */}
          <div className="navConf p-5 lg:p-0 ">
            <div className="confSystem lg:min-h-[55em] p-5 lg:rounded-tr-[2em] bg-white dark:bg-gray-800">
              <div className="menuConf mt-5">
                <h1 className="mb-5 border-b-4 text-center font-bold text-xl text-gray-800 dark:text-white">
                  Configuration Menu
                </h1>
                <ul className="menuConfList space-y-2">
                  {MenuConf.filter(({ role }) => {
                    if (!userData) return false;
                    if (role === 0) return true;
                    if (
                      role === 1 &&
                      (userData.roleId === 1 || userData.roleId === 2)
                    )
                      return true;
                  }).map(({ name, path, icon }) => {
                    const isActive = location.pathname === path;
                    return (
                      <li key={name} className="group">
                        <Link
                          to={path}
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
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-4 rounded-3xl mt-5 md:mt-0 md:p-3">
            {isDefaultPage ? (
              <div className="bg-gray-100 dark:bg-gray-800 lg:mt-12 content-center p-10 rounded-lg shadow-md text-center">
                <h2 className="text-2xl dark:text-white font-bold">
                  Configuration System Kloudia
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Silakan pilih salah satu menu di sidebar untuk konfigurasi
                  sistem.
                </p>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
