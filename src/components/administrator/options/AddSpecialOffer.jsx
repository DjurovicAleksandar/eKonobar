import { Link } from "react-router-dom";

function AddSpecialOffer() {
  const options = [
    ["Dodaj super ponudu", "/addspecialofferitem"],
    ["Izmjeni artikle", "/changespecialofferitems"],
    ["Obriši super ponudu", "/deletespecialoffer"],
    ["Pogledaj trenutnu ponudu", "/special-offer"],
  ];

  return (
    <div className="menuContainer">
      <div className="flex flex-col items-center">
        <div className="h-[42rem]">
          <h2 className="font-light text-[2rem] text-center mb-28">
            <span className="text-yellowCol">Super</span> Ponuda
          </h2>
          <ul className="w-[30rem] text-center">
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
          <div className="flex items-center justify-around mt-24">
            <Link to="/administrator-page">
              <button className="rounded-md bg-transparent text-center py-[1rem] text-white border-[0.1rem] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[12rem] ">
                Nazad
              </button>
            </Link>
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

export default AddSpecialOffer;
