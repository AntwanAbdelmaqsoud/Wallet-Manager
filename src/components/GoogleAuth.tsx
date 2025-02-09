import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import SideBar from "./SideBar";

export default function GoogleAuth() {
  const [searchParams] = useSearchParams();
  const [code] = useState(searchParams.get("code"));
  const [userName, setuserName] = useState<string | null>(null);
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["userData", code],
    queryFn: async () => {
      const response = await fetch(
        `https://wallet-manager-api-production.up.railway.app/oauth/google/login?code=${code}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    },
    enabled: !!code,
  });
  useEffect(() => {
    if (data) {
      setuserName(data.data.user.name);
      console.log(data);
    }
  }, [data]);
  if (isError) return <div>Error: {error.message}</div>;
  return (
    <div className="min-h-screen flex p-2 bg-[#F6F6F6]">
      <SideBar />
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <div className="p-2 text-3xl">
          HomePage: {userName}
          <br />
        </div>
      )}
    </div>
  );
}
