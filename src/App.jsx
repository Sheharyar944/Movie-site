import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import Home from "./pages/Home";
import Info from "./pages/Info";
import Explore from "./pages/Explore";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/info/:type/:id",
          element: <Info />,
        },
        {
          path: "/explore/",
          element: <Explore />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
