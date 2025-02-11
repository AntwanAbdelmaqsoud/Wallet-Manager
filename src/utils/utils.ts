export const googleLogin = async () => {
  const data = await fetch(
    "https://wallet-manager-api-production.up.railway.app/oauth/google"
  );
  const response = await data.json();
  window.open(response.oauthUrl, "_self");
};
