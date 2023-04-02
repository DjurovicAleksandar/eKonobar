import AddItemTemplate from "./AddItemTemplate";
import { Link } from "react-router-dom";

function AddOneItem() {
  const actionCon = (
    <div>
      <button
        className="w-[30rem] py-[1rem] pl-[2rem] text-[1.2rem] pr-3 rounded-lg  bg-yellowCol mb-[3rem] mt-[3rem] text-black hover:scale-110 active:scale-90 ease-in-out duration-300"
        type="submit"
        form="addSpecialOfferOneItem"
      >
        Sačuvaj artikal superponude
      </button>
    </div>
  );
  return <AddItemTemplate actionButtonCon={actionCon} />;
}

export default AddOneItem;
