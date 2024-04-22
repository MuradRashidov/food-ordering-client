import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form"

export default function ImageSection() {
    const {control,watch} = useFormContext();    
    const existingImageUrl = watch("imageUrl");
    console.log("watch",existingImageUrl);

  return (
    <div className="space-y-2">
        <div>
            <h2 className="text-2xl font-bold">Image</h2>
            <FormDescription>
                Add an image that will be display your restaurant listing search results.
                Adding new image will overwrite on excised one.
            </FormDescription>
        </div>
        <div className="flex flex-col gap-16 md:w-[50%]">
            {existingImageUrl && (<AspectRatio ratio={16/9} className="space-y-4 object-cover w-full h-full rounded-md">
                    <img src={existingImageUrl} alt="asd" />
                </AspectRatio>)}            
            <FormField
                control={control}
                name="imageFile"
                render={({field})=>(
                    <FormItem>
                        <FormControl>
                            <Input 
                                className="bg-white" 
                                type="file" accept=".jpg, .jpeg, .png" 
                                onChange={(event)=>field.onChange(event.target.files
                                    ?event.target.files[0]
                                    :null
                                )}
                                />
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
        </div>
    </div>
  )
}
