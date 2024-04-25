import { createBrowserRouter } from 'react-router-dom';
// import LoginFormPage from '../components/LoginFormPage';
// import SignupFormPage from '../components/SignupFormPage';
import LoginFormModal from '../components/LoginFormModal';
import SignupFormModal from '../components/SignupFormModal';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome!</h1>,
      },
      {
        path: "login",
        // element: <LoginFormPage />,
        element: <LoginFormModal />,
      },
      {
        path: "signup",
        // element: <SignupFormPage />,
        element: <SignupFormModal />,
      },
    ],
  },
]);
