"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function Verify() {
  const [loading, setLoading] = useState(true);
  const [codeVal, setCodeVal] = useState("");
  const [verified, setVerified] = useState("");

  const searchParams = useSearchParams();
  const search = searchParams.get("email");
  const router = useRouter();
  // console.log(search)

  async function verifyCode() {
    const config = {
      method: "GET",
      // body: JSON.stringify({ inpVal: codeVal }),
    };
    const response = await fetch(`/api/verify?code=${codeVal}`, config);
    const json = await response.json();

    if (json.status === true) {
      setVerified(true);
    } else {
      setVerified(false);
    }
  }

  useEffect(() => {
    (async () => {
      const config = {
        method: "POST",
        body: JSON.stringify({ email: search }),
      };
      const response = await fetch(`/api/verify`, config);
      const json = await response.json();
      if (json["status"] === true) {
        console.log("hi");
      } else {
        console.log(json["message"]);
      }
      setLoading(false);
    })();
  }, [search, router]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[30rem] m-auto">
          <div className="mb-6">
            <label
              htmlFor="code"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your Code
            </label>
            <input
              type="number"
              id="code"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="####"
              required=""
              value={codeVal}
              onChange={(e) => {
                setCodeVal(e.target.value);
              }}
            />
          </div>
          <div>
            {verified === ""
              ? ""
              : verified
              ? "verify completed"
              : "invalid verify"}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={verifyCode}
          >
            {!loading ? "Verify" : "Sending...."}
          </button>
        </div>
      </div>
    </>
  );
}

export default Verify;
