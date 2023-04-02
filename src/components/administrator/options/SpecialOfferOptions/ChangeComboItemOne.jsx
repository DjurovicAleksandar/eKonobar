import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import SpecialOffer from "../../../user/SpecialOffer";
import AddItemTemplate from "./AddItemTemplate";

function ChangeComboItemOne() {
  const [item, setItem] = useState([]);
  const actionCon = (
    <div className="flex flex-col items-center gap-2 mb-8">
      <button
        type="submit"
        form="addSpecialOfferOneItem"
        className="w-[30rem] py-[1rem] pl-[2rem] text-[1.2rem] pr-3 rounded-lg  bg-yellowCol  mt-[3rem] text-black hover:scale-110 active:scale-90 ease-in-out duration-300"
      >
        Sačuvaj artikal
      </button>
    </div>
  );

  const menuHandler = async (e) => {
    const data = await getDocs(collection(db, "specialOfferItems"));

    const setDataFilter = data.docs.map((doc) => ({
      ...doc.data(),
    }));

    setItem(setDataFilter);
  };

  useEffect(() => {
    menuHandler();
  }, []);
  return (
    <AddItemTemplate
      pageTitle="Izmjena"
      itemTitle={1}
      item={item[0]}
      actionButtonCon={actionCon}
    />
  );
}

export default ChangeComboItemOne;
