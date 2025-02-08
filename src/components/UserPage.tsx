// import { useParams } from "react-router-dom";
import WalletSection from "./WalletSection";
import SideBar from "./SideBar";

const UserPage = () => {
  // const { userId } = useParams<{ userId: string }>();

  return (
    <div className="min-h-screen flex bg-[#F6F6F6]">
      <SideBar />
      <WalletSection />
    </div>
  );
};

export default UserPage;
