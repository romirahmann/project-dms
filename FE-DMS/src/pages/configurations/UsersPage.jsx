import axios from "axios";
import { Pagination } from "flowbite-react";
import { useEffect, useState } from "react";

export function UserPage() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsers();
  }, [users]);

  const getUsers = async () => {
    await axios
      .get("http://192.168.9.192:3000/api/master/users")
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-40 lg:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search user ..."
              />
            </div>
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
                <tr className=" border-b dark:bg-gray-800 dark:border-gray-900 border-gray-300">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4">romirahman</td>
                  <td className="px-6 py-4">Romi Rahman</td>
                  <td className="px-6 py-4">romirahman03romi@gmail.com</td>
                  <td className="px-6 py-4">IT</td>
                  <td className="px-6 py-4">
                    <button className="text-white font-medium px-3 py-2 bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600 hover:bg-blue-900 rounded-md">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Pagination */}
            <div className="footer flex mt-5 items-center">
              <div className="detail">
                <p className="text-gray-600">
                  Showing <strong></strong> to <strong></strong> of{" "}
                  <strong></strong> files
                </p>
              </div>
              <div className="pagination md:ms-auto">
                <Pagination
                  currentPage={0}
                  totalPages={0}
                  onPageChange={0}
                  showIcons
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
