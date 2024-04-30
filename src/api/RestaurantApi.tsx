import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetRestaurant = (restaurantId?:string) => {
  const  getRestaurantByIdRequest = async ():Promise<Restaurant> => {
        const response = await fetch(`${API_BASE_URL}/api/restaurants/${restaurantId}`);
        if (!response.ok) {
            throw new Error("Fail get restaurant by id")
        }
        return response.json();
  }
  const  { data:restaurant,isLoading} = useQuery(["fetchRestaurant"],getRestaurantByIdRequest,{enabled:!!restaurantId});
  return {restaurant,isLoading}
}
export const useSearchRestaurants = (searchState:SearchState,city?:string) => {
    const createSearchRequest = async():Promise<RestaurantSearchResponse> => {
        const params = new URLSearchParams();
        params.set("searchQuery",searchState.searchQuery);
        params.set("page",searchState.page.toString());
        params.set("selectedCuisines",searchState.selectedCuisines.join(","));
        params.set("sortOptions",searchState.sortOption);
        const response = await fetch(`${API_BASE_URL}/api/restaurants/search/${city}?${params.toString()}`,{
            method:"GET"
            
        });

        if (!response.ok) {
            console.log(response);
            
           throw new Error("fail to get restaurant"); 
        }
        return response.json();
    }
    const {data:result,isLoading} = useQuery(["searchRestaurants",searchState],createSearchRequest,{enabled:!!city});
    return {result,isLoading}; 
}

