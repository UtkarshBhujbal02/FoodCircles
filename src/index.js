import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "../src/components/Header";
import Body from "../src/components/Body";
import Footer from "../src/components/Footer";
import Error from "../src/components/Error";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Contact from "../src/components/Contact";
import RestaurantMenu from "../src/components/RestaurantMenu";
import Profile from "../src/components/ProfileClass";
import { Provider } from "react-redux";
import store from "./utils/store";
import Cart from "./components/Cart";

const About = lazy(() => import("../src/components/About"));

const AppLayout = () => {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading...</h1>} >
            <About />
          </Suspense>
        ),
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
