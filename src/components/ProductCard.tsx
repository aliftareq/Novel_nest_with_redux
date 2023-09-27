import { IBook } from '@/types/globalTypes';
import { toast } from './ui/use-toast';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

interface IProps {
  book: IBook;
}

export default function ProductCard({ book }: IProps) {
  const handleAddProduct = (book: IBook) => {
    toast({
      description: 'Product Added',
    });
  };
  return (
    <div>
      <div className="rounded-2xl h-[480px] flex flex-col items-start justify-between p-5 overflow-hidden shadow-md border border-gray-100 hover:shadow-2xl hover:scale-[102%] transition-all gap-2">
        <Link to={`/product-details/${book._id}`} className="w-full">
          <img className='h-36 w-40' src={book?.Image} alt="product" />
          <h1 className="text-xl font-semibold">{book?.Title}</h1>
        </Link>
        <p>Author: {book?.Author}</p>
        <p>Genre: {book?.Genre}</p>
        {/* <p className="text-sm">
          Availability: 
          <span className={`font-semibold ${book?.Availability ? 'text-green-500' : 'text-red-500'}`}>
          {book?.Availability ? ' In stock' : ' Out of stock'}
          </span>
        </p> */}
        <p className="text-sm">Publication Date: {book?.PublicationDate}</p>
        <Button variant="default" onClick={() => handleAddProduct(book)}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}
