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
          <div className="menuContainer p-4">
            <div className="h-[45rem] flex flex-col  justify-center">
              <h2 className="font-light text-[2.3rem] text-center">
                M<span className="text-yellowCol">e</span>nu
              </h2>
              <ul className="w-[30rem] text-center">
                {options.map(([option, path], index) => {
                  return (
                    <Link to={path} key={index}>
                      <li className="w-full h-[4.5rem] bg-white text-[#212121] py-[0.8rem] mb-[1.2rem] rounded-md text-[1.8rem] hover:scale-110 active:scale-90 ease-in-out duration-300">
                        {option}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
            <button
              className="buttonBack hover:scale-110 active:scale-90 cursor-pointer"
              onClick={backToLanguageSelect}
            >
              <img src={back} className="w-[2rem]" alt="arrowBack" />
              <span className="text-[1.5rem]"> Nazad</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
