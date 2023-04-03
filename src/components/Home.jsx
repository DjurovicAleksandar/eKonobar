import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import LanguageMenu from "./LanguageMenu";
import back from "../assets/imgs/user/back.png";
import cokeBanner from "../assets/imgs/banners/cocaColaBanner.png";

function Home() {
  const [
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
    selectedTimeoutOptions,
    setSelectedTimeoutOptions,
  ] = useOutletContext();
  const [language, setLanguage] = useState(true);

  const backToLanguageSelect = () => {
    setLanguage(true);
  };

  const languageChange = (lng) => {
    setLanguage(false);
    //Saving language preference to a local storage
    localStorage.setItem(
      "language",
      JSON.stringify({
        language: lng.value,
        languageBoolean: false,
      })
    );
  };

  const options = [
    ["Piće", "/drinks"],
    ["Hrana", "/food"],
    ["Specijalna ponuda", "/special-offer"],
  ];

  useEffect(() => {
    const languageObj = JSON.parse(localStorage.getItem("language")) || true;

    setLanguage(languageObj.languageBoolean || languageObj);
  }, []);

  useEffect(() => {
    if (!language) {
      checked &&
        selectedTypeOptions.value === "popupBanner" &&
        setShowPopUp(true);

      //Timeout option for popUpBanner
      setTimeout(() => setShowPopUp(false), selectedTimeoutOptions.value);
    }
  }, [language]);

  return (
    <div>
      {!language ? (
        <LanguageMenu languageChange={languageChange} />
      ) : (
        <>
          <div className="menuContainer p-4">
            <div
              className="h-[40rem] flex flex-col items-center justify-center"
              style={{
                marginBottom:
                  (!checked && "6.5rem") ||
                  (selectedTypeOptions.value === "popupBanner" && "6.5rem"),
              }}
            >
              <h2 className="font-light text-[2.3rem] text-center mb-3">
                M<span className="text-yellowCol">e</span>nu
              </h2>
              <ul className="w-[30rem] text-center">
                {options.map(([option, path], index) => {
                  return (
                    <Link to={path} key={index}>
                      <li className="w-full h-[4rem] bg-white text-[#212121] py-[0.8rem] mb-[1.2rem] rounded-md text-[1.5rem] hover:scale-110 active:scale-90 ease-in-out duration-300">
                        {option}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>

            {/* <button
              className="buttonBack hover:scale-110 active:scale-90 cursor-pointer mb-10"
              style={{
                marginTop:
                  selectedTypeOptions.value === "staticBanner" && "6rem",
              }}
              onClick={backToLanguageSelect}
            >
              <img src={back} className="w-[2rem]" alt="arrowBack" />
              <span className="text-[1.5rem]"> Nazad</span>
            </button> */}

            <div className="text-center text-[0.7rem] w-full p-4">
              {selectedTypeOptions.value !== "staticBanner" && (
                <Link to="/">
                  <p className="">©EKONOBAR 2023</p>{" "}
                </Link>
              )}
            </div>
            {checked && selectedTypeOptions.value === "staticBanner" && (
              <img
                className="absolute w-full bottom-0 left-0 banner"
                src={cokeBanner}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
