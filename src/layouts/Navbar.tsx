import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { HiOutlineSearch } from 'react-icons/hi';
import Wishlist from '../components/Wishlist';
import { useAppDispatch, useAppSelector } from '@/Redux/hook';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setUser } from '@/Redux/Features/user/userSlice';

export default function Navbar() {
  const dispatch = useAppDispatch()

  const  {products} = useAppSelector(state => state.cart)
  const  {user} = useAppSelector(state => state.user)

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(setUser(null))
    })
  }
  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto">
          <Link to='/'>
          <div>
            <h3 className='text-xl text-green-400 font-bold'>NOVEL_NEST</h3>
          </div>
          </Link>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/products">All Books</Link>
                </Button>
              </li>
              {
                !user.email ?
                <>
                  <li>
                <Button variant="link" asChild>
                  <Link to="/login">Sign-In</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/signup">Sign-up</Link>
                </Button>
              </li>
                </>
                :
                <>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/add-new-book">Add New Book</Link>
                    </Button>
                  </li>
                  <li>
                    <Button onClick={handleLogout} variant="outline" asChild>
                      <Link to="/">LogOut</Link>
                    </Button>
                  </li>
                </>
              }
              <li>
                <Button variant="ghost">
                  <HiOutlineSearch size="25" />
                </Button>
              </li>
              <li>
                <div className="relative inline-block">
                  <div className="text-black w-14 h-14 rounded-full flex items-center justify-center">
                    <Wishlist />
                  </div>
                  <span className="absolute top-0 right-0 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center">
                    {products?.length}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
