import OptionTemplate from "./OptionTemplate";
import remove from "../../../assets/imgs/admin/remove.png";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { deleteWarning } from "../../config/helperFunctions";
import { useNavigate, useOutletContext } from "react-router-dom";
import { deleteObject, ref } from "firebase/storage";

function DeleteArticle() {
  const [
    showModal,
    setShowModal,
    categoryID,
    setCategoryID,
    itemIndex,
    setItemIndex,
  ] = useOutletContext();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [bluePrint, setBluePrint] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);

  const saveChangesHandler = (e) => {
    //If user click cancel we return
    if (!deleteWarning()) return;

    //Deleting items from the base when users click SaveChanges button
    deletedItems.forEach(async (item) => {
      const itemDoc = doc(db, item.categoryID, item.id);
      await deleteDoc(itemDoc);
    });
    // Deleting imgs from the base when users click SaveChanges button
    deletedItems.forEach(async (item) => {
      const imgRef = ref(storage, `${item.categoryID}/${item.id}`);
      await deleteObject(imgRef);
    });

    //Setting new bluePrint
    const databaseRef = doc(db, categoryID, "arrayPositionBlueprint");

    setDoc(databaseRef, { dataBaseBleprint: bluePrint });

    navigate(-1);
  };

  const deleteHandler = async (e) => {
    const itemIndex = e.target.id;

    let deletedItem;

    const newArr = category.filter((ele) => {
      if (ele.itemName === category[itemIndex].itemName) deletedItem = ele;

      return ele.itemName !== category[itemIndex].itemName;
    });

    setDeletedItems((prev) => [...prev, deletedItem]);
    setCategory(newArr);
    setBluePrint(newArr.map((ele) => ele.itemName));
  };

  const menuHandler = async (e) => {
    const data = await getDocs(collection(db, e));

    const setDataFilter = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      categoryID: e,
    }));

    setCategoryID(setDataFilter[0].categoryID);
    setCategory(setDataFilter);
  };

  const colon = (
    <div>
      <ul className="w-[25rem] border-[0.1rem] rounded-md">
        {
          //Maping over blueprint and changing each of name with an object from the category.
          // bluePrint
          //   .map((itemName, index) => {
          //     return category.filter((ele) => ele?.itemName === itemName);
          //   })
          category.map((item, i) => {
            if (item.length < 1) return;
            //If item is blueprint, we return back because it would create empty element
            if (item?.dataBaseBleprint) return;
            return (
              <div key={item?.id + Math.random() * 8} className="relative">
                <li className="py-[0.5rem] pl-[1.2rem] border-b-[1px] text-[1rem]">
                  {item?.itemName}
                </li>
                <button
                  onClick={deleteHandler}
                  className="w-[2rem] absolute bottom-0 top-0 right-[-3.2rem] cursor-pointer active:scale-90 ease-in-out duration-300"
                >
                  <img src={remove} alt="add icon" id={i} />
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
      title={"Brisanje"}
      menuHandler={menuHandler}
      colon={colon}
      saveChangesHandler={saveChangesHandler}
    />
  );
}

export default DeleteArticle;
