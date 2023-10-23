import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routes from './routes/routes.tsx';
import { Provider } from 'react-redux';
import store from './Redux/store.ts';
import  { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider  store={store}>
      <div><Toaster/></div>
      <RouterProvider router={routes} />
    </Provider>
  </React.StrictMode>
);
