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
    <div className="w-full h-screen flex flex-col justify-between items-center pb-12">
      <div>
        <img src={logo} />
      </div>
      <div className="h-[300px]">
        <p className="text-[55px] font-light">
          W<span className="text-[#FCDF07]">E</span>LCOME
        </p>
        <div className="w-full bg-transparent h-1 rounded-full">
          <div
            className="h-full bg-[#FCDF07] rounded-full"
            style={{ width: `${barProgress}%` }}
          />
        </div>
      </div>
      <p className="">©EKONOBAR 2023</p>
    </div>
  );
}

export default Loading;
