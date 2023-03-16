import add from "../../../assets/imgs/admin/add.png";
import OptionTemplate from "./OptionTemplate";
import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

function AddArticle() {
  const [category, setCategory] = useState([]);

  const menuHandler = async (e) => {
    const data = await getDocs(collection(db, e));

    const setDataFilter = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
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
              <button className="w-[2rem] absolute bottom-0 top-0 right-[-2.6rem] cursor-pointer active:scale-90 ease-in-out duration-300">
                <img src={add} alt="add icon" />
              </button>
            </div>
          );
        })}
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