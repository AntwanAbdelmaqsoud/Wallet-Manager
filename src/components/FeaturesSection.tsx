import Card1 from "@/assets/Card1.png";
import Card2 from "@/assets/Card2.png";
import Card3 from "@/assets/Card3.png";
import Card4 from "@/assets/Card4.png";
import Card from "./Card";

const cards = [
  { title: "Online Payments", imgSrc: Card1 },
  {
    title: "Make Connections",
    imgSrc: Card2,
  },
  {
    title: "Exclusive Offers",
    imgSrc: Card3,
  },
  {
    title: "Save Money",
    imgSrc: Card4,
  },
];

const FeaturesSection = () => {
  return (
    <div className="container flex flex-col p-2">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:divide-x">
        {cards.map((card, index) => {
          return <Card key={index} imgSrc={card.imgSrc} title={card.title} />;
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;
