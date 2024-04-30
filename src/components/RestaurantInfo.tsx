import { Restaurant } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Dot } from "lucide-react"

type Props = {
    restaurant:Restaurant
}

export default function RestaurantInfo({restaurant}:Props) {
  return (
            <Card className="sla">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold tracking-tight">
                        {restaurant.restaurantName}
                    </CardTitle>
                    <CardDescription>
                        {restaurant.city}
                        {restaurant.country}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex">
                    {
                        restaurant.cuisines.map((cuisine,index,ref)=>(
                            <span className="flex">
                                <span>{cuisine}</span>
                                {index < ref.length-1 && <Dot/>}
                            </span>
                        ))
                    }
                </CardContent>
            </Card>
         )
}
