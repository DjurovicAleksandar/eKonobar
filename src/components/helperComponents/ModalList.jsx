import { useEffect, useState } from "react";

function ModalList({
  shoppingList,
  setShoppingList,
  showShopingList,
  setShowShopingList,
}) {
  return (
    <div className="w-full h-full modalListBg fixed flex items-center justify-center z-50 ">
      <div className="w-[30rem] h-[42rem] rounded-xl  shadow-xl bg-[#D9D9D9] text-[#09080D] flex flex-col p-4 justify-between relative">
        <h2 className="text-center font-light text-[2rem] mt-[3rem]">
          Lista odabranih artikala
        </h2>
        <button
          onClick={(e) => setShowShopingList(false)}
          className="shadow-xl bg-[#0A090F80]/50 text-[#D9D9D9] px-4 py-2 rounded-full hover:scale-110 active:scale-90 ease-in-out duration-300 absolute top-[1rem] right-[1rem]"
        >
          X
        </button>

        <ul className="h-[25rem] overflow-y-auto overflow-x-hidden">
          {
            //Using reduce on shopping list to put all the same items into one object, with it count
            shoppingList
              .reduce((acc, item, index) => {
                const itemExists = acc.find(
                  (ele) => ele.itemName === item.itemName
                );

                if (itemExists) {
                  const itemIndex = acc.indexOf(itemExists);

                  acc[itemIndex].itemPrice += +item.itemPrice;
                  acc[itemIndex].itemCount += 1;
                } else acc.push({ ...item, itemCount: 1 });

                return acc;
              }, [])
              .map((item, index) => {
                return (
                  <li className="relative w-full" key={item.itemName + index}>
                    <div className="flex justify-between border border-black p-5 mb-3 rounded-lg w-[90%]">
                      <div className="w-[2.5rem]">Slika</div>
                      <p className="w-[10rem]">{item.itemName}</p>
                      <p className="w-[5rem]">{item.itemCount} kom</p>
                      <p className="w-[5rem]">
                        {+item.itemPrice.toFixed(2)} KM
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        //Index of clicked item
                        const itemClicked = shoppingList.find(
                          (ele) => ele.itemName === item.itemName
                        );

                        //setting shopping list - removing clicked item using filter method
                        setShoppingList((prev) => {
                          let alereadyRemoved = false;
                          const newShoppingList = prev.filter((element) => {
                            //if clicked item matches with the first occurances of the
                            //element and if alreadyRemoved is set to false, it will remove item by
                            //retuning false, and for all subsequent items wil return true vith alreadyRemoved set to true
                            if (
                              !alereadyRemoved &&
                              element.itemName === itemClicked.itemName
                            ) {
                              alereadyRemoved = true;
                              return false;
                            } else {
                              return true;
                            }
                          });
                          return newShoppingList;
                        });
                        //saving list to the storage
                        localStorage.setItem(
                          "shoppingList",
                          JSON.stringify(shoppingList)
                        );
                      }}
                      className="bg-[#414141]/50 text-white font-bold text-xl p-5 absolute top-0 right-[-0.5rem] rounded-lg hover:scale-110 active:scale-90 ease-in-out duration-300"
                    >
                      -
                    </button>
                  </li>
                );
              })
          }
        </ul>
        <div className="w-fit relative text-right pr-4 self-end">
          <div className="bg-yellowCol h-full w-[0.55rem] right-0 absolute">
            &nbsp;
          </div>
          <p>Ukupno:</p>
          <h2 className="font-bold text-2xl">
            {shoppingList
              .reduce((acc, item) => acc + +item.itemPrice, 0)
              .toFixed(2)}
            KM
          </h2>
          <small className="text-[0.7rem]">U cijenu je uključen pdv</small>
        </div>
      </div>
    </div>
  );
}

export default ModalList;
