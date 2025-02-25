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
      <div className="container-fluid p-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Sidebar Navigation */}
          <div className="navConf min-h-screen p-5 rounded-r-3xl bg-white">
            <div className="confSystem">
              <h1 className="mb-2 font-bold text-xl">Configuration Menu</h1>
              <hr />
              <div className="menuConf mt-5">
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
          <div className="col-span-4  rounded-3xl p-5">
            {isDefaultPage ? (
              <div className="bg-gray-100  content-center p-10 rounded-lg shadow-md text-center">
                <h2 className="text-2xl font-bold">
                  Configuration System Kloudia
                </h2>
                <p className="text-gray-600 mt-2">
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
