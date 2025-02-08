import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "./SideBar";

export default function GoogleAuth() {
  const { code } = useParams<string>();
  const [userName, setuserName] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async (code: string) => {
      const data = await fetch(
        `https://wallet-manager-api-production.up.railway.app/oauth/google/login?code=${code}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const dataAsJson = await data.json();
      setuserName(dataAsJson.name);
    };
    if (code) {
      fetchUserData(code);
    }
  }, []);
  return (
    <div className="min-h-screen flex p-2 bg-[#F6F6F6]">
      <SideBar />
      <div className="p-2 text-3xl">
        HomePage: {userName}
        <br />
        {/* Data:{" "}
        {data
          ? Object.entries(data).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))
          : ""}
      </div> */}
      </div>
    </div>
  );
}
