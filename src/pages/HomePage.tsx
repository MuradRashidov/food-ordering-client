import landingImage from "../assets/landing.png";
import appDownload from "../assets/appDownload.png"
import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
export default function HomePage() {
  const navigate = useNavigate();
  const handleSearchSubmit =  (searchFormValues:SearchForm) => {
      navigate({
        pathname:`/search/${searchFormValues.searchQuery}`
      })
  }
  return (
    <div className='flex flex-col gap-12'>
       <div className='md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16'>
            <h1 className='text-5xl font-bold tracking-tight text-orange-600'>
              Tuck into takeway Today
            </h1>
            <span className='text-xl'>Food is just click away!</span>
            <SearchBar placeHolder="Search by city or town" onSubmit={handleSearchSubmit}/>
       </div>
       <div className='grid md:grid-cols-2'>
        <img src={landingImage} alt="food delivery" />
        <div className="flex flex-col items-center gap-4 justify-center text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeway even faster
          </span>
          <span>Download MearnEats App for faster ordering and personalized recommendation</span>
           <img src={appDownload} alt="food delivery" />
        </div>
       </div>
    </div>
  )
}
