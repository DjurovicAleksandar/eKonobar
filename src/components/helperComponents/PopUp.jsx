import cokePopUpBanner from "../../assets/imgs/banners/cokePopUpBanner.png";

function PopUp({ setShowPopUp, showPopUp }) {
  return (
    <div className="w-full h-full modalListBg fixed flex items-center justify-center z-50 ">
      <div className="w-[28rem] h-[40rem] rounded-md shadow-xl p-2 relative">
        <button
          onClick={(e) => setShowPopUp(false)}
          className="absolute top-[2rem] right-[2rem] flex items-center gap-3 hover:scale-110 active:scale-90 ease-in-out duration-200 "
        >
          <span className="bg-[#ffffff]/80 text-black px-4 py-2 rounded-full ">
            X
          </span>
          <span>Zatvori</span>
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
