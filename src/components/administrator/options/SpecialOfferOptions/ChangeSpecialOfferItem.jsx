import React from "react";
import SpecialOffer from "../../../user/SpecialOffer";

function ChangeSpecialOfferItem() {
  const btn = (
    <button className="w-[9rem] py-3 bg-[#D4D3D4] text-black rounded-lg mr-6 hover:scale-110 active:scale-90 ease-in-out duration-300">
      Izmjeni
    </button>
  );
  return <SpecialOffer btn={btn} />;
}

export default ChangeSpecialOfferItem;
