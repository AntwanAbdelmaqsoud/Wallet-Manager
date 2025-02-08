import Cookies from "js-cookie";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";

export default function HomePage() {
  const myCookie = Cookies.get("refreshToken");
  const [data, setdata] = useState<object | null>(null);
  useEffect(() => {
    const getUserData = async (refreshToken: string) => {
      const data = await fetch(
        "https://wallet-manager-api-production.up.railway.app/api/sessions/me",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken }),
          credentials: "include",
        }
      );
      const dataAsJson = await data.json();
      return dataAsJson;
    };
    setdata(getUserData(myCookie!));
  }, [myCookie]);

  return (
    <div className="min-h-screen flex p-2 bg-[#F6F6F6]">
      <SideBar />
      <div className="p-2 text-3xl">
        HomePage: {myCookie}
        <br />
        Data:{" "}
        {data
          ? Object.entries(data).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))
          : ""}
      </div>
    </div>
  );
}
