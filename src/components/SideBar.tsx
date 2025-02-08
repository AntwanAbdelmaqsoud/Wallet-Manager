import { Link } from "react-router-dom";
import { FaWallet } from "react-icons/fa";
import { MdDashboard, MdOutlineSupportAgent } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoLogOut } from "react-icons/io5";

const SideBar = () => {
  return (
    <nav className="min-h-screen bg-red-900 text-zinc-200 flex flex-col items-start space-y-3 text-lg p-2">
      <div>
        <Link to="/dashboard" className="flex items-center p-2 gap-2 rounded">
          <MdDashboard /> <span className="hidden md:block">Dashboard</span>
        </Link>
      </div>
      <div>
        <Link to="/wallets" className="flex items-center gap-2 p-2 rounded">
          <FaWallet /> <span className="hidden md:block">Wallets</span>
        </Link>
      </div>
      <div>
        <Link to="/help" className="flex items-center p-2 gap-2 rounded">
          <MdOutlineSupportAgent />{" "}
          <span className="hidden md:block">Support</span>
        </Link>
      </div>
      <div>
        <Link to="/profile" className="flex items-center p-2 gap-2 rounded">
          <CgProfile /> <span className="hidden md:block">Profile</span>
        </Link>
      </div>
      <div>
        <button className="flex items-center p-2 gap-2 rounded ">
          <IoLogOut /> <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default SideBar;
