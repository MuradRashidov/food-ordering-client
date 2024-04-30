import { CartItem } from "@/pages/DetailPage"
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
    cartItems: CartItem[];
    restaurant:Restaurant;
    removeFromCart:(cartItem:CartItem)=>void;
}

export const OrderSummary = ({cartItems,restaurant,removeFromCart}:Props) => {
const getTotalCost = ():string => {
  const totalInPence = cartItems.reduce((total,cartItem)=>total + cartItem.price*cartItem.quantity,0)
  const totolWithDelivery = totalInPence + restaurant.deliveryPrice;
  return (totolWithDelivery/100).toFixed(2);
}
  return (
    <>
        <CardHeader>
            <CardTitle className="font-2xl font-bold tracking-tight flex justify-between">
                <span>Your order</span>
                <span>${getTotalCost()}</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
            {cartItems.map((cartItem)=>(
                <div className="flex justify-between">
                    <span>
                        <Badge variant="outline" className="mr-2">
                            {cartItem.quantity}
                        </Badge>
                        {cartItem.name}
                    </span>
                    <span className="flex items-center gap-1">
                        <Trash className="cursor-pointer" color="red" size={20} onClick={()=>removeFromCart(cartItem)}/>
                        ${((cartItem.price*cartItem.quantity)/100).toFixed(2)}
                    </span>
                </div>
            ))}
            <Separator/>
            <div className="flex justify-between">
                <span>Delivery</span>
                <span>${(restaurant.deliveryPrice/100).toFixed(2)}</span>
            </div>
            <Separator/>
        </CardContent>
    </>
  )
}
