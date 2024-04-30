import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import { CheckoutButton } from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import { OrderSummary } from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem as MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom"
export type CartItem = {
    _id:string;
    name:string;
    quantity:number;
    price:number;
}
export default function DetailPage() {
    const {restaurantId} = useParams();
    const {restaurant,isLoading} = useGetRestaurant(restaurantId); 
    const {createCheckoutSession,isLoading:isCheckouLoading} = useCreateCheckoutSession();

    const [cartItems,setCartItems] = useState<CartItem[]>(()=>{
        const itemsFromStorage = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return itemsFromStorage?JSON.parse(itemsFromStorage):[];
    });
    const addToCart = (menuItem:MenuItemType) => {
         setCartItems((prevCartItems)=>{
            const existingCartItem = prevCartItems.find((prevCartItem)=>prevCartItem._id === menuItem._id);
            let updatedCartItems:CartItem[];
            if (existingCartItem) {
                updatedCartItems = prevCartItems.map((prevCartItem)=>
                    (prevCartItem._id === existingCartItem._id
                        ?{...existingCartItem,quantity:prevCartItem.quantity+1}
                        :prevCartItem
                    ))
            }
            else{
                updatedCartItems = [...prevCartItems,{
                    _id: menuItem._id,
                    name:menuItem.name,
                    price:menuItem.price,
                    quantity:1
                }]
            }
            sessionStorage.setItem(`cartItems-${restaurantId}`,JSON.stringify(updatedCartItems));
            return updatedCartItems;
         })
    }
    const removeFromCart = (cartItem:CartItem) => {
       setCartItems((prevCartItems)=>{
           const updatedCartItems = prevCartItems.filter((item)=>item._id !== cartItem._id);
           sessionStorage.setItem(`cartItems-${restaurantId}`,JSON.stringify(updatedCartItems));
           return updatedCartItems;
       });
    }
    const onCheckout = async (userFormData:UserFormData) => {
        if (!restaurant) {
            return
        }
        console.log(userFormData);
        const checkoutData = {
            cartItems:cartItems.map((cartItem)=>({
                menuItemId:cartItem._id,
                name:cartItem.name,
                quantity:cartItem.quantity.toString()
            })),
            restaurantId:restaurant?._id,
            deliveryDetails:{
                name:userFormData.name,
                addressLine1:userFormData.addressLine1,
                city:userFormData.city,
                country:userFormData.country,
                email:userFormData.email as string
            }
        }
        const data = await createCheckoutSession(checkoutData); 
        window.location.href = data.url;       
    }
    if (isLoading || !restaurant) {
        return "Loading..."
    }
  return (
    <div>
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16/5}>
                <img 
                    src={restaurant.imageUrl} 
                    alt={restaurant.restaurantName}
                    className="rounded:md object-cover h-full w-full"
                 />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant}/>
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem)=>(
                        <MenuItem menuItem={menuItem} addToCart={()=>{addToCart(menuItem)}}/>
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary
                            restaurant={restaurant}
                            cartItems={cartItems}
                            removeFromCart={removeFromCart}
                        />
                        <CardFooter>
                            <CheckoutButton isLoading={isCheckouLoading} disabled={cartItems.length === 0} onCheckout={onCheckout}/>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  )
}
