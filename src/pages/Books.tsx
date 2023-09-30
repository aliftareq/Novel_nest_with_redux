import { useGetBooksQuery } from '@/Redux/Features/Books/BookApi';
import { setGenre, setPublicationDate } from '@/Redux/Features/Books/bookSlice';
import { useAppDispatch, useAppSelector } from '@/Redux/hook';
import ProductCard from '@/components/ProductCard';
import { Slider } from '@/components/ui/slider';
import { IBook } from '@/types/globalTypes';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { useState } from 'react';


export default function Products() {

  const [searchTerm, setSearchTerm] = useState('');
  console.log(searchTerm);

  //fetching the  books data using RTK query.
  const {data} = useGetBooksQuery(searchTerm,{
    refetchOnMountOrArgChange: true,
  })
  
  const  {PublicationDate, Genre} = useAppSelector(state => state.bookFilter)
  const dispatch = useAppDispatch()

  const handleSlider = (value: number[]) => {
    dispatch(setPublicationDate(value[0]))
  };

  const genre = ['Fiction', 'Dystopian Fiction', 'Fantasy', 'Romance', 'Adventure']
  
  const handleGenre = (value:string) => {
    dispatch(setGenre(value))
  };

  let productsData;

  if (Genre) {
    productsData = data?.data?.filter(
      (item: {Genre:string, PublicationDate: number; }) => item.Genre === Genre && item.PublicationDate < PublicationDate
    );
  } else if (PublicationDate > 0) {
    productsData = data?.data?.filter((item: { PublicationDate: number; }) => item.PublicationDate < PublicationDate);
  } else {
    productsData = data?.data;
  }

  console.log('productsdata', productsData);

  return (
      <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
        <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
          <div>
            <h1 className="text-2xl my-4">Select your genre</h1>
            <Select onValueChange={handleGenre}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Genre" />
              </SelectTrigger>
              <SelectContent>
                {
                  genre.map((item:string)=> (<SelectItem value={item}>{item}</SelectItem>))
                }
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3 ">
            <h1 className="text-2xl ">Publication Year</h1>
            <div className="max-w-xl">
              <Slider
                defaultValue={[1937]}
                max={2023}
                min={1800}
                step={1}
                onValueChange={(value) => handleSlider(value)}
              />
            </div>
            <div>From 1800 To 2023</div>
          </div>
        </div>
        <div className="col-span-9 grid grid-cols-4 gap-10 pb-20">
          <div className="col-span-full space-y-5">
            <h1 className='text-xl font-semibold'>Search anything you looking for.</h1>
            <div className='flex gap-5'>
              <Input 
              placeholder='Example : La misarable' 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
              />
            </div>
          </div>
          <div className="col-span-9 grid grid-cols-4 gap-10 pb-20">
            {productsData?.map((book:IBook) => (
              <ProductCard book={book} />
            ))}
            <div className="rounded-2xl h-[480px] flex flex-col items-center justify-center p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
                <Link to='/add-new-book'>
                  <Button className='p-10' variant="outline">Add New</Button>
                </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
