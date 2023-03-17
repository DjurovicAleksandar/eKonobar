import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import OptionTemplate from "./OptionTemplate";

function DetailsChange() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);

  const menuHandler = async (e) => {
    const data = await getDocs(collection(db, e));

    const setDataFilter = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      categoryID: e,
    }));

    setCategory(setDataFilter);
  };

  const descriptionChangeHandler = (e) => {
    const itemIndex = e.target.id;

    navigate("/editing-description", {
      state: { item: category[itemIndex] },
    });
  };

  const colon = (
    <div className="w-[96%] p-1">
      <div className="flex  flex-col">
        <div className="w-full flex justify-between gap-3">
          {/*Drink name*/}
          <div className="w-[55%] h-full border-[0.1rem] rounded-t-lg rounded-b-lg flex flex-col gap-1">
            {category.map((item, i) => {
              return (
                <div key={item.id}>
                  <div className="py-[0.3rem] pl-[1.2rem] text-[1rem]  border-b-[0.1rem] h-[2.5rem]">
                    {item.itemName}
                  </div>
                </div>
              );
            })}
          </div>
          {/*Button*/}
          <div className="flex flex-col justify-between">
            {category.map((item, i) => {
              return (
                <button
                  id={i}
                  key={item.id}
                  onClick={descriptionChangeHandler}
                  className="h-[2.5rem] text-[#100F15] bg-white font-medium text-[0.8rem]  py-3 px-3  shadow-md rounded flex items-center justify-center cursor-pointer active:scale-90 hover:scale-110 ease-in-out duration-300"
                >
                  Izmjena detalja artikla
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <OptionTemplate title={"Izmjena"} menuHandler={menuHandler} colon={colon} />
  );
}

export default DetailsChange;
