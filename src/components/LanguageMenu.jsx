import { useEffect, useState } from "react";
import Select from "react-select";
import serbian from "../assets/imgs/lng/serbian.png";
import croatian from "../assets/imgs/lng/croatian.png";
import bosnian from "../assets/imgs/lng/bosnian.png";
import english from "../assets/imgs/lng/english.png";

function LanguageMenu({ languageChange }) {
  const customStyles = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "black",
    }),
  };

  const options = [
    {
      value: "sr",
      label: "Srpski",
      icon: (
        <img
          className="w-[3rem] rounded-full"
          src={serbian}
          alt="Serbian flag"
        />
      ),
    },
    {
      value: "bs",
      label: "Bosanski",
      icon: (
        <img
          className="w-[3rem] rounded-full"
          src={bosnian}
          alt="Bosnian flag"
        />
      ),
    },
    {
      value: "hr",
      label: "Hrvatski",
      icon: (
        <img
          className="w-[3rem] rounded-full"
          src={croatian}
          alt="Croatian flag"
        />
      ),
    },
    {
      value: "en",
      label: "English",
      icon: (
        <img
          className="w-[3rem] rounded-full"
          src={english}
          alt="England flag"
        />
      ),
    },
  ];
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    if (!language) return;
    languageChange(language);
  }, [language]);

  return (
    <div className="menuContainer flex flex-col justify-center p-4">
      <label
        htmlFor="languages"
        className="font-light text-[2.3rem] mb-[1.9rem] text-center"
      >
        Odaberite jezik m<span className="text-[#FCDF07]">e</span>nija
      </label>
      <Select
        value={language}
        onChange={setLanguage}
        styles={customStyles}
        className="text-black"
        options={options}
        formatOptionLabel={({ label, icon }) => (
          <div className="flex items-center justify-start">
            {icon}
            <span className="text-[2.3rem] font-normal ml-2">{label}</span>
          </div>
        )}
      />
    </div>
  );
}
export default LanguageMenu;
