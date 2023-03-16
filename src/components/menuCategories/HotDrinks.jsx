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
    <div className="">
      <div className=" h-[600px] pt-24">
        <h2 className="text-center text-[23px] font-light mb-5">
          Odab<span className="text-yellowCol">e</span>rite vrstu pića
        </h2>
        <ul className="w-[350px] h-[400px] overflow-y-auto p-4">
          {hotDrinks.map((item, index) => {
            return (
              <li
                key={item.id}
                className="flex justify-between gap-2 h-[65px] mb-2"
              >
                <div className="flex w-[300px] items-center">
                  <img
                    className="w-[60px] mr-2"
                    src={coffee}
                    alt={item.ItemName}
                  />
                  <div>
                    <h3 className="text-[12px]">{item.itemName}</h3>
                    <p className="text-[10px]">{item.itemDescription}</p>
                  </div>
                  <p className="text-[14px]">{item?.itemPrice.toFixed(2)}KM</p>
                </div>
                <button className="ml-1 w-[20px] bg-white text-black cursor-pointer hover:scale-110 active:scale-90">
                  +
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="buttonBack hover:scale-110 active:scale-90 cursor-pointer">
        <Link to="/">
          <img src={back} alt="arrowBack" />
          <span className="text-[21px]"> Nazad</span>
        </Link>
      </button>
    </div>
  );
}

export default HotDrinks;
