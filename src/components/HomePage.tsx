// import Cookies from "js-cookie";
import SideBar from "./SideBar";
// import { useEffect, useState } from "react";

export default function HomePage() {
  // const [refreshToken, setRefreshToken] = useState(Cookies.get("refreshToken"));
  // const [data, setdata] = useState<object | null>(null);

  // useEffect(() => {
  //   const getUserData = async () => {
  //     const checkCookie = () => {
  //       return Cookies.get("refreshToken");
  //     };

  //     while (!checkCookie()) {
  //       await new Promise((resolve) => setTimeout(resolve, 100)); // Wait 100ms before checking again
  //     }

  //     const data = await fetch(
  //       "https://wallet-manager-api-production.up.railway.app/api/sessions/me",
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: "include",
  //       }
  //     );
  //     const dataAsJson = await data.json();
  //     return dataAsJson;
  //   };
  //   setdata(getUserData());
  //   setRefreshToken(Cookies.get("refreshToken"));
  // }, []);

  return (
    <div className="min-h-screen flex p-2 bg-[#F6F6F6]">
      <SideBar />
      <div className="p-2 text-3xl">
        {/* HomePage: {refreshToken} */}
        <br />
        Data:{" "}
        {/* {data
          ? Object.entries(data).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))
          : ""} */}
      </div>
    </div>
  );
}
