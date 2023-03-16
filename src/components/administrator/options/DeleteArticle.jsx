import OptionTemplate from "./OptionTemplate";
import remove from "../../../assets/imgs/admin/remove.png";
import { useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { deleteWarning } from "../../config/helperFunctions";
import { useNavigate } from "react-router-dom";

function DeleteArticle() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [deletedItems, setDeletedItems] = useState([]);

  const saveChangesHandler = (e) => {
    if (!deleteWarning()) return;

    deletedItems.forEach(async (item) => {
      console.log(item);
      const itemDoc = doc(db, item.categoryID, item.id);
      await deleteDoc(itemDoc);
    });

    navigate(-1);
  };

  const deleteHandler = async (e) => {
    const itemIndex = e.target.id;
    let deletedItem;

    const newArr = category.filter((e) => {
      if (e !== category[itemIndex]) {
        deletedItem = category[itemIndex];
      }
      return e !== category[itemIndex];
    });

    setDeletedItems((prev) => [...prev, deletedItem]);

    setCategory(newArr);
  };

  const menuHandler = async (e) => {
    const data = await getDocs(collection(db, e));

    const setDataFilter = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      categoryID: e,
    }));

    setCategory(setDataFilter);
  };

  const colon = (
    <div className="">
      <ul className="w-[15.5rem] border-[1px] rounded-md">
        {category.map((item, i) => {
          return (
            <div key={item.id} className="relative">
              <li className="py-[0.5rem] pl-[1.2rem] border-b-[1px] text-[13px] ">
                {item.itemName}
              </li>
              <button
                onClick={deleteHandler}
                className="w-[2rem] absolute bottom-0 top-0 right-[-2.6rem] cursor-pointer active:scale-90 ease-in-out duration-300"
              >
                <img src={remove} alt="add icon" id={i} />
              </button>
            </div>
          );
        })}
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
