import React from "react";

function DescriptionModal({
  showDescriptionModal,
  setShowDescriptionModal,
  modalItem,
  addItemShoppingList,
}) {
  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center text-[0.9rem]">
      <div className="w-[28rem] h-[16rem] rounded-3xl border-[1px] border-yellowCol bg-[#111217F2] mt-[7rem] z-50">
        <div className="p-6 pt-10 w-[90%] mx-auto">
          {/* Description */}
          <p className="leading-6 h-[5rem]">{modalItem[0]?.itemDescription}</p>

          {/* Buttons */}
          <div className="mt-8 w-full flex gap-7= justify-around">
            <button
              onClick={(e) => addItemShoppingList(modalItem)}
              className="w-[45%] border py-3 hover:scale-105 active:scale-95 ease-in-out duration-300 bg-white text-black rounded-md"
            >
              Dodaj na listu
            </button>
            <button
              onClick={(e) => setShowDescriptionModal(false)}
              className="w-[45%] border py-3 hover:scale-105 active:scale-95 ease-in-out duration-300 rounded-md"
            >
              Zatvori
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptionModal;
