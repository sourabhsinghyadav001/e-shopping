import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
