"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AppNavBar = () => {
  const router = useRouter();
  const Logout = async () => {
    const response = await fetch("/api/login");
    const json = await response.json();
    if (json["status"] === true) {
      router.replace("/");
    }
  };

  return (
    <div>
      {/* <Navbar expand="lg" className="shadow-sm  bg-white" variant="light">
                <div className="container">
                    <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                                <Link href="/">Home</Link>
                        </Nav>
                        <div className="d-flex">
                            <button onClick={Logout} className="btn btn-primary">Logout</button>
                        </div>
                    </Navbar.Collapse>
                </div>
            </Navbar> */}

      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/" className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Dashboard
            </span>
          </Link>
          <div className="flex md:order-2">
            <button
              type="button"
              onClick={Logout}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppNavBar;
