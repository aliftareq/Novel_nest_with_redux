import { useGetBooksQuery } from '@/Redux/Features/Books/BookApi';
import ProductCard from '@/components/ProductCard';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { IBook } from '@/types/globalTypes';
export default function Products() {

  const {data} = useGetBooksQuery(undefined)
  //! Dummy Data

  const status = true;
  const PublicationYear = 2023;

  //! **

  const handleSlider = (value: number[]) => {
    console.log(value);
  };

  const productsData = data?.data;

  // if (status) {
  //   productsData = data?.data?.filter(
  //     (item:IBook) => item.Availability === true 
  //   );
  // }  else {
  //   productsData = data?.data;
  // }

  return (
    <div className="grid grid-cols-12 max-w-7xl mx-auto relative ">
      <div className="col-span-3 z mr-10 space-y-5 border rounded-2xl border-gray-200/80 p-5 self-start sticky top-16 h-[calc(100vh-80px)]">
        <div>
          <h1 className="text-2xl ">Availability</h1>
          <div className="flex items-center space-x-2 mt-3">
            <Switch id="in-stock" />
            <Label htmlFor="in-stock">In stock</Label>
          </div>
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
          <div>From 1800 To {PublicationYear}</div>
        </div>
      </div>
      <div className="col-span-9 grid grid-cols-4 gap-10 pb-20">
        {productsData?.map((book:IBook) => (
          <ProductCard book={book} />
        ))}
      </div>
    </div>
  );
}
