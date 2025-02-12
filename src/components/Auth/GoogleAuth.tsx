import { useSearchParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
import ErrorPage from "../Error/ErrorPage";
import LoadingSpinner from "../Common/LoadingSpinner";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext, googleLoginData } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

export default function GoogleAuth() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const redirectTimeOut = useRef<null | NodeJS.Timeout>(null);

  //  --- For Actual Server ---
  const [searchParams] = useSearchParams();
  const [data, setData] = useState<googleLoginData | null>(null);
  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch(
        `https://wallet-manager-api-production.up.railway.app/oauth/google/login?code=${code}`,
        {
          method: "POST",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      return response.json();
    },
    onSuccess: (res) => {
      setData(res.data);
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      mutate(code);
    }
  }, [searchParams, mutate]);

  // --- For Dev ---
  // const { data, isError, isPending, isSuccess } = useQuery({
  //   queryKey: ["data"],
  //   queryFn: async () => {
  //     const response = await fetch("http://localhost:3001/data");
  //     // await new Promise((resolve) => setTimeout(resolve, 2000));
  //     return await response.json();
  //   },
  // });

  useEffect(() => {
    if (isSuccess && data) {
      login(data);
      redirectTimeOut.current = setTimeout(() => {
        navigate(`/${data.user._id}`);
      }, 1000);
    }
    return () => {
      if (redirectTimeOut.current) {
        clearTimeout(redirectTimeOut.current);
      }
    };
  }, [isSuccess]);

  if (isError) return <ErrorPage />;

  return (
    <div className="min-h-screen grid place-items-center w-full bg-[#F6F6F6]">
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <div className="p-2 text-2xl text-center">
          {data ? (
            <>
              Welcome, {data.user.name}! <br />
              <p className="text-xl mt-2 text-black/70">
                Redirecting to Dashboard...
              </p>
            </>
          ) : (
            "Google Login"
          )}
        </div>
      )}
    </div>
  );
}
