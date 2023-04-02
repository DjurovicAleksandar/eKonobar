import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddItemTemplate from "./AddItemTemplate.jsx";

function AddComboItemTwo() {
  const navigate = useNavigate();

  const actionCon = (
    <div className="flex justify-center gap-5 w-full my-10">
      <button
        onClick={() => navigate(-1)}
        className="w-[15rem] px-6 py-3 text-[1.2rem] rounded-lg  bg-yellowCol  text-black hover:scale-110 active:scale-90 ease-in-out duration-300"
      >
        {" "}
        Prethodni artikl
      </button>
      <button
        type="submit"
        form="addSpecialOfferOneItem"
        className="w-[11rem] px-6 py-3 text-[1.2rem] rounded-lg  bg-yellowCol  text-black hover:scale-110 active:scale-90 ease-in-out duration-300"
      >
        Sledeći korak
      </button>
    </div>
  );

  return <AddItemTemplate itemTitle={2} actionButtonCon={actionCon} />;
}

export default AddComboItemTwo;
