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
    <div className="menuContainer p-4">
      <div className=" h-[45rem] flex flex-col items-center mb-10 pt-12">
        <h2 className="text-center text-[2rem] font-light mb-3">
          Odab<span className="text-yellowCol">e</span>rite vrstu pića
        </h2>
        <ul className="w-[30rem] h-[35rem] overflow-y-auto p-4">
          {hotDrinks.map((item, index) => {
            return (
              <li
                key={item.id}
                className="flex justify-between gap-2 h-[6.5rem] mb-2 text-[1.5rem]"
              >
                <div className="flex w-[30rem] items-center">
                  <img
                    className="w-[4rem] mr-2"
                    src={coffee}
                    alt={item.ItemName}
                  />
                  <div>
                    <h3 className="text-[1.2rem]">{item.itemName}</h3>
                    <p className="text-[0.9rem] mr-3">{item.itemDescription}</p>
                  </div>
                  <p className="text-[1.4rem]">{item?.itemPrice}KM</p>
                </div>
                <button className="ml-1 w-[2rem]  bg-white text-black cursor-pointer hover:scale-110 active:scale-90">
                  +
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="buttonBack hover:scale-110 active:scale-90 cursor-pointer mb-12">
        <Link to="/">
          <img src={back} className="w-[2rem]" alt="arrowBack" />
          <span className="text-[1.5rem]"> Nazad</span>
        </Link>
      </button>
      <div className="text-center text-[0.7rem] w-full p-4">
        <Link to="/">
          <p className="">©EKONOBAR 2023</p>{" "}
        </Link>
      </div>
    </div>
  );
}

export default HotDrinks;
