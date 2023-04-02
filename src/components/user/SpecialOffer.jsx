import { Link, useNavigate } from "react-router-dom";
import coffee from "../../assets/imgs/user/coffee.png";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { deleteWarning } from "../config/helperFunctions";

function SpecialOffer({ btn, btnDel }) {
  const navigate = useNavigate();

  const [soloItem, setSoloItem] = useState({});
  const [comboItemOne, setComboItemOne] = useState({});
  const [comboItemTwo, setComboItemTwo] = useState({});
  const [itemComboPrice, setItemComboPrice] = useState({});

  const getItems = async () => {
    const data = await getDocs(collection(db, "specialOfferItems"));

    const setDataFilter = data.docs.map((doc) => ({
      ...doc.data(),
    }));

    setDataFilter.forEach((col) => {
      col.id === "ComboItemNumber1" && setComboItemOne(col);
      col.id === "ComboItemNumber2" && setComboItemTwo(col);
      col.id === "comboPrice" && setItemComboPrice(col);
      col.id === "soloSpecialItem" && setSoloItem(col);
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="menuContainer p-4 max-w-[35rem] mx-auto">
      <div className="flex flex-col items-center pt-12 relative">
        <h2 className="font-light text-[2rem] text-center mb-20">
          Sup
          <span className="text-yellowCol">e</span>r ponuda
        </h2>
        <div className="h-[42rem]">
          <h2 className="font-medium text-[1.4rem] text-center mb-10">
            Svakim radnim danom od 08:00 do 12:00
          </h2>
          <ul className="w-[30rem]">
            <li>
              <div className="mb-5 text-[1.5rem] flex justify-center gap-3">
                {/* Div for items */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-[27rem] flex items-center justify-between border-[1px] rounded-lg p-2">
                    <img
                      className="w-[4rem] h-[4rem] mr-2"
                      src={coffee}
                      alt="ime"
                    />
                    {}
                    <div className="w-[15rem]">
                      <h3 className="text-[1.2rem]">{comboItemOne.itemName}</h3>
                      <p className="text-[0.9rem] mr-3">
                        {comboItemOne?.itemDescription}
                      </p>
                    </div>
                    <p className="text-[1.4rem]">{comboItemOne?.itemPrice}KM</p>
                  </div>
                  <div className="flex w-[27rem] items-center justify-between border-[1px] rounded-lg p-2">
                    <img
                      className="w-[4rem] h-[4rem] mr-2"
                      src={coffee}
                      alt="ime"
                    />
                    <div className="w-[15rem]">
                      <h3 className="text-[1.2rem]">{comboItemTwo.itemName}</h3>
                      <p className="text-[0.9rem] mr-3">
                        {" "}
                        {comboItemTwo?.itemDescription}
                      </p>
                    </div>
                    <p className="text-[1.4rem]">
                      {" "}
                      {comboItemTwo?.itemPrice}KM
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={(e) => {}}
                    className="ml-1 w-[2rem] h-full bg-white text-black cursor-pointer hover:scale-110 active:scale-90 ease-in-out duration-300  rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <Link to="/updatemenuoptions">{btn}</Link>
                {btnDel && (
                  <button
                    onClick={async (e) => {
                      if (!deleteWarning()) return;

                      const itemOneDoc = doc(
                        db,
                        "specialOfferItems",
                        "ComboItemNumber1"
                      );
                      const itemTwoDoc = doc(
                        db,
                        "specialOfferItems",
                        "ComboItemNumber2"
                      );
                      const comboPrice = doc(
                        db,
                        "specialOfferItems",
                        "comboPrice"
                      );

                      await deleteDoc(itemOneDoc);
                      await deleteDoc(itemTwoDoc);
                      await deleteDoc(comboPrice);

                      navigate(-1, { replace: true });
                    }}
                    className=" w-[10rem] py-3 bg-[#D4D3D4] text-black rounded-lg mr-6 hover:scale-110 active:scale-90 ease-in-out duration-300"
                  >
                    Obriši ponudu
                  </button>
                )}

                <p className="bg-yellowCol rounded-lg px-6 py-2 w-fit text-black flex items-center">
                  {itemComboPrice.itemPrice} KM
                </p>
              </div>
            </li>
            <li className="mt-10">
              <div className="mb-5 text-[1.5rem] flex justify-center gap-3">
                {/* Div for items */}
                <div className="flex flex-col items-center gap-3 ">
                  <div className="w-[27rem] flex items-center justify-between border-[1px] rounded-lg p-2">
                    <img
                      className="w-[4rem] h-[4rem] mr-2"
                      src={coffee}
                      alt="ime"
                    />
                    <div className="w-[15rem]">
                      <h3 className="text-[1.2rem]">{soloItem.itemName}</h3>
                      <p className="text-[0.9rem] mr-3">
                        {soloItem?.itemDescription}
                      </p>
                    </div>
                    <p className="text-[1.4rem]">{soloItem?.itemPrice}KM</p>
                  </div>
                </div>

                <div>
                  <button
                    onClick={(e) => {}}
                    className="ml-1 w-[2rem] h-full bg-white text-black cursor-pointer hover:scale-110 active:scale-90 rounded-md"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <Link to="/changeSpecialOfferSoloItem">{btn}</Link>
                {btnDel && (
                  <button
                    onClick={async (e) => {
                      if (!deleteWarning()) return;

                      const itemDoc = doc(
                        db,
                        "specialOfferItems",
                        "soloSpecialItem"
                      );
                      await deleteDoc(itemDoc);
                      navigate(-1, { replace: true });
                    }}
                    className=" w-[10rem] py-3 bg-[#D4D3D4] text-black rounded-lg mr-6 hover:scale-110 active:scale-90 ease-in-out duration-300"
                  >
                    Obriši ponudu
                  </button>
                )}
                <p className="bg-yellowCol rounded-lg px-6 py-2 w-fit text-black">
                  {soloItem?.itemSpecialPrice} KM
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SpecialOffer;
