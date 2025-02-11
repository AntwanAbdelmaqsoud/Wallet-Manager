import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";
// import { useQuery } from "@tanstack/react-query";

export default function UserPage() {
  const { user } = useContext(AuthContext);
  // const {
  //   data: wallets,
  //   isPending,
  //   isError,
  // } = useQuery({
  //   queryKey: ["wallets", user?._id],
  //   queryFn: async ()=>{
  //     const walletsResponse = await fetch(`http://localhost:3001/${user?._id}/wallets`)
  //   }
  // });
  return <div className="min-h-screen w-full flex">{user?._id}</div>;
}
