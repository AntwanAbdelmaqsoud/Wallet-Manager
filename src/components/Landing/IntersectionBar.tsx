import { Button } from "@/components/ui/button";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function IntersectionBar({
  title,
  buttonWord,
}: {
  title: string;
  buttonWord: string;
}) {
  return (
    <div className="w-full py-3 flex items-center justify-around bg-zinc-900 text-zinc-100">
      <h2 className="tracking-tight font-semibold">{title}</h2>
      <Button className="shadow-none">
        {buttonWord}
        <FaExternalLinkAlt />
      </Button>
    </div>
  );
}
