"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Login() {
  const [formValue, SetFormValue] = useState({
    email: "email@email.com",
    password: "123",
  });
  const router = useRouter();

  const inputChange = (name, value) => {
    SetFormValue((formValue) => ({
      ...formValue,
      [name]: value,
    }));
  };

  const Submit = async (e) => {
    e.preventDefault();
    if (formValue.email.length === 0) {
      alert("Email Required");
    } else if (formValue.password.length === 0) {
      alert("Password Required");
    } else {
      const config = { method: "POST", body: JSON.stringify(formValue) };
      const response = await fetch("/api/login", config);
      const json = await response.json();
      if (json["status"] === true) {
        router.replace("/dashboard");
      } else {
        alert(json["message"]);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-[30rem] m-auto">
        {/* <form
        onSubmit={() => {
          Submit;
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={formValue.email}
          onChange={(e) => inputChange("email", e.target.value)}
        />
        <input
          type="password"
          placeholder="Email"
          value={formValue.password}
          onChange={(e) => inputChange("password", e.target.value)}
        />
        <button type="submit">Login</button>
      </form> */}
        <div className="text-3xl mb-6">Login</div>
        <form onSubmit={Submit}>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required=""
              value={formValue.email}
              onChange={(e) => inputChange("email", e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required=""
              value={formValue.password}
              onChange={(e) => inputChange("password", e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
            <Link href="/register">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Register
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
