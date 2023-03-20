import { useState } from "react";
import { db } from "../config/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function ModalList({
  shoppingList,
  setShoppingList,
  showShopingList,
  setShowShopingList,
}) {
  console.log(shoppingList);
  return (
    <div className="w-full h-full modalListBg fixed flex items-center justify-center z-50 ">
      <div className="w-[25rem] h-[30rem] rounded-md  shadow-xl bg-black text-white  flex flex-col  p-6  justify-between relative">
        <button
          onClick={(e) => setShowShopingList(false)}
          className="border-black bg-white text-black px-4 py-2 rounded-full hover:scale-110 active:scale-90 ease-in-out duration-300 absolute top-[-1rem] right-[-1rem]"
        >
          X
        </button>

        <ul className="h-[25rem]">
          {shoppingList.map((item, index) => {
            return (
              <li className="flex justify-between" key={item.itemName + index}>
                <p>{item.itemName}</p>
                <p>{(+item.itemPrice).toFixed(2)} KM</p>
              </li>
            );
          })}
        </ul>
        <p className="text-right">
          Ukupno:{" "}
          {shoppingList
            .reduce((acc, item) => acc + +item.itemPrice, 0)
            .toFixed(2)}
          KM
        </p>
      </div>
    </div>
  );
}

export default ModalList;
