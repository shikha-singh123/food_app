import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestrauntMenu";
import RestaurantCategory from "./RestaurantCategory";
import { useState } from "react";


const RestaurantMenu = () => {
  // const [resInfo, setResInfo] = useState(null);

  const {resId} = useParams();
  const dummy= "Dummy data";

  const resInfo = useRestaurantMenu(resId);
  
const [showIndex,setShowIndex] = useState(0);

  // useEffect(() => {
  //   fetchMenu();
  // }, []);
  // const fetchMenu = async () => {
  //   const data = await fetch(
  //     MENU_API + resId
  //   );
  //   const json = await data.json();
  //   console.log(json);
  //   setResInfo(json.data);
  // };

  if(resInfo===null) return <Shimmer/>;
  const{name,cuisines,costForTwoMessage} =
  resInfo?.cards[0]?.card?.card?.info;

  const {itemCards}= resInfo?.cards[2]?.groupedCard?.
  cardGroupMap?.REGULAR?.cards[2]?.card?.card;
  console.log(resInfo?.cards[2]?.groupedCard?.
    cardGroupMap?.REGULAR?.cards);
  console.log(itemCards);

  const categories= resInfo?.cards[2]?.groupedCard?.
  cardGroupMap?.REGULAR?.cards.filter(c=>c.card?.["card"]?.["@type"]===
  "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
  );
  console.log(categories);

  
  return (
    <div className="text-center">
      <h2 className="font-bold my-6 text-2xl">{name}</h2>
      <p className="font-bold text-lg">{cuisines.join(",")}={costForTwoMessage}</p>
      <h3 className="font-bold text-xl mt-8">Menu</h3>
      <div className="flex flex-col items-center mt-4">
      {categories.map((category,index)=>(

        // controlled component
        <RestaurantCategory 
         key={category?.card?.card?.title}
        data={category?.card?.card}
        showItems={index === showIndex ? true : false}
        setShowIndex = {() => setShowIndex(index)}
        dummy={dummy}
        />
       ))}
       
      </div>
    </div>
  );
  
};

export default RestaurantMenu;
