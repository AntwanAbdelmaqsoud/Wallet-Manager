import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import SideBar from "./SideBar";

export default function GoogleAuth() {
  const [searchParams] = useSearchParams();
  const [userName, setUserName] = useState<string | null>(null);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (code: string) => {
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
    onSuccess: (data) => {
      setUserName(data.data.user.name);
      console.log("User data:", data);
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      mutate(code);
    }
  }, [searchParams, mutate]);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="min-h-screen flex p-2 bg-[#F6F6F6]">
      <SideBar />
      <div className="p-2 text-3xl">
        {userName ? `Welcome, ${userName}!` : "HomePage"}
      </div>
    </div>
  );
}
