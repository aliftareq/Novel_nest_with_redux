import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { HiOutlineSearch } from 'react-icons/hi';
import Cart from '../components/Cart';
import { useAppDispatch, useAppSelector } from '@/Redux/hook';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { setUser } from '@/Redux/Features/user/userSlice';

export default function Navbar() {
  const dispatch = useAppDispatch()

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
                      <Link to="/checkout">Add a book</Link>
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
                <Cart />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
