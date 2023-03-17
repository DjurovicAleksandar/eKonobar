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
    <div className="menuContainer p-4">
      <div className="flex flex-col items-center">
        <div className="h-[42rem]">
          <h2 className="font-light text-[2rem] text-center mb-5">
            <span className="text-yellowCol">{title}</span>{" "}
            {title === "Izmjena" && <span>detalja</span>}{" "}
            {title === "Promjena" ? <span>cijene</span> : <span>artikla</span>}
          </h2>
          <Select
            //  value={value}
            isSearchable={false}
            onChange={(e) => {
              menuHandler(e.value);
              setValue(e.value);
            }}
            s
            styles={customStyles}
            className="text-black  w-[30rem] sm:w-[39rem] mb-20"
            options={options}
            placeholder="Odaberite kategoriju"
            formatOptionLabel={({ label, icon }) => (
              <div className="flex items-center justify-start">
                <span className="text-[1.5rem] font-normal ml-2">{label}</span>
              </div>
            )}
          />
          {value !== "" ? (
            <>
              <div className="w-[30rem] sm:w-[39rem] h-[25rem] rounded-md overflow-y-scroll">
                {colon}
              </div>
              <button className="active:scale-90 ease-in-out duration-300 cursor-pointer block mx-auto underline text-yellowCol text-[0.9rem] font-medium mt-[2rem]">
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
        </div>
        <div className="flex w-[30rem]  justify-between mt-[2rem] text-[1.3rem]">
          {title === "Promjena" ? (
            <button
              type="submit"
              form="change-price-form"
              className="rounded-md bg-transparent text-center py-[1rem] text-white border-[0.1rem] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[12rem] "
            >
              Sačuvaj
            </button>
          ) : (
            <button
              onClick={saveChangesHandler}
              className="rounded-md bg-transparent text-center py-[1rem] text-white border-[0.1rem] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[12rem] "
            >
              Sacuvaj
            </button>
          )}
          <Link to="/administrator-page">
            <button className="rounded-md bg-transparent text-center py-[1rem] text-white border-[0.1rem] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[12rem] ">
              Nazad
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OptionTemplate;
