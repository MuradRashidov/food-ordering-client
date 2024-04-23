import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (city?:string) => {
    const createSearchRequest = async():Promise<RestaurantSearchResponse> => {
        const response = await fetch(`${API_BASE_URL}/api/restaurants/search/${city}`,{
            method:"GET"
            
        });

        if (!response.ok) {
            console.log(response);
            
           throw new Error("fail to get restaurant"); 
        }
        return response.json();
    }
    const {data:result,isLoading} = useQuery(["searchRestaurants"],createSearchRequest,{enabled:!!city});
    return {result,isLoading}; 
}

