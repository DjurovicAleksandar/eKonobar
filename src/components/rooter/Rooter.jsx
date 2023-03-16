import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  useLocation,
} from "react-router-dom";
import AdminLogin from "../administrator/AdminLogin";
import AdminPage from "../administrator/AdminPage";
import AddArticle from "../administrator/options/AddArticle";
import DeleteArticle from "../administrator/options/DeleteArticle";
import ChangePrice from "../administrator/options/ChangePrice";
import DetailsChange from "../administrator/options/DetailsChange";
import Advertising from "../administrator/options/Advertising";
import Home from "../Home";
import Footer from "../navigation-footer/Footer";
import Navigation from "../navigation-footer/Navigation";
import ArticleDescription from "../administrator/options/ArticleDescription";

import FoodPanel from "../user/FoodPanel";
import DrinksPanel from "../user/DrinksPanel";
import SpecialOffer from "../user/SpecialOffer";

import CarbonatedDrinks from "../menuCategories/carbonatedDrinks";
import HotDrinks from "../menuCategories/HotDrinks";

const Root = () => {
  const location = useLocation();
  const loginLocation = location.pathname === "/caffe-login";
  return (
    <>
      {!loginLocation && <Navigation />}
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="/caffe-login" element={<AdminLogin />} />
      <Route path="/administrator-page" element={<AdminPage />} />
      <Route path="/add-item" element={<AddArticle />} />
      <Route path="/delete-item" element={<DeleteArticle />} />
      <Route path="/change-price" element={<ChangePrice />} />
      <Route path="/change-details" element={<DetailsChange />} />
      <Route path="/editing-description" element={<ArticleDescription />} />
      <Route path="/advertising" element={<Advertising />} />
      <Route path="/food" element={<FoodPanel />} />
      <Route path="/drinks" element={<DrinksPanel />} />
      <Route path="/special-offer" element={<SpecialOffer />} />
      <Route path="/hotdrinks" element={<HotDrinks />} />
      <Route path="/carbonateddrinks" element={<CarbonatedDrinks />} />
    </Route>
  )
);

export default router;
