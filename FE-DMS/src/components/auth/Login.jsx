import { useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { useState } from "react";

export function Login() {
  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStatus(false);
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formLogin) {
      axios
        .post("http://192.168.9.192:3000/api/auth/login", formLogin)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("userData", JSON.stringify(res.data.user));
          console.log(res);
          navigate({ to: "/" });
        })
        .catch((err) => {
          console.log(err);
          setStatus(true);
        });
    }
  };

  return (
    <div className="container-fluid min-h-screen flex justify-center items-center ">
      <div className="login p-2">
        <div className="box-login bg-white  md:w-[80em] shadow-sm shadow-gray-700 rounded-lg md:rounded-l-lg grid grid-cols-1 md:grid-cols-2">
          <div className="form p-20 mb-10">
            {status && (
              <div
                className="flex items-center p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <svg
                  className="shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  <span className="font-medium">Login Failure!</span> Username &
                  Password in correct
                </div>
              </div>
            )}
            <div className="brand flex justify-center items-center">
              <img src="/icons/brand.png" className="w-12" alt="" />
              <span className="text-3xl font-bold mx-2">Kloudia</span>
            </div>
            <hr className="mt-4" />
            <div className="formLogin mt-5 ">
              <h1 className="text-xl text-center">Sign In</h1>

              <form
                className="max-w-sm mx-auto mt-5 flex flex-col"
                onSubmit={handleLogin}
              >
                <div className="mb-5">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    onChange={handleChange}
                    id="username"
                    name="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-blue-800 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex "
                >
                  <span className="text-center">Submit</span>
                  <span className="ms-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </span>
                </button>
              </form>
            </div>
          </div>
          <div className="hidden md:block content">
            <div
              className="detailContent h-full rounded-l-[3em] p-5
             bg-[rgb(250,251,255)] flex justify-center"
            >
              <img src="/images/img-login.png" className="" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
