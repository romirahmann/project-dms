import { useEffect, useState } from "react";
import { usePageName } from "../context/PageName";
import { useNavigate } from "@tanstack/react-router";

export function Topbar() {
  const { pageName } = usePageName();
  const [userData, setUserData] = useState(null);
  const [openMenuProfile, setOpenMenuProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem("userData")));
  }, [userData]);

  const handleOpenProfile = () => {
    setOpenMenuProfile(!openMenuProfile);
    setUserData(JSON.parse(localStorage.getItem("userData")));
    console.log(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate({ to: "/login" });
  };

  return (
    <div id="topbar">
      <div className="container-fluid">
        <div className="rounded-lg bg-white p-1 md:p-3 flex content-center">
          <div className="brand flex place-items-center">
            <div className="brandName ms-2 font-bold md:text-2xl">
              {/* Menampilkan pageName yang sudah tersimpan */}
              <span>{pageName}</span>
            </div>
          </div>

          <div className="user ms-auto me-5 flex items-center">
            <span className="me-2">{userData?.username || "Guest"}</span>
            <div className="profile relative  ">
              <button
                onClick={() => handleOpenProfile()}
                className="btn btn-ghost"
              >
                <img
                  src="/icons/profile.png"
                  className="w-6 mt-2 md:w-10 mx-2"
                  alt=""
                />
              </button>
              {openMenuProfile && (
                <div className="absolute shadow-black shadow-md right-3 w-[12em] rounded-xl menuProfil bg-white p-5">
                  <div className="Title">
                    <p className="font-bold">PROFILE</p>
                  </div>
                  <hr />
                  <div className="detail mt-4 md:mt-3">
                    <p className="text-sm">
                      {" "}
                      <span className="font-bold">Username:</span>{" "}
                      {userData.username}
                    </p>
                    <p className="text-sm">
                      <span className="font-bold">Group:</span>{" "}
                      {userData.grupName}
                    </p>
                  </div>
                  <div className="md:mt-5 mt-4 flex flex-col">
                    <button
                      onClick={handleLogout}
                      className="bg-red-800 hover:bg-red-600 hover:ring-1 focus:ring-2 mt-1 flex place-items-center rounded-xl text-white p-1"
                    >
                      <span>
                        <img src="/icons/logout.svg" className="w-5" alt="" />
                      </span>
                      <span className="text-md ms-2">Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
