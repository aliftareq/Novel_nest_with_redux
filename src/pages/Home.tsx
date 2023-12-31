import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Footer from '@/layouts/Footer';
import { IBook } from '@/types/globalTypes';
import ProductCard from '@/components/ProductCard';
import { useGetBooksQuery } from '@/Redux/Features/Books/BookApi';

export default function Home() {
  const {data} = useGetBooksQuery('')
  const newdata = data?.data?.slice(-10).reverse()
  return (
    <>
      {/* 1st part  */}
      <div className="flex justify-between items-center h-[calc(100vh-80px)] max-w-7xl mx-auto ">
        <div>
          <h1 className="text-6xl font-black text-primary mb-2">
            Welcome to <br /> Novel-Nest
          </h1>
          <p className="text-secondary font-semibold text-xl">
            Get your desired book  with just a click.
          </p>
          <div className="text-primary mt-20">
            <p>Where every book is a new beginning, and every reader is an explorer of worlds untold.</p>
            <p>Find your next adventure with us.</p>
          </div>
          <Button className="mt-5">Learn more</Button>
        </div>
        <div className="relative -right-14">
          <img src='https://img.freepik.com/free-vector/flat-social-media-cover-template-world-book-day-celebration_23-2150201450.jpg' alt="" />
        </div>
      </div>
      <div className="mx-24">
        <h1 className="text-5xl font-black text-primary uppercase my-16 text-center">
            Let's get lost in the realm of books
        </h1>
        <div className="col-span-9 grid grid-cols-5 gap-10 pb-20">
          {newdata?.map((book:IBook) => (
            <ProductCard book={book} />
          ))}
        </div>
        <div className="flex flex-col items-center justify-center">
          <Button className="mb-16" asChild>
            <Link to="/products">Browse all books</Link>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
