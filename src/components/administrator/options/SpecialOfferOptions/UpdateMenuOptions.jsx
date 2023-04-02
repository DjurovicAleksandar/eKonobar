import React from "react";
import { Link, useNavigate } from "react-router-dom";

function UpdateMenuOptions() {
  const navigate = useNavigate();
  const options = [
    ["Izmjeni COMBO artikal 1", "/updateComboItemOne"],
    ["Izmjeni COMBO artikal 2", "/updateComboItemTwo"],
    ["Izmjeni COMBO cijenu", "/addComboPrice"],
  ];

  return (
    <div className="menuContainer">
      <div className="flex flex-col items-center">
        <div className="h-[30rem] flex flex-col items-center justify-between">
          <h2 className="font-light text-[2rem] text-center  mt-10">
            <span className="text-yellowCol">Dodaj</span> super ponudu
          </h2>
          <ul className="w-[30rem] mt-32 text-center">
            {options.map(([title, path], index) => {
              if (title === "Pogledaj trenutnu ponudu")
                return (
                  <Link to={path} key={index}>
                    <li className="w-full h-[4rem] bg-yellowCol text-[#212121] py-[0.8rem] mb-[1.2rem] rounded-md text-[1.5rem] hover:scale-110 active:scale-90 ease-in-out duration-300 mt-56">
                      {title}
                    </li>
                  </Link>
                );
              return (
                <Link to={path} key={index}>
                  <li className="w-full h-[4rem] bg-white text-[#212121] py-[0.8rem] mb-[1.2rem] rounded-md text-[1.5rem] hover:scale-110 active:scale-90 ease-in-out duration-300">
                    {title}
                  </li>
                </Link>
              );
            })}
          </ul>
          <Link to="/special-offer">
            <button className="w-[30rem] py-[1rem] pl-[2rem] text-[1.2rem] pr-3 rounded-lg bg-yellowCol text-black font-medium  mt-[6rem] hover:scale-110 active:scale-90 ease-in-out duration-300">
              Pogledaj ponudu
            </button>
          </Link>

          <div className="mt-[10rem]">
            <button
              onClick={(e) => navigate(-1)}
              className="rounded-md bg-transparent text-center py-[1rem] text-white border-[0.1rem] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[12rem] "
            >
              Nazad
            </button>
          </div>
          <div className="text-center text-[0.7rem] w-full p-4 ">
            {" "}
            <Link to="/">
              {" "}
              <p className="">©EKONOBAR 2023</p>{" "}
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateMenuOptions;
