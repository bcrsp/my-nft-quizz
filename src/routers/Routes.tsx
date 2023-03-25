
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";

import { Home } from "../components/pages/Home"; //"@components/pages/Home";
import { Quizz } from "../components/pages/Quizz";//"@components/pages/Quizz";
import { Layout } from "../components/UI/layout/Layout";//"@components/UI/layout/Layout";
import { getAccountId } from "../redux/account/selectors";//"@redux/account/selectors";
import { useSelector } from "react-redux";

export const Routes = () => {
  const accountId = useSelector(getAccountId);

  const authorizedRoutes = (
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/quizz" element={<Quizz />} />
      </Route>
    </>
  );

  const publicRoutes = (
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </>
  );

  const router = createBrowserRouter(
    createRoutesFromElements(accountId ? authorizedRoutes : publicRoutes)
  );

  return <RouterProvider router={router} />;
};
