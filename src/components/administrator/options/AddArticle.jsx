import add from "../../../assets/imgs/admin/add.png";
import OptionTemplate from "./OptionTemplate";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import { useOutletContext } from "react-router-dom";

function AddArticle() {
  const [
    showModal,
    setShowModal,
    categoryID,
    setCategoryID,
    itemIndex,
    setItemIndex,
  ] = useOutletContext();
  const [category, setCategory] = useState([]);
  const [bluePrint, setBluePrint] = useState([]);

  const menuHandler = async (e) => {
    onSnapshot(collection(db, e), (data) => {
      const setDataFilter = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        categoryID: e,
      }));

      setBluePrint(
        setDataFilter.filter((item) => item?.dataBaseBleprint)[0]
          .dataBaseBleprint
      );

      setCategoryID(setDataFilter[0].categoryID);
      setCategory(setDataFilter);
    });
  };

  const colon = (
    <div>
      <ul className="w-[25rem] border-[0.1rem] rounded-md">
        {
          //Maping over blueprint and changing each of name with an object from the category.
          bluePrint
            .map((itemName, index) => {
              return category.filter((ele) => ele.itemName === itemName);
            })
            .map((item, i) => {
              if (item.length < 1) return;
              //If item is blueprint, we return back because it would create empty element
              if (item[0]?.dataBaseBleprint) return;
              return (
                <div key={item[0]?.id} className="relative">
                  <li className="py-[0.5rem] pl-[1.2rem] border-b-[1px] text-[1rem] ">
                    {item[0]?.itemName}
                  </li>
                  <button
                    onClick={(e) => {
                      setShowModal(true);
                      setItemIndex(i);
                    }}
                    className="w-[2rem] absolute bottom-0 top-0 right-[-3.2rem] cursor-pointer active:scale-90 ease-in-out duration-300"
                  >
                    <img src={add} alt="add icon" />
                  </button>
                </div>
              );
            })
        }
      </ul>
    </div>
  );

  return (
    <OptionTemplate
      title={"Dodavanje"}
      menuHandler={menuHandler}
      colon={colon}
    />
  );
}

export default AddArticle;
