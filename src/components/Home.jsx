import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LanguageMenu from "./LanguageMenu";
import back from "../assets/imgs/user/back.png";

function Home() {
  const [language, setLanguage] = useState(true);

  const backToLanguageSelect = () => {
    setLanguage(true);
  };

  const languageChange = (language) => {
    console.log("first");
    console.log(language);
    setLanguage(false);
  };

  const options = [
    ["Piće", "/drinks"],
    ["Hrana", "/food"],
    ["Specijalna ponuda", "/special-offer"],
  ];

  return (
    <div>
      {language ? (
        <LanguageMenu languageChange={languageChange} />
      ) : (
        <>
          <div className="h-[600px] flex flex-col justify-evenly">
            <div>
              <h2 className="font-light text-[23px] text-center">
                M<span className="text-yellowCol">e</span>nu
              </h2>
              <ul className="w-[300px] text-center">
                {options.map(([option, path], index) => {
                  return (
                    <Link to={path} key={index}>
                      <li className="w-full h-[45px] bg-white text-[#212121] py-[8px] mb-[12px] rounded-md text-[18px] hover:scale-110 active:scale-90 ease-in-out duration-300">
                        {option}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
          <button
            className="buttonBack hover:scale-110 active:scale-90 cursor-pointer"
            onClick={backToLanguageSelect}
          >
            <img src={back} alt="arrowBack" />
            <span className="text-[21px]"> Nazad</span>
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
