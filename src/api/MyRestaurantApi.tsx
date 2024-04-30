import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetMyRestaurant = () => {
    const {getAccessTokenSilently} = useAuth0();
    const getMyRestaurantRequest = async():Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch restaurant");
        }
        return response.json();
    } 
        const {data:restaurant,isLoading} = useQuery("fetchMyRestaurant",getMyRestaurantRequest);
        return {restaurant,isLoading};
}
export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();
  
    const createMyRestaurantRequest = async (
      restaurantFormData: FormData
    ): Promise<Restaurant> => {
      const accessToken = await getAccessTokenSilently();
  
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: restaurantFormData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to create restaurant");
      }
  
      return response.json();
    };
  
    const {
      mutate: createRestaurant,
      isLoading,
      isSuccess,
      error,
    } = useMutation(createMyRestaurantRequest);
  
    if (isSuccess) {
      toast.success("Restaurant created!");
    }
  
    if (error) {
      toast.error("Unable to create restaurant");
    }
  
    return { createRestaurant, isLoading };
  };
export const useUpdateMyRestaurant  = () => {
    const {getAccessTokenSilently} = useAuth0();
    const updateMyRestaurantRequest = async (restaurantFormData:FormData):Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`,{
            method:"PUT",
            headers:{
                Authorization:`Bearer ${accessToken}`
            },
            body:restaurantFormData
        });
        if (!response.ok) {
            throw new Error("Failed to updated restaurant");
        }
        return response.json();
    }

    const {mutateAsync:updateRestaurant,isLoading,isSuccess,error} = useMutation(updateMyRestaurantRequest);
    if (isSuccess) {
        toast.success("Restaurant updated successfully");
    }
    if (error) {
        toast.error("Restaurant updated failed");
    }

    return {
        updateRestaurant,
        isLoading
    };
}
export const useGetMyRestaurantOrders = () => {
  const {getAccessTokenSilently} = useAuth0();
  const getMyrestaurantOrdersRequest = async ():Promise<Order[]> => {
      const accessToken = await getAccessTokenSilently();
      const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders`,{
        headers:{
          Authorization:`Bearer ${accessToken}`,
          "Content-Type":"application/json"
        }
      })
      if(!response){
         throw new Error("Something went wrong");
      }
      return response.json();
  }
  const {data:orders,isLoading} = useQuery("fetchMyRestaurantOrders",getMyrestaurantOrdersRequest,{
    refetchInterval:5000 
  });
  return {orders,isLoading}
}
type UpdateMyRestaurantOrderRequest = {
  orderId:string;
  status:string
}
export const useUpdateMyRestaurantOrder = () => {
   const {getAccessTokenSilently} = useAuth0();
   const updateMyRestaurantOrder = async ({orderId,status}:UpdateMyRestaurantOrderRequest) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders/${orderId}/status`,{
          method:"PATCH",
          headers:{
            Authorization:`Bearer ${accessToken}`,
            "Content-Type":"application/json"
          },
          body:JSON.stringify({status})
        }
          
        ) 
        if (!response.ok) {
          throw new Error("Fail to update order status_")
        }
        return response.json();
   }

   const {mutateAsync:updateOrderStatus,isLoading,isSuccess,isError,reset} = useMutation(updateMyRestaurantOrder);
   if (isSuccess) {
      toast.success("Order status has updated");
   }
   if (isError) {
    toast.error("Unable to update order status");
    reset();
   }
   return {updateOrderStatus,isLoading}
}