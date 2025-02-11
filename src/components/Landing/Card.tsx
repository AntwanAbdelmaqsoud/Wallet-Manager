//   const ColorPalette = () => (
//     <div className="grid grid-cols-2 gap-4 p-4">
//       <div className="bg-[#baa0ff] p-4 rounded-lg text-black">Light Purple</div>
//       <div className="bg-[#f8d9ff] p-4 rounded-lg text-black">Light Pink</div>
//       <div className="bg-[#e1ebf4] p-4 rounded-lg text-black">Light Blue</div>
//       <div className="bg-black p-4 rounded-lg text-white">Total Black</div>
//     </div>
//   );

export default function Card({
  title,
  imgSrc,
}: {
  title: string;
  imgSrc: string;
}) {
  return (
    <div className="p-4 w-full  text-zinc-800 flex flex-col items-center justify-between">
      <div className="w-full">
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <img src={imgSrc} className="w-full" />
    </div>
  );
}
