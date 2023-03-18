import logo from "../assets/imgs/logo.png";

import { useEffect, useState } from "react";

function Loading() {
  const [barProgress, setBarProgress] = useState(0);

  useEffect(() => {
    const barInterval = setInterval(() => {
      setBarProgress((prev) => (prev += 1));
    }, 30);

    return () => clearInterval(barInterval);
  }, []);

  return (
    <div className="w-full flex flex-col gap-24 items-center  py-12">
      <div>
        <img src={logo} />
      </div>
      <div className="h-[29rem] mt-8">
        <p className="text-[5rem] font-light">
          W<span className="text-[#FCDF07]">E</span>LCOME
        </p>
        <div className="w-full bg-transparent h-1 rounded-full">
          <div
            className="h-full bg-[#FCDF07] rounded-full"
            style={{ width: `${barProgress}%` }}
          />
        </div>
      </div>
      <p className="text-[1rem]">©EKONOBAR 2023</p>
    </div>
  );
}

export default Loading;
