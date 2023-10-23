/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useDeleteBookMutation, useSingleBookQuery } from '@/Redux/Features/Books/BookApi';
import ProductReview from '@/components/ProductReview';
import { Button } from '@/components/ui/button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as Dialog from "@radix-ui/react-dialog";
import toast, { Toaster } from 'react-hot-toast';


export default function ProductDetails() {
  const { id } = useParams();

  const {data:book} = useSingleBookQuery(id)

  const navigate = useNavigate()

  //function for update book 
  const [DeleteBook, { data }] = useDeleteBookMutation();

  console.log(data);

  // adding a toast 
  if(data?.acknowledged && data.deletedCount > 0){
    toast.success('Successfully deleted this book!')
    navigate('/products')
  }

  const handleDelete = () => {
    console.log('this book has been deleted');
    DeleteBook(id)
  }
  

  return (
    <>
      <div className="flex max-w-7xl mx-auto items-center border-b border-gray-300">
        <div><Toaster/></div>
        <div className="w-[50%] flex items-center justify-center">
          <img className='w-[50%] h-[50%] py-3' src={book?.Image} alt="" />
        </div>
        <div className="w-[50%] space-y-3">
          <h1 className="text-3xl font-semibold">{book?.Title}</h1>
          <p className="text-xl">Author: {book?.Author}</p>
          <p className="text-xl">Genre: {book?.Genre}</p>
          <p className="text-xl">Publication Date: {book?.PublicationDate}</p>
          <Link to={`/edit-book/${id}`}><Button>Edit</Button></Link>
            <Dialog.Root>
              <Dialog.Trigger>
                <Button className="mx-2 bg-red-600 hover:bg-red-500">Delete</Button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className='fixed inset-0 bg-black/50'>
                <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow'>
                  <p className='text-xl font-semibold'>Are you sure you want to delete this?</p>
                  <div className='py-4'>
                    <Dialog.Close>
                      <Button onClick={handleDelete} className="mx-2 bg-red-600 hover:bg-red-500">Confirm</Button>
                    </Dialog.Close>
                    <Dialog.Close>
                      <Button className="mx-2 bg-green-600 hover:bg-green-500">Cancel</Button>
                    </Dialog.Close>
                  </div>
                </Dialog.Content>
                </Dialog.Overlay>
              </Dialog.Portal>
            </Dialog.Root>
        </div>
      </div>
      <ProductReview id={id!}/>
    </>
  );
}
