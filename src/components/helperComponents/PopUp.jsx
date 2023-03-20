import cokePopUpBanner from "../../assets/imgs/banners/cokePopUpBanner.jpg";

function PopUp({ setShowPopUp, showPopUp }) {
  return (
    <div className="w-full h-full modalListBg fixed flex items-center justify-center z-50 ">
      <div className="w-[20rem] h-[30rem] rounded-md shadow-xl bg-black p-2 relative">
        <button
          onClick={(e) => setShowPopUp(false)}
          className="border-black bg-white text-black px-4 py-2 rounded-full hover:scale-110 active:scale-90 ease-in-out duration-300 absolute top-[-1rem] right-[-1rem]"
        >
          X
        </button>
        <img
          className="w-full h-full"
          src={cokePopUpBanner}
          alt="Coca Cola Bane"
        />
      </div>
    </div>
  );
}

export default PopUp;
