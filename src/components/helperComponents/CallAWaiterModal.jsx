import { useEffect } from "react";
import popUpSound from "../../assets/sounds/popUpSound.wav";

function CallAWaiterModal({ showWaiterModal, setShowWaiterModal }) {
  const audio = new Audio(popUpSound);

  useEffect(() => {
    audio.play();
  }, []);
  return (
    <div className="w-full h-full modalListBg fixed flex items-center justify-center z-50 ">
      <div className="flex flex-col items-center justify-center w-[30rem] h-[30rem] rounded-md shadow-xl bg-[#D9D9D9] p-2 relative">
        <h2 className="text-black font-semibold text-[1.7rem] mt-[40%]">
          POZIVA KONOBARA
        </h2>
        <button
          className="mt-[30%] bg-yellowCol text-black px-14 py-2 shadow-lg text-base rouned-md hover:scale-110 active:scale-90 ease-in-out duration-300"
          onClick={(e) => setShowWaiterModal(false)}
        >
          Prihvati
        </button>

        <div
          className="flex items-center justify-center font-bold text-[1.6rem] text-black
        w-[20rem] h-[20rem] bg-yellowCol shadow-lg rounded-full hover:scale-110 active:scale-90 ease-in-out duration-300 absolute top-[-10rem] right-15"
        >
          <div className="relative">
            <h4 className="absolute top-5 w-full text-center">STO BROJ</h4>
            <h2 className="text-[10rem]">14</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CallAWaiterModal;
