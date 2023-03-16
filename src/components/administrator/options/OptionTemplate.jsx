import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase.js";
import Select from "react-select";

function OptionTemplate({ title, colon, menuHandler, saveChangesHandler }) {
  const [value, setValue] = useState("");

  //styles for select
  const customStyles = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "black",
    }),
  };

  const options = [
    {
      value: "hotdrinks",
      label: "Hot drinks",
    },
    {
      value: "nonAlcoholicBeverages",
      label: "Non-alcoholic beverages",
    },
    {
      value: "beer",
      label: "Beer",
    },
    {
      value: "wine",
      label: "Wine",
    },
    {
      value: "spirits",
      label: "Spirits",
    },
    {
      value: "cocktails",
      label: "Cocktails",
    },
    {
      value: "snacksAndAppetizers",
      label: "Snacks and appertizers",
    },
    {
      value: "deserts",
      label: "Deserts",
    },
  ];

  useEffect(() => {
    if (
      auth?.currentUser &&
      auth.currentUser?.email !== "ekonobar1@gmail.com"
    ) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div className="px-[18px]">
      <h2 className="font-light text-[23px] text-center">
        <span className="text-yellowCol">{title}</span>{" "}
        {title === "Izmjena" && <span>detalja</span>}{" "}
        {title === "Promjena" ? <span>cijene</span> : <span>artikla</span>}
      </h2>
      <Select
        //  value={value}
        onChange={(e) => {
          menuHandler(e.value);
          setValue(e.value);
        }}
        styles={customStyles}
        className="text-black  w-[310px] sm:w-[390px] mb-[50px] mt-[30px]"
        options={options}
        placeholder="Odaberite kategoriju"
        formatOptionLabel={({ label, icon }) => (
          <div className="flex items-center justify-start">
            <span className="text-[16px] font-normal ml-2">{label}</span>
          </div>
        )}
      />
      {value !== "" ? (
        <>
          {" "}
          <div className="w-[310px] sm:w-[390px] h-[300px] rounded-md overflow-y-scroll">
            {colon}
          </div>
          <button className="active:scale-90 ease-in-out duration-300 cursor-pointer block mx-auto underline text-yellowCol text-[9px] font-medium mt-[20px]">
            {title === "Izmjena"
              ? "Pogledaj uputstvo za promjenu detalja artikla"
              : title === "Promjena"
              ? "Pogledaj uputstvo za promjene cijene artikla"
              : title === "Brisanje"
              ? "Pogledaj uputstvo za brisanje artikala"
              : "Pogledaj uputstvo za dodavanje artikala"}
          </button>
        </>
      ) : (
        <></>
      )}
      <div className="flex items-center justify-around mt-[20px] mb-[30px]">
        {title === "Promjena" ? (
          <button
            type="submit"
            form="change-price-form"
            className="rounded-md bg-transparent text-center py-[10px] text-white border-[1px] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[120px] "
          >
            Sacuvaj
          </button>
        ) : (
          <button
            onClick={saveChangesHandler}
            className="rounded-md bg-transparent text-center py-[10px] text-white border-[1px] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[120px] "
          >
            Sacuvaj
          </button>
        )}
        <Link to="/administrator-page">
          <button className="rounded-md bg-transparent text-center py-[10px] text-white border-[1px] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[120px] ">
            Nazad
          </button>
        </Link>
      </div>
    </div>
  );
}

export default OptionTemplate;
