import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { warningHandler } from "../../config/helperFunctions";
import OptionTemplate from "./OptionTemplate";

function ChangePrice() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [updatedItems, setUpdatedItems] = useState([]);

  const menuHandler = async (e) => {
    const data = await getDocs(collection(db, e));

    const setDataFilter = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
      categoryID: e,
    }));

    //Setting two arrays
    setCategory(setDataFilter);
    //Using map becasue of the same object reference
    setUpdatedItems(setDataFilter.map((item) => ({ ...item })));
  };

  const updatePrice = async () => {
    //Warning handler
    if (!warningHandler()) return;

    //Filtering different prices from updatetAray
    const filtered = updatedItems.filter(
      (e, i) => e.itemPrice !== category[i].itemPrice
    );

    //Looping over array to update prices in the database
    filtered.forEach(async (item) => {
      try {
        const dataDoc = doc(db, item.categoryID, item.id);
        await updateDoc(dataDoc, {
          itemPrice: +item.itemPrice,
        });

        menuHandler(item.categoryID);
        document.getElementById("change-price-form").reset();
      } catch (err) {
        console.error(err);
      }
    });
  };

  const colon = (
    <div className="w-[96%] p-1">
      <div className="flex  flex-col">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updatePrice();
          }}
          id="change-price-form"
          className=" h-[30px] "
        >
          {category.map((item, i) => {
            const roundClass =
              i === 0
                ? "border-[1px] rounded-t-lg border-b-0 grow"
                : i === category.length - 1
                ? "border-[1px] rounded-b-lg grow"
                : "border-[1px] border-b-0 grow";

            return (
              <div key={i} className="w-full  h-full flex gap-3">
                <div className={roundClass}>
                  <div className="py-[0.5rem] pl-[1.2rem] h-full text-[10px] hover:scale-110 ease-in duration-500 hover:shadow-xl ">
                    {item.itemName}
                  </div>
                </div>

                <div className="w-[18%] h-full  mr-4">
                  <p className="text-[10px]  py-[0.5rem] pl-[1.2rem]">
                    <span className="price">
                      {Number(item?.itemPrice).toFixed(2)}
                    </span>
                    <span className="currency">KM</span>
                  </p>
                </div>
                <div className="w-[18%] h-full">
                  <div className={roundClass}>
                    <input
                      id={item.itemName}
                      onChange={(e) => {
                        const price = Number(e.target?.value);
                        updatedItems[i].itemPrice = price.toFixed(2);
                      }}
                      className="w-full h-[30px] py-[0.5rem] pl-[0.55rem] bg-transparent text-[13px]"
                      type="number"
                      step="any"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </form>
      </div>
    </div>
  );

  return (
    <OptionTemplate
      title={"Promjena"}
      menuHandler={menuHandler}
      colon={colon}
    />
  );
}

export default ChangePrice;
