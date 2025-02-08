import heroImage from "@/assets/cc.png";
import heroImage2 from "@/assets/bg2.png";
// import SignupModal from "./SignupModal";
import { Button } from "./ui/button";

const fetchUserSession = async () => {
  try {
    const res = await fetch(
      "https://wallet-manager-api-production.up.railway.app/api/sessions/oauth/google",
      {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: "Bearer ",
        },
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    console.log("✅ User logged in:", data);
  } catch (error) {
    console.error("❌ Error fetching session:", error);
  }
};

const getGoogleLoginLink = async () => {
  const data = await fetch(
    "https://wallet-manager-api-production.up.railway.app/oauth/google"
  );
  const pzpz = await data.json();
  return pzpz.oauthUrl;
};

const googleLogin = async () => {
  const oauthWindow = window.open(await getGoogleLoginLink(), "_self");

  const checkPopupClosed = setInterval(() => {
    if (oauthWindow?.closed) {
      clearInterval(checkPopupClosed);
      fetchUserSession();
    }
  }, 500);
};

const HeroSection = () => {
  return (
    <div className="grid w-full min-h-fit p-11 bg-[#F6F6F6] place-items-center relative overflow-hidden">
      <div className="flex flex-col justify-center items-center text-center z-10">
        <h1 className="sm:text-7xl text-4xl font-bold font-[Roboto] tracking-tighter">
          Finance Done <br />
          Smoothly
        </h1>
        <h2 className="sm:text-5xl text-2xl font-medium text-[#9F9F9F] tracking-tight">
          all in one place
        </h2>
        <h3 className="sm:text-lg mt-6">
          Efficiently manage your wallets and boost productivity
        </h3>
        {/* <SignupModal /> */}
        <Button variant={"destructive"} className="mt-2" onClick={googleLogin}>
          Sign up
        </Button>
        {/* <Button variant="destructive" className="mt-6">
          Sign Up
        </Button> */}
      </div>
      <img
        src={heroImage}
        className="w-1/3 min-[470px]:w-1/4 md:w-auto md:h-1/3 lg:h-1/2 aspect-auto absolute -left-3 -bottom-5 -rotate-45 z-0"
      />
      <img
        src={heroImage2}
        className="w-1/4 aspect-auto absolute right-0 top-2 -rotate-45 z-0"
      />
    </div>
  );
};

export default HeroSection;
