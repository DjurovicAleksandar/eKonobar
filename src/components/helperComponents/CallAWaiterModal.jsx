import { useEffect } from "react";
import popUpSound from "../../../public/popUpSound.wav";

function CallAWaiterModal({ showWaiterModal, setShowWaiterModal }) {
  const audio = new Audio(popUpSound);

  useEffect(() => {
    audio.play();
  }, []);
  return (
    <div className="w-full h-full modalListBg fixed flex items-center justify-center z-50 ">
      <div className="w-[20rem] h-[30rem] rounded-md shadow-xl bg-black p-2 relative flex flex-col items-center justify-center">
        <button
          onClick={(e) => setShowWaiterModal(false)}
          className="border-black bg-white text-black px-4 py-2 rounded-full hover:scale-110 active:scale-90 ease-in-out duration-300 absolute top-[-1rem] right-[-1rem]"
        >
          X
        </button>
        <h1 className="text-2xl text-center font-bold text-yellowCol border p-4 rounded-md">
          Sto broj 1<br /> poziva konobara!
        </h1>
      </div>
    </div>
  );
}

export default CallAWaiterModal;
