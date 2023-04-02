import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../../../config/firebase";

function AddItemTemplate({ itemTitle, actionButtonCon, pageTitle, item }) {
  const navigate = useNavigate("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemSpecialPrice, setItemSpecialPrice] = useState("");

  const submitItem = (e) => {
    e.preventDefault();

    const dtItemName = itemTitle
      ? `ComboItemNumber${itemTitle}`
      : "soloSpecialItem";

    const itemRef = doc(db, "specialOfferItems", dtItemName);
    setDoc(itemRef, {
      itemName: itemName,
      itemPrice: Number(itemPrice).toFixed(2),
      itemSpecialPrice: Number(itemSpecialPrice).toFixed(2),
      itemDescription: itemDescription,
      itemShortDescription: itemDescription.slice(0, 25),
      id: dtItemName,
    });

    // //For update page navigations
    // item?.id === "ComboItemNumber1" && navigate("/updateComboItemTwo");
    // item?.id === "ComboItemNumber2" && navigate("/addComboPrice");
    // // item?.id === "soloSpecialItem" && navigate(-1);

    //for add page navigations
    !itemTitle && navigate(-1);
    !item && itemTitle == 1 && navigate("/addComboItemTwo");
    !item && itemTitle == 2 && navigate("/addComboPrice");
  };

  console.log(item);

  return (
    <div className="menuContainer">
      <div className="flex flex-col items-center">
        <div className="h-[42rem] flex flex-col items-center justify-between">
          <h2 className="font-light text-[1.9rem] text-center w-4/5 my-5">
            {pageTitle === "Izmjena" ? (
              <span className="text-yellowCol">Izmjena </span>
            ) : (
              <span className="text-yellowCol">Dodaj </span>
            )}
            {pageTitle === "Izmjena" ? (
              <span>artikala </span>
            ) : (
              <span>novi artikal </span>
            )}
            super ponuda
          </h2>
          <form
            onSubmit={submitItem}
            id="addSpecialOfferOneItem"
            className="w-[30rem]"
          >
            <input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
              type="text"
              placeholder={
                item
                  ? item.itemName
                  : `Naziv artikla ${itemTitle ? `broj ${itemTitle}` : ""}`
              }
              maxLength={50}
              className=" w-full py-[1rem] pl-[2rem] text-[1.2rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[1rem]"
            />
            <textarea
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              required
              placeholder={item ? item.itemDescription : "Opis artikla"}
              className="resize-none h-[8rem] overflow-y-auto  w-full py-[1rem] pl-[2rem] text-[1.2rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[1rem]"
            />
            <input
              value={itemPrice}
              onChange={(e) => setItemPrice(e.target.value)}
              type="number"
              placeholder={item ? `${item.itemPrice} KM` : "Cijena artikla"}
              required
              className=" w-full py-[1rem] pl-[2rem] text-[1.2rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[1rem]"
            />
            <input
              value={itemSpecialPrice}
              onChange={(e) => setItemSpecialPrice(e.target.value)}
              type="number"
              placeholder={
                item
                  ? `${item.itemSpecialPrice} KM`
                  : "Cijena artikla u super ponudi"
              }
              required
              className=" w-full py-[1rem] pl-[2rem] text-[1.2rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[1rem]"
            />
          </form>
          <div className="flex flex-col items-center text-center ">
            <button className="w-[30rem] py-[1rem] pl-[2rem] text-[1.2rem] pr-3 rounded-lg  bg-white mb-[1rem] mt-[1.5rem] text-black">
              Dodajte sliku artikla
            </button>
            <p className="text-yellowCol font-medium text-xs w-4/5 underline">
              Sliku je moguće dodati samo iz baze fotografija e-konobar servisa
              ukoliko želite dodati vlastite fotografije kontaktirajte podršku.
            </p>
          </div>
          {actionButtonCon}
          <div>
            {/* <button
              onClick={(e) => navigate(-1)}
              className="rounded-md bg-transparent text-center py-[1rem] text-white border-[0.1rem] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[12rem] "
            >
              Nazad
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddItemTemplate;
