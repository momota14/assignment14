"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import  nodemailer  from 'nodemailer';

function Register() {
  const [formValue, SetFormValue] = useState({
    name: "",
    email: "",
    password: "",
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
      const response = await fetch("/api/register", config);
      const json = await response.json();
      if (json["status"] === true) {
        router.replace(`/verify?email=${formValue.email}`);
      } else {
        alert(json["message"]);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-[30rem] m-auto">
        <div className="text-3xl mb-6">Register</div>
        <form onSubmit={Submit}>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Name
            </label>
            <input
              type="name"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="name@flowbite.com"
              required=""
              value={formValue.name}
              onChange={(e) => inputChange("name", e.target.value)}
            />
          </div>
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
              Register
            </button>
            <Link href="/login">
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
