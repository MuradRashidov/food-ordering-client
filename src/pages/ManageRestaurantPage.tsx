import { useCreateMyRestaurant, useGetMyRestaurant, useUpdateMyRestaurant } from '@/api/MyRestaurantApi'
import ManageRestaurantForm from '@/forms/manage-restaurant-form/ManageRestaurantForm'

export default function ManageRestaurantPage() {
  const {restaurant} = useGetMyRestaurant();
  const {createRestaurant,isLoading:isCreateLoading} = useCreateMyRestaurant();
  const {updateRestaurant,isLoading:isUpdateLoading} = useUpdateMyRestaurant();
  const isEdited = !!restaurant;
  return <ManageRestaurantForm restaurant={restaurant} onSave={isEdited?updateRestaurant:createRestaurant} isLoading={isCreateLoading||isUpdateLoading}/>
}
