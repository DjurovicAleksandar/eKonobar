import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import coffee from "../../assets/imgs/user/coffee.png";
import back from "../../assets/imgs/user/back.png";

function HotDrinks() {
  const [hotDrinks, setHotDrinks] = useState([]);

  const getDrinks = async (e) => {
    const data = await getDocs(collection(db, "hotdrinks"));

    const setDataFilter = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    setHotDrinks(setDataFilter);
  };

  useEffect(() => {
    getDrinks();
  }, []);

  return (
    <div className="h-full flex flex-col justify-between">
      <div className=" h-[450px] pt-12">
        <h2 className="text-center text-[20px] font-light mb-3">
          Odab<span className="text-yellowCol">e</span>rite vrstu pića
        </h2>
        <ul className="w-[320px] h-[350px] overflow-y-auto p-4">
          {hotDrinks.map((item, index) => {
            return (
              <li
                key={item.id}
                className="flex justify-between gap-2 h-[65px] mb-2 text-[15px]"
              >
                <div className="flex w-[300px] items-center">
                  <img
                    className="w-[40px] mr-2"
                    src={coffee}
                    alt={item.ItemName}
                  />
                  <div>
                    <h3 className="text-[12px]">{item.itemName}</h3>
                    <p className="text-[9px] mr-3">{item.itemDescription}</p>
                  </div>
                  <p className="text-[14px]">{item?.itemPrice.toFixed(2)}KM</p>
                </div>
                <button className="ml-1 w-[20px]  bg-white text-black cursor-pointer hover:scale-110 active:scale-90">
                  +
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="buttonBack hover:scale-110 active:scale-90 cursor-pointer">
        <Link to="/">
          <img src={back} className="w-5" alt="arrowBack" />
          <span className="text-[15px]"> Nazad</span>
        </Link>
      </button>
    </div>
  );
}

export default HotDrinks;
