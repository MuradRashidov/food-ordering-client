import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

