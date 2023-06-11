import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Navbar } from "./components/Navbar";
import { SignOut   } from "./pages/SignOut";
import { UserDataProvider } from "./context/userContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "signout",
        element: <SignOut />,
        children: [{ index: true, element: <Home /> }],
      },
    ],
  },
]);
function App() {
  return (
    <UserDataProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </UserDataProvider>
  );
}

export default App;
