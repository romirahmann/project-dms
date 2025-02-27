/* eslint-disable no-unused-vars */

import axios from "axios";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { SearchComponent } from "../../components/table/SearchComponent";
import websocketService from "../../services/WebSocket";
import { PaginationComponent } from "../../components/table/Pagination";
import { RemoveModal } from "../../components/modal/RemoveModal";
import { motion } from "framer-motion";

export function UserPage() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState();

  // MODAL REMOVE
  const [showModalRemove, setShowModalRemove] = useState(false);
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => {
    getUsers();

    websocketService.connect();
    websocketService.addListener(handleWebSocket);

    return () => {
      websocketService.removeListener(handleWebSocket);
    };
  }, []);

  const getUsers = async () => {
    await axios
      .get("http://192.168.9.192:3000/api/master/users")
      .then((res) => {
        setUsers(res.data.data);
        setFilteredData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleWebSocket = (data) => {
    if (data.type === "UPDATE_USERS" || data.type === "CREATE_USERS") {
      getUsers();
    }
  };

  const handleRemove = (user) => {
    showModalRemove ? setShowModalRemove(false) : setShowModalRemove(true);
    setSelectedUser(user);
  };

  return (
    <>
      <div className="container-fluid p-4 ">
        <div className="titlePage flex mb-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 text-gray-900 dark:text-white"
          >
            <path d="M4.5 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM14.25 8.625a3.375 3.375 0 1 1 6.75 0 3.375 3.375 0 0 1-6.75 0ZM1.5 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM17.25 19.128l-.001.144a2.25 2.25 0 0 1-.233.96 10.088 10.088 0 0 0 5.06-1.01.75.75 0 0 0 .42-.643 4.875 4.875 0 0 0-6.957-4.611 8.586 8.586 0 0 1 1.71 5.157v.003Z" />
          </svg>
          <h1 className="text-xl ms-2 font-bold text-gray-700 dark:text-white">
            Data User
          </h1>
          <div className=" dark:bg-gray-900 ms-auto">
            <SearchComponent result={setFilteredData} data={users} />
          </div>
        </div>
        <div className="usersTable">
          <div className="relative overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-700 dark:text-gray-500 ">
              <thead className="text-xs font-bold text-gray-300 uppercase bg-[#043A70] dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 col-1">
                    No
                  </th>
                  <th scope="col" className="px-6 py-3 col-2">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3 col-2">
                    Fullname
                  </th>
                  <th scope="col" className="px-6 py-3 col-2">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 col-2">
                    Group
                  </th>
                  <th scope="col" className="px-6 py-3 col-2">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {paginatedData?.length > 0 ? (
                  paginatedData.map((user, index) => (
                    <tr
                      key={user.userId}
                      className=" border-b dark:bg-gray-800 dark:border-gray-900 border-gray-300"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}
                      </th>
                      <td className="px-6 py-4">{user.username}</td>
                      <td className="px-6 py-4">{user.fullname}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.grupName}</td>
                      <td className="px-6 py-4">
                        <button className="text-green-500 hover:bg-green-600 hover:text-white text-center font-medium px-1 py-1  rounded-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5"
                          >
                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleRemove(user)}
                          className="text-red-600 hover:bg-red-600 hover:text-white text-center font-medium px-1 py-1  rounded-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="size-5 "
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className=" border-b dark:bg-gray-800 dark:border-gray-900 border-gray-300">
                    <td
                      scope="row"
                      className="col-span-5 px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <p>Users not found !</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {/* Pagination */}
            <PaginationComponent
              setPaginatedData={setPaginatedData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              data={filteredData}
            />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          {" "}
          <RemoveModal
            isOpen={showModalRemove}
            onClose={() => setShowModalRemove(false)}
            data={selectedUser}
          />{" "}
        </motion.div>
      </div>
    </>
  );
}
