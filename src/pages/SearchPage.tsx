import { useSearchRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultCard from "@/components/SearchResultCard";
import SearchResultInfo from "@/components/SearchResultInfo";
import SortOptionsDropdown from "@/components/SortOptionsDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom"
export type SearchState = {
    searchQuery:string,
    page:number,
    selectedCuisines:string[],
    sortOption:string
}
export default function SearchPage() {
    const {city} = useParams();
    const [searchState,setSearchState] = useState<SearchState>({
        searchQuery:"",
        page:1,
        selectedCuisines:[],
        sortOption:"bestMatch"
    });
    const [isExpanded,setIsExpanded] = useState<boolean>(false);
    const {result,isLoading} = useSearchRestaurants(searchState,city || "");
    const setSelectedCuisines = (selectedCuisines:string[]) => {
        setSearchState((prev)=>({
            ...prev,
            selectedCuisines,
            page:1
        }))
    }
    const setPage = (page:number) => {
        setSearchState((prev) => ({
            ...prev,
            page
        }))
    }
    const setSearchQuery = (searchFormData:SearchForm) => {
        setSearchState((prev)=>({
            ...prev,
            searchQuery: searchFormData.searchQuery,
            page:1
        }))
    }
    const resetSearch = () => {
        setSearchState((prev)=>({
            ...prev,
            searchQuery: "",
            page:1
        }))
    }
    const setSortOption = (sortOption:string) => {
        setSearchState((prev)=>({...prev,sortOption,page:1}))
    }
    if (isLoading) {
       return <span>Loading...</span> 
    }
    if (!result?.data || !city) {
        return <span>No result found</span>
    }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div id="cuisines-list">
            <CuisineFilter 
                selectedCuisines={searchState.selectedCuisines}
                onChange={setSelectedCuisines}
                isExpanded={isExpanded}
                onExpandedClick={() => setIsExpanded((prev) => !prev)}
                
            />
        </div>
        <div id="main-content" className="flex flex-col gap-5">
            <SearchBar 
                searchQuery={searchState.searchQuery}
                onSubmit={setSearchQuery}
                placeHolder="Search by cuisine or restaurant name"
                onReset={resetSearch}
            />
            <div className="flex justify-between flex-col gap:3 lg:flex-row">
                <SearchResultInfo total={result.pagination.total} city={city}/>
                <SortOptionsDropdown 
                    sortOption={searchState.sortOption} 
                    onChange={(value)=>setSortOption(value)}
                />
            </div>
            {result.data.map((restaurant)=>(
                <SearchResultCard restaurant={restaurant}/>
            ))}
            <PaginationSelector 
                page={result.pagination.page} 
                pages={result.pagination.pages} 
                onPageChange={setPage}
            />
        </div>
    </div>
  )
}
