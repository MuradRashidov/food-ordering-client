import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const useGetMyOrders = () => {
    const {getAccessTokenSilently} = useAuth0();
    const getMyOrdersRequest = async ():Promise<Order[]> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/order`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            throw new Error("Unable to get orders")
        }
        return response.json();
    }
    const {data:orders,isLoading} = useQuery(["fetchMyOrders"],getMyOrdersRequest);
    return {
        orders,
        isLoading
    }
}
type CheckoutSessionRequest = {
    cartItems:{
        menuItemId:string;
        name:string;
        quantity:string
    }[];
    deliveryDetails:{
        email:string,
        name:string,
        addressLine1:string,
        city:string,
    },
    restaurantId:string
}
export const useCreateCheckoutSession = () => {
       const {getAccessTokenSilently} = useAuth0();
       const createCheckoutSessionRequest = async (createSessionRequest:CheckoutSessionRequest) => {
             const accessToken = await getAccessTokenSilently();
             const response = await fetch(`${API_BASE_URL}/api/order/checkout/create-checkout-sessions`,{
                method:"POST",
                headers:{
                    Authorization:`Bearer ${accessToken}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(createSessionRequest)
             })
             if (!response.ok) {
                throw new Error("Fail to create session");
             }
             return response.json();
       };

       const {mutateAsync:createCheckoutSession,isLoading,error,reset} = useMutation(createCheckoutSessionRequest);
       if (error) {
          toast.error("Fail to create checkout session");
          reset();
       }
       return {createCheckoutSession,isLoading}
 }