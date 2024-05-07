import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./components/Root";
import Info from "./pages/Info";

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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
