import { useEffect, useState } from "react";
import { auth } from "../config/firebase.js";
import { Link, useNavigate } from "react-router-dom";

import { signOut } from "firebase/auth";

function AdminPage({ menu }) {
  const navigate = useNavigate();
  const options = [
    ["Dodavanje artikala", "/add-item"],
    ["Brisanje artikala", "/delete-item"],
    ["Promjena cijene", "/change-price"],
    ["Izmjena detalja artikla", "/change-details"],
    ["Banneri i reklame", "/advertising"],
  ];

  const openEmailClientHandler = () => {
    window.open(
      "mailto:@ekonobar1@gmail.com?subject=Naslov&body=Tekst%20Ide%20hovdje"
    );
  };

  const logOut = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigate("/caffe-login", { replace: true });
    }

    if (
      auth?.currentUser &&
      auth.currentUser?.email !== "ekonobar1@gmail.com"
    ) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      <h2 className="font-light text-[23px]">
        Dobrodošli <span className="text-yellowCol">administrator</span>
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

      <button
        onClick={openEmailClientHandler}
        className="w-[300px] h-[45px] bg-white text-[#212121] py-[8px] mb-[12px] rounded-md text-[18px] hover:scale-110 active:scale-90 ease-in-out duration-300"
      >
        Kontaktirajte podršku
      </button>

      <button
        onClick={logOut}
        className="w-[150px] h-[45px] text-center bg-transparent py-[8px] text-[18px] border-[1px] rounder-md hover:scale-110 active:scale-90 ease-in-out duration-300"
      >
        Odjava
      </button>
    </>
  );
}

export default AdminPage;
