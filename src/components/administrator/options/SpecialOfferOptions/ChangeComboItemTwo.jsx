import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../config/firebase";
import AddItemTemplate from "./AddItemTemplate";

function ChangeComboItemTwo() {
  const navigate = useNavigate();
  const [item, setItem] = useState([]);

  const actionCon = (
    <div className="flex justify-center gap-5 w-full my-14">
      <button
        type="submit"
        form="addSpecialOfferOneItem"
        className="w-[30rem] px-6 py-3 text-[1.2rem] rounded-lg  bg-yellowCol  text-black hover:scale-110 active:scale-90 ease-in-out duration-300"
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
      itemTitle={2}
      item={item[1]}
      actionButtonCon={actionCon}
    />
  );
}

export default ChangeComboItemTwo;
