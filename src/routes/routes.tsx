import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Books from '@/pages/Books';
import Checkout from '@/pages/Checkout';
import Signup from '@/pages/Signup';
import BooksDetails from '@/pages/BookDetails';
import PrivateRoute from './privateRoutes';

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
          <PrivateRoute><Checkout /></PrivateRoute>
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
