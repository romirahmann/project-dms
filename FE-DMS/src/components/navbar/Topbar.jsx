/* eslint-disable react/prop-types */
import { useState } from "react";
import { usePageName } from "../context/PageName";

export function Topbar() {
  const { pageName } = usePageName();
  const [openMenuProfile, setOpenMenuProfile] = useState(false);

  return (
    <>
      <div id="topbar">
        <div className="container-fluid  ">
          <div className="rounded-lg bg-white p-1 md:p-3 flex content-center ">
            <div className="brand flex place-items-center  ">
              <div className="brandName ms-2 font-bold md:text-2xl">
                <span>{pageName}</span>
              </div>
            </div>

            <div className="profile relative ms-auto me-5">
              <button
                onClick={() => setOpenMenuProfile(!openMenuProfile)}
                className="btn btn-ghost "
              >
                <img
                  src="/icons/profile.png"
                  className="w-6 mt-2 md:w-10 mx-2"
                  alt=""
                />
              </button>
              {openMenuProfile ? (
                <div className="absolute shadow-black shadow-md right-3 w-[12em] rounded-xl menuProfil bg-white p-5">
                  <div className="Title">
                    <p className="font-bold">Profil</p>
                  </div>
                  <hr />
                  <div className="detail mt-4 md:mt-3">
                    <p className="text-sm">Username</p>
                    <p className="text-sm">Grup User</p>
                  </div>
                  <div className="md:mt-5 mt-4 flex flex-col ">
                    <button className="bg-blue-800 hover:bg-blue-600 hover:ring-1 focus:ring-2 flex place-items-center rounded-xl text-white p-1">
                      <span>
                        <img src="/icons/login.svg" className="w-5" alt="" />
                      </span>
                      <span className=" text-md ms-2">Login</span>
                    </button>
                    <button className="bg-red-800 hover:bg-red-600 hover:ring-1 focus:ring-2 mt-1 flex place-items-center rounded-xl text-white p-1">
                      <span>
                        <img src="/icons/logout.svg" className="w-5" alt="" />
                      </span>
                      <span className=" text-md ms-2">Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
