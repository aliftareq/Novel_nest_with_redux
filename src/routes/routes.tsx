import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Books from '@/pages/Books';
import Signup from '@/pages/Signup';
import BooksDetails from '@/pages/BookDetails';
import PrivateRoute from './privateRoutes';
import AddNewBook from '@/pages/AddNewBook';
import EditBook from '@/pages/EditBook';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/products',
        element: <Books />,
      },
      {
        path: '/product-details/:id',
        element: <BooksDetails />,
      },
      {
        path: '/add-new-book',
        element: (
          <PrivateRoute><AddNewBook/></PrivateRoute>
          )
      },
      {
        path: '/edit-book/:id',
        element: (
          <PrivateRoute><EditBook/></PrivateRoute>
          )
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routes;
