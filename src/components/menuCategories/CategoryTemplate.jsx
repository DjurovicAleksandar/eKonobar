import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { db } from "../config/firebase";
import coffee from "../../assets/imgs/user/coffee.png";
import back from "../../assets/imgs/user/back.png";
import cokeBanner from "../../assets/imgs/banners/cocaColaBanner.png";
import DescriptionModal from "../helperComponents/DescriptionModal";

function CategoryTemplate({ category }) {
  const navigate = useNavigate();
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
  ] = useOutletContext();

  const [drinksCategory, setDrinksCategory] = useState([]);
  const [bluePrint, setBluePrint] = useState([]);
  const [itemInList, setItemInList] = useState({});
  const [modalItem, setModalItem] = useState({});

  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  //Add item to the shopping list
  const addItemShoppingList = (item) => {
    //pushing new item into shopping list
    setShoppingList((prev) => [
      ...prev,
      {
        itemName: item[0]?.itemName,
        itemPrice: item[0]?.itemPrice,
      },
    ]);

    //saving list to the storage
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  };

  //Get drinks from data base
  const getDrinks = async () => {
    const data = await getDocs(collection(db, category));

    const setDataFilter = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setBluePrint(
      setDataFilter.filter((item) => item?.dataBaseBleprint)[0].dataBaseBleprint
    );

    setDrinksCategory(setDataFilter);
  };

  useEffect(() => {
    getDrinks();

    checked &&
      selectedPositionOptions.value === "everypage" &&
      selectedTypeOptions.value === "popupBanner" &&
      setShowPopUp(true);
  }, []);

  useEffect(() => {
    setItemInList(
      shoppingList.reduce((acc, item) => {
        if (acc[item.itemName]) {
          acc[item.itemName]++;
        } else {
          acc[item.itemName] = 1;
        }
        return acc;
      }, {})
    );
  }, [shoppingList]);

  return (
    <div className="">
      <div className="menuContainer p-4 max-w-[35rem] mx-auto">
        <div
          className="flex flex-col items-center pt-12 relative"
          style={{
            height:
              checked && selectedTypeOptions.value === "staticBanner"
                ? "43rem"
                : "48rem",
          }}
        >
          <div className="drinks__layer absolute bottom-[0] w-full h-[2.5rem] rounded-lg blur-xs">
            &nbsp;
          </div>
          <h2 className="text-center text-[2rem] font-light mb-3">
            Odab<span className="text-yellowCol">e</span>rite vrstu pića
          </h2>
          {showDescriptionModal && (
            <DescriptionModal
              showDescriptionModal={showDescriptionModal}
              setShowDescriptionModal={setShowDescriptionModal}
              modalItem={modalItem}
              addItemShoppingList={addItemShoppingList}
            />
          )}
          <ul className="w-[31rem] h-[44rem] overflow-y-auto overflow-x-hidden p-4">
            {
              //Maping over blueprint and changing each of name with an object from the category.
              bluePrint
                .map((itemName) => {
                  return drinksCategory.filter(
                    (ele) => ele.itemName === itemName
                  );
                })
                .map((item, i) => {
                  if (item.length < 1) return;
                  //If item is blueprint, we return back because it would create empty element
                  if (item[0]?.dataBaseBleprint) return;

                  return (
                    <li
                      key={item[0]?.id + i}
                      className="flex items-center gap-2 h-[4rem] mb-5 text-[1.5rem]"
                    >
                      <div
                        onClick={(e) => {
                          setModalItem(item);
                          // setModalItem(item[0]?.itemDescription);
                          setShowDescriptionModal(true);
                        }}
                        className="flex w-[30rem] items-center border-[1px] rounded-lg"
                      >
                        <img
                          className="w-[4rem] h-[4rem] mr-2"
                          src={coffee}
                          alt={item[0]?.ItemName}
                        />
                        <div className="w-[15rem]">
                          <h3 className="text-[1.2rem]">{item[0]?.itemName}</h3>
                          <p className="text-[0.9rem] mr-3">
                            {item[0]?.itemDescription.slice(0, 50)}.
                          </p>
                        </div>
                        <p className="text-[1.4rem]">
                          {(+item[0]?.itemPrice).toFixed(2)}KM
                        </p>
                      </div>
                      <div className="relative">
                        <button
                          onClick={(e) => addItemShoppingList(item)}
                          className="ml-1 w-[2rem] h-[4rem] bg-white text-black cursor-pointer hover:scale-110 active:scale-90 rounded-md"
                        >
                          +
                        </button>
                        {
                          <p className="absolute top-[-0.5rem] left-[-0.5rem] bg-yellowCol text-black font-bold rounded-full px-[0.5rem] text-base">
                            {itemInList[item[0]?.itemName]}
                          </p>
                        }
                      </div>
                    </li>
                  );
                })
            }
          </ul>
        </div>

        <div className="flex items-center justify-around mt-6">
          <div className="relative">
            <button
              onClick={() => setShowShopingList(true)}
              className="w-[13rem] bg-white text-base text-black h-[3rem] px-[1.2rem] py-[0.8rem] mb-[1.2rem] rounded-md text-[1.5rem] hover:scale-110 active:scale-90 ease-in-out duration-300 cursor-pointer"
              style={{
                marginTop:
                  selectedTypeOptions.value === "staticBanner"
                    ? "0.1rem"
                    : "0rem",
              }}
            >
              Pogledaj listu
            </button>
            {shoppingList.length > 0 ? (
              <p className="bg-yellowCol text-black rounded-full  px-3 py-1 absolute top-[-1rem] right-[-1rem] shadow-md font-bold">
                {shoppingList.length}
              </p>
            ) : null}
          </div>
        </div>
        {checked &&
          selectedPositionOptions.value === "everypage" &&
          selectedTypeOptions.value === "staticBanner" && (
            <div className="banner bg-red-200 absolute bottom-0 mx-auto left-0 right-0">
              <img className="w-full" src={cokeBanner} />
            </div>
          )}
      </div>
    </div>
  );
}

export default CategoryTemplate;
