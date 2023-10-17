/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useSingleBookQuery } from '@/Redux/Features/Books/BookApi';
import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetails() {
  const { id } = useParams();

  const {data:book} = useSingleBookQuery(id)
  

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div className="w-[50%] flex items-center justify-center">
          <img className='w-[50%] h-[50%] py-3' src={book?.Image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.Title}</h1>
          <p className="text-xl">Author: {book?.Author}</p>
          <p className="text-xl">Genre: {book?.Genre}</p>
          <p className="text-xl">Publication Date: {book?.PublicationDate}</p>
          <Link to={`/edit-book/${id}`}><Button>Edit</Button></Link>
          <Button className="mx-2 bg-red-600 hover:bg-red-500">Delete</Button>
        </div>
      </div>
      <ProductReview id={id!}/>
    </>
  );
}
