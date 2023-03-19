import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import AdminLogin from "../administrator/AdminLogin";
import AdminPage from "../administrator/AdminPage";
import AddArticle from "../administrator/options/AddArticle";
import DeleteArticle from "../administrator/options/DeleteArticle";
import ChangePrice from "../administrator/options/ChangePrice";
import DetailsChange from "../administrator/options/DetailsChange";
import Advertising from "../administrator/options/Advertising";
import Home from "../Home";
import Navigation from "../navigation-footer/Navigation";
import ArticleDescription from "../administrator/options/ArticleDescription";

import FoodPanel from "../user/FoodPanel";
import DrinksPanel from "../user/DrinksPanel";
import SpecialOffer from "../user/SpecialOffer";

import CarbonatedDrinks from "../menuCategories/carbonatedDrinks";
import HotDrinks from "../menuCategories/HotDrinks";

import Modal from "../helperComponents/Modal";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";

const Root = () => {
  const location = useLocation();
  const loginLocation = location.pathname === "/caffe-login";

  //modal control
  const [showModal, setShowModal] = useState(false);
  //saving name of the collection in database for a modal window
  const [categoryID, setCategoryID] = useState("");

  //index of clicked item, purpose - saves position of clicked item and when making a blueprin of menu
  //position, with slice method it inesert element on wanted position
  const [itemIndex, setItemIndex] = useState(0);

  //banner switch states for chekced-unchecked
  const [checked, setChecked] = useState(false);

  //State for selected option
  const [selectedPositionOptions, setSelectedPositionOptions] = useState({});
  const [selectedTypeOptions, setSelectedTypeOptions] = useState({});

  useEffect(() => {
    onSnapshot(collection(db, "config"), (data) => {
      const dataFilter = data.docs.map((doc) => ({
        ...doc.data(),
      }));

      setSelectedPositionOptions(dataFilter[0].positionState);
      setSelectedTypeOptions(dataFilter[1].bannerType);
      setChecked(dataFilter[2].checked);
    });
  }, [checked]);

  return (
    <>
      {showModal && (
        <Modal
          categoryID={categoryID}
          showModal={showModal}
          setShowModal={setShowModal}
          itemIndex={itemIndex}
        />
      )}
      {!loginLocation && <Navigation />}
      <Outlet
        context={[
          showModal,
          setShowModal,
          categoryID,
          setCategoryID,
          itemIndex,
          setItemIndex,
          checked,
          setChecked,
          selectedPositionOptions,
          setSelectedPositionOptions,
          selectedTypeOptions,
          setSelectedTypeOptions,
        ]}
      />
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
