import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../config/firebase";

function AddComboPrice() {
  const navigate = useNavigate();
  const [comboItemPrice, setComboItemPrice] = useState("");

  const comboPriceHandler = (e) => {
    e.preventDefault();
    const itemRef = doc(db, "specialOfferItems", "comboPrice");
    setDoc(itemRef, {
      itemPrice: Number(comboItemPrice).toFixed(2),
      id: "comboPrice",
    });

    navigate("/addspecialoffer", { replace: true });
  };

  return (
    <div className="menuContainer p-4 max-w-[35rem] mx-auto">
      <div className="flex flex-col items-center pt-12 relative">
        <h2 className="font-light text-[2rem] text-center mb-20">
          <span className="text-yellowCol">Dodaj</span> novu cijenu za
          kombinaciju super ponuda
        </h2>
        <div className="h-[35rem]">
          <form
            className="w-[30rem] mb-28"
            id="comboPrice"
            onSubmit={comboPriceHandler}
          >
            <input
              value={comboItemPrice}
              onChange={(e) => setComboItemPrice(e.target.value)}
              type="number"
              className="w-full text-center py-[1rem]  text-[1.2rem]  rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[1rem]"
              placeholder="Cijena kombinacije artikala"
            />
          </form>
          <div>
            <button
              className="w-full py-[1rem] pl-[2rem] text-[1.2rem] pr-3 rounded-lg bg-yellowCol text-black  mb-[1rem] hover:scale-110 active:scale-90 ease-in-out duration-300"
              type="submit"
              form="comboPrice"
            >
              Sačuvaj
            </button>
          </div>
        </div>

        <button
          onClick={(e) => navigate(-1)}
          className="rounded-md bg-transparent text-center py-[1rem] text-white border-[0.1rem] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[12rem] "
        >
          Nazad
        </button>
      </div>
    </div>
  );
}

export default AddComboPrice;
