import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import HomePage from '../components/HomePage';
import ProductForm from '../components/ProductForm';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage/>,
      },
      {
        path: "/products/new",
        element: <ProductForm/>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
        // element: <LoginFormModal />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
        // element: <SignupFormModal />,
      },
    ],
  },
]);
