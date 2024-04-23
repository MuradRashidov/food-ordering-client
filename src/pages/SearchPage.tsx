import { useSearchRestaurants } from "@/api/RestaurantApi";
import { useParams } from "react-router-dom"

export default function SearchPage() {
    const {city} = useParams();
    const {result} = useSearchRestaurants(city || "");
  return (
    <div>
        <span>User search for {city}</span>
        {result?.data.map(restaurant=>(
            <span>{`${restaurant.restaurantName} | ${restaurant.city}`} </span>
        ))}
    </div>
  )
}
