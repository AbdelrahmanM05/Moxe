import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Movies from "./Components/Movies/Movies";
import Tvshow from "./Components/Tvshow/Tvshow";
import People from "./Components/People/People";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Notfound from "./Components/NotFound/Notfound";
import ProtectRoutes from "./Components/ProtectRoutes/ProtectRoutes";
import MediaDetails from "./Components/MediaDetails/MediaDetails";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    let encodedToken = localStorage.getItem("userToken");
    let decodeToken = jwtDecode(encodedToken);
    setUserData(decodeToken);
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout userData={userData} setUserData={setUserData} />,
      children: [
        {
          index: true,
          element: (
            <ProtectRoutes>
              <Home />
            </ProtectRoutes>
          ),
        },
        {
          path: "movies",
          element: (
            <ProtectRoutes>
              <Movies />
            </ProtectRoutes>
          ),
        },
        {
          path: "media-details/:id/:mediaType",
          element: (
            <ProtectRoutes>
              <MediaDetails />
            </ProtectRoutes>
          ),
        },
        {
          path: "tvshow",
          element: (
            <ProtectRoutes>
              <Tvshow />
            </ProtectRoutes>
          ),
        },
        {
          path: "people",
          element: (
            <ProtectRoutes>
              <People />
            </ProtectRoutes>
          ),
        },
        {
          path: "login",
          element: <Login saveUserData={saveUserData} />,
        },
        {
          path: "register",
          element: (
              <Register />
          ),
        },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
