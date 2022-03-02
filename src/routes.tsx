import { Suspense, lazy } from "react";
import MainLayout from "./components/layouts/MainLayout";
import Loader from "./components/Loader";

const SuspenseLoading = (Component: any) => (props: any) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );

const Products = SuspenseLoading(lazy(() => import("./pages/Products")));
const ShoppingCart = SuspenseLoading(lazy(() => import("./pages/ShoppingCart")));

const routes = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Products /> },
      { path: "/cart", element: <ShoppingCart /> },
    ],
  },
];

export default routes;
