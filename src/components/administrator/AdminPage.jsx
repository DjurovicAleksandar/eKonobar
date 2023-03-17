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
    <div className="menuContainer p-4">
      <div className="h-[48rem] flex flex-col items-center justify-between">
        <h2 className="font-light text-[2.3rem]">
          Dobrodošli <span className="text-yellowCol">administrator</span>
        </h2>
        <ul className="w-[30rem] text-center">
          {options.map(([option, path], index) => {
            return (
              <Link to={path} key={index}>
                <li className="w-full h-[4.2rem] bg-white text-[#212121] py-[0.8rem] mb-[1.2rem] rounded-md text-[1.8rem] hover:scale-110 active:scale-90 ease-in-out duration-300">
                  {option}
                </li>
              </Link>
            );
          })}
        </ul>

        <button
          onClick={openEmailClientHandler}
          className="w-[30rem] h-[4.2rem] bg-white text-[#212121] py-[0.8rem] mb-[1.2rem] rounded-md text-[1.8rem] hover:scale-110 active:scale-90 ease-in-out duration-300"
        >
          Kontaktirajte podršku
        </button>

        <button
          onClick={logOut}
          className="w-[14rem] h-[4.2rem] text-center bg-transparent py-[0.8rem] text-[1.8rem] border-[0.1rem] rounder-md hover:scale-110 active:scale-90 ease-in-out duration-300"
        >
          Odjava
        </button>
      </div>
    </div>
  );
}

export default AdminPage;
