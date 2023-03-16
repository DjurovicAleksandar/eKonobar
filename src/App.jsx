import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  useLocation,
  RouterProvider,
} from "react-router-dom";

import AdminLogin from "./components/administrator/AdminLogin";
import AdminPage from "./components/administrator/AdminPage";
import AddArticle from "./components/administrator/options/AddArticle";
import DeleteArticle from "./components/administrator/options/DeleteArticle";
import ChangePrice from "./components/administrator/options/ChangePrice";
import DetailsChange from "./components/administrator/options/DetailsChange";
import Advertising from "./components/administrator/options/Advertising";
import ArticleDescription from "./components/administrator/options/ArticleDescription";
import Home from "./components/Home";
import Footer from "./components/navigation-footer/Footer";
import Navigation from "./components/navigation-footer/Navigation";

import { useEffect, useState } from "react";

import Loading from "./components/Loading";

import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db, auth } from "./components/config/firebase";

function App() {
  const [error, setError] = useState("");
  //Drink categories////////////////////////////////////////////////////////////////////////////////////////////////////
  const [hotDrinks, setHotDrinks] = useState([]);
  const [nonAcloholicBeverages, setNonAcloholicBeverages] = useState([]);
  const [beer, setBeer] = useState([]);
  const [wine, setWine] = useState([]);
  const [spirits, setSpirits] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const [snacksAndAppetizers, setSnacksAndAppertizers] = useState([]);
  const [deserts, setDeserts] = useState([]);
  const [menu, setMenu] = useState([]);

  //Necessary collection from the firebase, for the application

  const [isLoading, setIsLoading] = useState(true);

  //////////////////////////////////////////ROUTER/////////////////////////////

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
        <Route path="/administrator-page" element={<AdminPage menu={menu} />} />
        <Route path="/add-item" element={<AddArticle menu={menu} />} />
        <Route path="/delete-item" element={<DeleteArticle menu={menu} />} />
        <Route path="/change-price" element={<ChangePrice menu={menu} />} />
        <Route path="/change-details" element={<DetailsChange menu={menu} />} />
        <Route path="/editing-description" element={<ArticleDescription />} />
        <Route path="/advertising" element={<Advertising />} />
      </Route>
    )
  );

  useEffect(() => {
    const setDataFilter = (data) => {
      return data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    };
    //Setting databes//////////////////////////
    (async () => {
      try {
        //   const hotDrinksData = await getDocs(collection(db, "hotdrinks"));
        //   setHotDrinks(setDataFilter(hotDrinksData));
        //   const beerData = await getDocs(collection(db, "beer"));
        //   setBeer(setDataFilter(beerData));
        //   const wineData = await getDocs(collection(db, "wine"));
        //   setWine(setDataFilter(wineData));
        //   const desertsData = await getDocs(collection(db, "deserts"));
        //   setDeserts(setDataFilter(desertsData));
        //   const spiritsData = await getDocs(collection(db, "spirits"));
        //   setSpirits(setDataFilter(spiritsData));
        //   const snacksAndAppetizersData = await getDocs(
        //     collection(db, "snacksAndAppetizers")
        //   );
        //   setSnacksAndAppertizers(setDataFilter(snacksAndAppetizersData));
        //   const cocktailsData = await getDocs(collection(db, "cocktails"));
        //   setCocktails(setDataFilter(cocktailsData));
        //   const nonAcloholicBeveragesData = await getDocs(
        //     collection(db, "nonAlcoholicBeverages")
        //   );
        //   setNonAcloholicBeverages(setDataFilter(nonAcloholicBeveragesData));
        //   setMenu([
        //     hotDrinks,
        //     nonAcloholicBeverages,
        //     beer,
        //     wine,
        //     spirits,
        //     cocktails,
        //     snacksAndAppetizers,
        //     deserts,
        //   ]);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    })();

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="App w-full h-screen flex flex-col justify-between items-center pb-12">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
