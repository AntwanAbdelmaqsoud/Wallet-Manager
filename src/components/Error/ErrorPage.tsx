import ErrorUrl from "@/assets/error.webp";

export default function ErrorPage() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col items-center gap-2">
        <img className="w-[200px] aspect-square " src={ErrorUrl} />
        <h1 className="text-lg font-bold">Oops!</h1>
        An Error occured
      </div>
    </div>
  );
}
