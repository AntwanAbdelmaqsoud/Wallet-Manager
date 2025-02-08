import { Button } from "@/components/ui/button";
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { IoMdContacts } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const [isMenuOpen, setisMenuOpen] = useState<boolean>(false);
  return (
    <>
      {isMenuOpen && (
        <div className="fixed z-20 w-full h-full bg-black text-white text-xl flex flex-col gap-5">
          <nav className=" shadow-sm p-4 flex justify-between items-center z-10">
            <div className="tracking-tighter font-bold w-fit h-fit grid place-items-center">
              <h1>Wallet Manager</h1>
            </div>
            <Button
              className="rounded-full sm:hidden"
              size="icon"
              variant={"secondary"}
              onClick={() => setisMenuOpen((prev: boolean) => !prev)}
            >
              <FaXmark />
            </Button>
          </nav>
          <div className="w-full h-full flex flex-col items-start space-y-10">
            <Link to="/">
              <Button variant="ghost" className="text-lg">
                <FaHome />
                HOME
              </Button>
            </Link>
            <Button variant="ghost" className="text-lg">
              <IoMdContacts />
              CONTACT US
            </Button>
            <Button variant="ghost" className="text-lg">
              <FaInfoCircle />
              ABOUT US
            </Button>
          </div>
        </div>
      )}
      <nav className="bg-white bg:black shadow-sm p-4 flex justify-between items-center z-10">
        <div className="sm:text-xl tracking-tighter font-bold w-fit h-fit grid place-items-center">
          <h1>Wallet</h1> <h1>Manager</h1>
        </div>
        <div className="hidden space-x-4 sm:flex">
          <Link to="/">
            <Button variant="ghost">
              <FaHome />
              HOME
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost">
              <IoMdContacts />
              CONTACT US
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost">
              <FaInfoCircle />
              ABOUT US
            </Button>
          </Link>
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            className="text-white rounded-full"
            onClick={() => console.log("Login Clicked")}
          >
            Log in
          </Button>
          <Button
            className="rounded-full sm:hidden"
            size="icon"
            variant={"secondary"}
            onClick={() => setisMenuOpen((prev: boolean) => !prev)}
          >
            <RxHamburgerMenu />
          </Button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
