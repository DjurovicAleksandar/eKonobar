import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItemTemplate from "./AddItemTemplate.jsx";

function AddComboItemOne() {
  const actionCon = (
    <div className="flex flex-col items-center gap-2 mb-10">
      <button
        type="submit"
        form="addSpecialOfferOneItem"
        className="w-[30rem] py-[1rem] pl-[2rem] text-[1.2rem] pr-3 rounded-lg  bg-yellowCol  mt-[3rem] text-black hover:scale-110 active:scale-90 ease-in-out duration-300"
      >
        Sledeći artikal
      </button>
    </div>
  );

  return <AddItemTemplate itemTitle={1} actionButtonCon={actionCon} />;
}

export default AddComboItemOne;
