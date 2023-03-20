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

import HotDrinks from "../menuCategories/Drink/HotDrinks";
import CarbonatedDrinks from "../menuCategories/Drink/CarbonatedDrinks.jsx";

import Modal from "../helperComponents/Modal";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import SoftDrinks from "../menuCategories/Drink/SoftDrinks";
import NaturalJuices from "../menuCategories/Drink/NaturalJuices";
import Spirits from "../menuCategories/Drink/Spirits";
import Cocktails from "../menuCategories/Drink/Cocktails";
import Energy from "../menuCategories/Drink/Energy";

import ModalList from "../helperComponents/ModalList";
import PopUp from "../helperComponents/PopUp";
import CallAWaiterModal from "../helperComponents/CallAWaiterModal";

const Root = () => {
  const location = useLocation();
  const loginLocation = location.pathname === "/caffe-login";

  //administartor page add items modal control
  const [showModal, setShowModal] = useState(false);
  //saving name of the collection in database for a modal window
  const [categoryID, setCategoryID] = useState("");

  //index of clicked item, purpose - saves position of clicked item and when making a blueprin of menu
  //position, with slice method it inesert element on wanted position
  const [itemIndex, setItemIndex] = useState(0);

  //States for banner switch control on off
  const [checked, setChecked] = useState(false);

  //States for call a waiter modal
  const [showWaiterModal, setShowWaiterModal] = useState(false);

  //State for selected option
  const [selectedPositionOptions, setSelectedPositionOptions] = useState({});
  const [selectedTypeOptions, setSelectedTypeOptions] = useState({});

  //banner popup
  const [showPopUp, setShowPopUp] = useState(false);

  //temporary list of saved items, that resets when user leaves application. List is save in localStorage
  const [shoppingList, setShoppingList] = useState([]);
  const [showShopingList, setShowShopingList] = useState(false);

  //With use effect, we register state changes that affecting banner position on the screen, and if switch for banner showing is checked or not
  useEffect(() => {
    onSnapshot(collection(db, "config"), (data) => {
      const dataFilter = data.docs.map((doc) => ({
        ...doc.data(),
      }));

      setSelectedPositionOptions(dataFilter[0].positionState);
      setSelectedTypeOptions(dataFilter[1].bannerType);
      setChecked(dataFilter[2].checked);
    });
  }, []);

  useEffect(() => {
    //Geting shoping list from the local storage if there is one.
    //It;s saved so we can acces it throughout whole application
    const shopingListObj =
      JSON.parse(localStorage.getItem("shoppingList")) || [];
    if (shopingListObj) {
      setShoppingList(shopingListObj);
    }

    //Function to clear list when user leaves application
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {showWaiterModal && (
        <CallAWaiterModal
          showWaiterModal={showWaiterModal}
          setShowWaiterModal={setShowWaiterModal}
        />
      )}
      {showPopUp && <PopUp showPopUp={showPopUp} setShowPopUp={setShowPopUp} />}
      {showModal && (
        <Modal
          categoryID={categoryID}
          showModal={showModal}
          setShowModal={setShowModal}
          itemIndex={itemIndex}
        />
      )}
      {showShopingList && (
        <ModalList
          shoppingList={shoppingList}
          setShoppingList={setShoppingList}
          showShopingList={showShopingList}
          setShowShopingList={setShowShopingList}
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
          showShopingList,
          setShowShopingList,
          shoppingList,
          setShoppingList,
          showPopUp,
          setShowPopUp,
          showWaiterModal,
          setShowWaiterModal,
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
      <Route path="/softdrinks" element={<SoftDrinks />} />
      <Route path="/naturaljuices" element={<NaturalJuices />} />
      <Route path="/spirits" element={<Spirits />} />
      <Route path="/cocktails" element={<Cocktails />} />
      <Route path="/energydrinks" element={<Energy />} />
    </Route>
  )
);

export default router;
