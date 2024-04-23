import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
    searchQuery: z.string({
        required_error:"Restaurant name is required"
    })
});
export type SearchForm = z.infer<typeof formSchema>;
type Props = {
    placeHolder:string;
    onSubmit:(formData:SearchForm)=> void;
    onReset?:()=>void;
}
export default function SearchBar({placeHolder,onSubmit,onReset}:Props) {
    const form = useForm<SearchForm>({
        resolver:zodResolver(formSchema),
        defaultValues:{
            searchQuery:""
        }
    })
    const handleReset = () => {
        form.reset({
            searchQuery:""
        });
        if(onReset){
            onReset();
        }
    }
  return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className={`flex flex-center gap-3 justify-between flex-row border-2 rounded-full p-3 mx-5 
            ${form.formState.errors.searchQuery && "border-red-500"}`}
            >
            <Search strokeWidth={2.5} size={30} className="ml-1 text-orange-500 hidden md:block"/>
            <FormField
                control={form.control}
                name="searchQuery"
                render={({field})=>(
                    <FormItem className="flex-1">
                        <FormControl>
                            <Input 
                                {...field} 
                                className="border-none shadow-none text-xl focus-visible:ring-0"
                                placeholder={placeHolder}
                                />
                        </FormControl>
                    </FormItem>
                )}
            />
            {form.formState.isDirty && (
                <Button 
                    onClick={handleReset}
                    className="rounded-full" 
                    variant="outline" 
                    type="button">
                    Clear
                </Button>
            )}
            <Button 
               type="submit"
               className="rounded-full bg-orange-500"
            >
                Search
            </Button>
        </form>
    </Form>
  )
}