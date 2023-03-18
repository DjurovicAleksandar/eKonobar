import { useState } from "react";
import { db } from "../config/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Modal({ showModal, setShowModal, categoryID, itemIndex }) {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const addNewItem = async (e) => {
    e.preventDefault();

    //geting database for a copy of array positions of it
    const data = await getDocs(collection(db, categoryID));

    const setDataFilter = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      categoryID: e,
    }));

    //setting array position via index
    setDataFilter.splice(itemIndex + +1, 0, {
      itemName: itemName,
      itemPrice: itemPrice,
      itemDescription: itemDescription,
    });

    //pushing a copy of daabase new array position

    const databaseRef = doc(db, categoryID, "arrayPositionBlueprint");
    const bluePrint = setDataFilter.map(({ itemName }) => itemName);

    setDoc(databaseRef, { dataBaseBleprint: bluePrint });

    // Pushing items to real database
    const itemRef = doc(db, categoryID, itemName);
    setDoc(itemRef, {
      itemName: itemName,
      itemPrice: itemPrice,
      itemDescription: itemDescription,
    });

    setShowModal(false);
  };
  return (
    <div className="w-full h-full modalBg fixed flex items-center justify-center z-50 ">
      <div className="w-[30rem] h-[40rem] rounded-md  shadow-xl bg-black text-white relative flex flex-col  items-center justify-center">
        <button
          className="absolute top-0 right-0"
          onClick={() => setShowModal(false)}
        >
          Close modal
        </button>

        <form
          onSubmit={addNewItem}
          id="modal_form"
          className="text-white flex flex-col gap-2"
        >
          <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full py-[1rem] pl-[5.1rem] text-[1.4rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[2rem]"
            placeholder="Naziv artikla"
            type="text"
            required
          />
          <input
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            className="w-full py-[1rem] pl-[5.1rem] text-[1.4rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[2rem]"
            placeholder="Opis artikla"
            type="text"
            required
          />
          <input
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            className="w-full py-[1rem] pl-[5.1rem] text-[1.4rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[2rem]"
            placeholder="Cijena artikla"
            type="number"
            required
          />
        </form>
        <div className="flex w-full justify-around mt-8">
          <button
            form="modal_form"
            className="rounded-md bg-transparent text-center py-[1rem] text-white border-[0.1rem] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[12rem]"
          >
            Sačuvaj artikal
          </button>
          <button className="rounded-md bg-transparent text-center py-[1rem] text-white border-[0.1rem] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[12rem]">
            Nazad
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
