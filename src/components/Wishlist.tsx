import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { HiOutlineTrash} from 'react-icons/hi';
import {BsCheckLg,BsCheck2All,BsBagHeartFill} from 'react-icons/bs';
import { Button } from './ui/button';
import { useAppDispatch, useAppSelector } from '@/Redux/hook';
import { toggleBookState,removeFromCart } from '@/Redux/Features/wishlist/wishListSlice';

export default function Wishlist() {
  const  {products} = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()
  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost">
          <BsBagHeartFill size="25" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-auto relative">
        <SheetHeader>
          <SheetTitle>WishList of Books</SheetTitle>
          {/* <h1>Total: {total.toFixed(2)}</h1> */}
        </SheetHeader>
        <div className="space-y-5">
          {products.map((product) => (
            <div
              className="border h-44 p-5 flex justify-between rounded-md"
              key={product.Title}
            >
              <div className="border-r pr-5 shrink-0">
                <img src={product?.Image} alt="" className="h-full" />
              </div>
              <div className="px-2 w-full flex flex-col gap-3">
                <h1 className="text-2xl self-center">{product?.Title}</h1>
              </div>
              <div className="border-l pl-5 flex flex-col justify-between">
                <Button
                  onClick={() => dispatch(toggleBookState(product))}
                  title='mark as read' 
                  className="bg-green-500 hover:bg-green-400">
                    {product?.BookState ? <BsCheck2All size="20" /> : <BsCheckLg size="20" />}
                </Button>
                <Button
                  onClick={() => dispatch(removeFromCart(product))}
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-400"
                  >
                    <HiOutlineTrash size="20" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
