import { useState } from "react";
import { db, storage } from "../config/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { ref, uploadBytes } from "firebase/storage";

function Modal({ showModal, setShowModal, categoryID, itemIndex }) {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemShortDescription, setItemShortDescription] = useState("");

  //image
  const [imageUpload, setImageUpload] = useState(null);
  //Image upload
  const uploadImage = async (category, imageName) => {
    if (imageUpload == null) return;
    const imgRef = ref(storage, `${category}/${imageName}`);
    await uploadBytes(imgRef, imageUpload);
  };

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
      itemShortDescription: itemShortDescription,
      itemDescription: itemDescription,
    });

    //pushing a copy of daabase new array position
    const databaseRef = doc(db, categoryID, "arrayPositionBlueprint");
    const bluePrint = setDataFilter
      .filter((item) => !item.dataBaseBleprint)
      .map(({ itemName }) => itemName);

    setDoc(databaseRef, { dataBaseBleprint: bluePrint });

    // Pushing items to real database
    const itemRef = doc(db, categoryID, itemName);
    setDoc(itemRef, {
      itemName: itemName,
      itemPrice: Number(itemPrice),
      itemShortDescription: itemShortDescription,
      itemDescription: itemDescription,
    });

    uploadImage(categoryID, itemName);

    setShowModal(false);
  };
  return (
    <div className="w-full h-full modalBg fixed flex items-center justify-center z-50 ">
      <div className="border-[0.1rem] border-yellowCol w-[30rem] h-[50rem] rounded-2xl  shadow-xl bg-[#111217] text-white relative flex flex-col items-center pt-20">
        <button
          onClick={(e) => setShowModal(false)}
          className="border-black bg-white text-black px-4 py-2 rounded-full hover:scale-110 active:scale-90 ease-in-out duration-300 absolute top-[0.4rem] right-[0.3rem]"
        >
          X
        </button>

        <form
          onSubmit={addNewItem}
          id="modal_form"
          className="text-white flex flex-col gap-2 w-[24rem]"
        >
          <input
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full py-[0.9rem]  px-10 text-[1.4rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[0.8rem]"
            placeholder="Naziv artikla"
            type="text"
            required
          />
          <input
            value={itemShortDescription}
            onChange={(e) => setItemShortDescription(e.target.value)}
            className="w-full py-[0.9rem]  px-10 text-[1.4rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[0.8rem]"
            placeholder="Kratki opis artikla ( 25 max )"
            maxLength={25}
            type="text"
            required
          />
          <textarea
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            className="resize-none h-[12rem] w-full py-[0.9rem]  px-10 text-[1.4rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[0.8rem]"
            placeholder="Duži opis artikla"
            type="text"
            required
          />
          <input
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            className="w-full py-[0.9rem]  px-10 text-[1.4rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[0.8rem]"
            placeholder="Cijena artikla"
            type="number"
            required
          />
          <div className="flex flex-col items-center">
            <button className="rounded-md bg-white text-center py-[0.9rem] text-black  ease-in-out duration-300 active:scale-90 cursor-pointer w-[24rem]">
              <label htmlFor="add__file"> Dodajte sliku artikla</label>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setImageUpload(e.target.files[0]);
                }}
                required
                id="add__file"
                type="file"
                className="hidden"
              />
            </button>
            <p className="text-xs underline text-yellowCol font-medium w-[25rem] text-center mt-1">
              Sliku je moguće dodati samo iz baze fotografija e-konobar servisa
              ukoliko želite dodati vlastite fotografije kontaktirajte podršku.
            </p>
          </div>
        </form>
        {/* <div className="flex flex-col w-full items-center gap-10 mt-8"> */}
        <button
          type="submit"
          form="modal_form"
          className="rounded-md bg-yellowCol text-center py-[0.9rem] text-black ease-in-out duration-300 active:scale-90 cursor-pointer w-[24rem]  mt-12"
        >
          Sačuvaj artikal
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}

export default Modal;
