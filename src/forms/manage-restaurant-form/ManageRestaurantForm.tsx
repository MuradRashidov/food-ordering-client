import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailSection from "./DetailSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSections from "./CuisinesSections";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName:z.string({
        required_error:"Restaurant Name is Required"
    }),
    city:z.string({
        required_error:"City is Required"
    }),
    country:z.string({
        required_error:"Country is Required"
    }),
    deliveryPrice:z.coerce.number({
        required_error:"Delivery Price is required!",
        invalid_type_error:"Delivery Price must be valid number"
    }),
    estimatedDeliveryTime:z.coerce.number({
        required_error:"Estimated Delivery Time is required!",
        invalid_type_error:"Estimated Delivery Time must be valid number"
    }),
    cuisines:z.array(z.string()).nonempty({message:"Please select at least one item"}),
    menuItems:z.array(z.object({
        name:z.string().min(1,"Menu item name is required"),
        price:z.coerce.number().min(1,"Menu item price is required")
    })),
    imageUrl:z.string().optional(),
    imageFile:z.instanceof(File, {message:"Image is required"}).optional()
}).refine((data)=>data.imageUrl || data.imageFile,{
    message:"Either image url or image file must be provided",
    path:["imageFile"]

});
type RestaurantFormData = z.infer<typeof formSchema>;
type Props = {
    onSave:(restaurantFormData:FormData)=>void;
    isLoading:boolean;
    restaurant?:Restaurant
}


export default function ManageRestaurantForm({onSave, isLoading,restaurant}:Props) {
    const form = useForm<RestaurantFormData>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            cuisines:[],
            menuItems:[{name:"",price:0}],
        }
    });
    useEffect(()=>{
        if (!restaurant) {
            return
        }
      const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice/100).toFixed(2));
      const menuItemsFormatted = restaurant.menuItems.map((item)=>{
        return {...item,price:parseInt((item.price/100).toFixed(2))}
      });
      const updatedRestaurant = {...restaurant,deliveryPrice:deliveryPriceFormatted,menuItems:menuItemsFormatted};
      form.reset(updatedRestaurant);
    },[form,restaurant])
    const onSubmit = (formDataJson:RestaurantFormData) => {
        try {
            console.log("test");
        
         const formData = new FormData();
         formData.append("restaurantName",formDataJson.restaurantName);
         formData.append("city",formDataJson.city);
         formData.append("country",formDataJson.country);
         formData.append("deliveryPrice",(formDataJson.deliveryPrice*100).toString());
         formData.append("estimatedDeliveryTime",formDataJson.estimatedDeliveryTime.toString());
         formDataJson.cuisines.forEach((cuisine,index)=>{
                formData.append(`cuisines[${index}]`,cuisine);
         });
         formDataJson.menuItems.forEach((menuItem,index)=>{
            formData.append(`menuItems[${index}][name]`,menuItem.name);
            formData.append(`menuItems[${index}][price]`,(menuItem.price*100).toString());
         });
         if (formDataJson.imageFile) {
            formData.append("imageFile",formDataJson.imageFile);
         }
         console.log(formDataJson);
         onSave(formData);
        } catch (error) {
            console.log(error);
            
        }
         
    }
  return (
    <Form {...form}>
       <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 bg-gray-50 p-10 rounded-lg"
            >
                <DetailSection/>
                <Separator/>
                <CuisinesSections/>
                <Separator/>
                <MenuSection/>
                <ImageSection/>
                {isLoading?<LoadingButton/>:<Button type="submit">Submit</Button>}
            </form>
    </Form>
  )
}
