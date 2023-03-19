import { useEffect, useState } from "react";
import Switch from "react-switch";
import Select from "react-select";
import { Link, useOutletContext } from "react-router-dom";

import colaBanner from "../../../assets/imgs/banners/cocaColaBanner.png";
import bannerRemove from "../../../assets/imgs/admin/bannerRemove.png";
import { db } from "../../config/firebase";
import { collection, doc, onSnapshot, setDoc } from "firebase/firestore";

function Advertising() {
  const [
    showModal,
    setShowModal,
    categoryID,
    setCategoryID,
    itemIndex,
    setItemIndex,
    checked,
    setChecked,
    selectedPositionOptions,
    setSelectedPositionOptions,
    selectedTypeOptions,
    setSelectedTypeOptions,
  ] = useOutletContext();

  //select styling
  const customStyles = {
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "black",
    }),
  };

  //select options

  const positionOptions = [
    { label: "Na svim stranicama", value: "everypage" },
    { label: "Na početnoj stranici", value: "firstpage" },
  ];
  const bannerType = [
    { label: "Statični baner na dnu stranice", value: "staticBanner" },
    { label: "Pop up banner", value: "popupBanner" },
  ];

  const handleChange = () => {
    setChecked(!checked);
    const configRef = doc(db, "config", "checkedState");
    setDoc(configRef, {
      checked: !checked,
    });
  };

  return (
    <div className="menuContainer">
      <div className="h-[42rem]">
        <div className="flex flex-col items-center">
          <h2 className="font-light text-[2rem] text-center mt-5">
            <span className="text-yellowCol">Banneri</span> i reklame
          </h2>
          <div className="relative flex justify-between p-4 w-full mb-3">
            <h3 className="font-light text-[1.5rem]">
              Omogući bannere i reklame
            </h3>
            <p className="absolute bottom-[1rem] text-[0.68rem] text-yellowCol">
              {!checked
                ? "Banneri i reklame se trenutno ne prikazuju"
                : "Banneri i reklame se uspješno prikazuju"}
            </p>
            <label>
              <Switch
                onChange={handleChange}
                checked={checked}
                width={50}
                height={25}
                checkedIcon={false}
                uncheckedIcon={false}
                offColor="#8E8E8E"
                onColor="#FCDF07"
              />
            </label>
          </div>
          <div className="mb-12">
            <Select
              defaultValue={selectedPositionOptions}
              options={positionOptions}
              isSearchable={false}
              onChange={(e) => {
                setSelectedPositionOptions(e);

                const configRef = doc(db, "config", "bannerPositionState");

                setDoc(configRef, {
                  positionState: selectedPositionOptions,
                });
              }}
              styles={customStyles}
              className="text-black w-[29rem] sm:w-[39rem] mb-4"
              formatOptionLabel={({ label, icon }) => (
                <div className="flex items-center justify-start">
                  <span className="text-[1.5rem] font-normal ml-2">
                    {label}
                  </span>
                </div>
              )}
            />
            <Select
              defaultValue={selectedTypeOptions}
              options={bannerType}
              isSearchable={false}
              onChange={(e) => {
                setSelectedTypeOptions(e);

                const configRef = doc(db, "config", "bannerTypeState");

                setDoc(configRef, {
                  bannerType: selectedTypeOptions,
                });
              }}
              styles={customStyles}
              className="text-black  w-[29rem] sm:w-[39rem]"
              placeholder="Odaberite vrstu bannera"
              formatOptionLabel={({ label, icon }) => (
                <div className="flex items-center justify-start">
                  <span className="text-[1.5rem] font-normal ml-2">
                    {label}
                  </span>
                </div>
              )}
            />
          </div>
          <div className="text-center mb-20">
            <button className="rounded-md bg-white text-black font-semibold text-center w-[20rem] h-[3rem] mb-2 hover:scale-110 active:scale-90 ease-in-out duration-300">
              DODAJ SLIKU
            </button>
            <p className="font-medium text-[0.5rem] text-yellowCol underline decoration-1 decoration-yellow-200/30">
              Banneri i reklame moraju biti u veličini 123x321px
            </p>
          </div>
          <div className="p-4 w-full">
            <h2 className="font-light text-center mb-4 text-[1.4rem]">
              Banneri koji se prikazuju
            </h2>
            <div>
              <img src={colaBanner} />
            </div>
            <div className="text-right mt-3 font-light text-sm">
              <button className="hover:scale-110 active:scale-90 ease-in-out duration-300 ">
                <img width={25} src={bannerRemove} />
                Obriši
              </button>
            </div>
          </div>
        </div>
        <p className="text-center font-medium text-[0.6rem] text-yellowCol underline decoration-1 decoration-yellow-200/30">
          Pogledaj uputstvo za dodavanje bannera
        </p>
      </div>
      <div className="flex items-center justify-around mt-16">
        <button className="rounded-md bg-transparent text-center py-[1rem] text-white border-[0.1rem] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[12rem] ">
          Sacuvaj
        </button>

        <Link to="/administrator-page">
          <button className="rounded-md bg-transparent text-center py-[1rem] text-white border-[0.1rem] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[12rem] ">
            Nazad
          </button>
        </Link>
      </div>
      <div className="text-center text-white text-[0.7rem] w-full p-4 mt-6">
        <p className="">©EKONOBAR 2023</p>{" "}
      </div>
    </div>
  );
}

export default Advertising;
