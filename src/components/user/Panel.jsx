import { Link, useOutletContext } from "react-router-dom";
import carbonated from "../../assets/imgs/user/categories/carbonated.png";
import cocktail from "../../assets/imgs/user/categories/cocktail.png";
import energy from "../../assets/imgs/user/categories/energy.png";
import hot from "../../assets/imgs/user/categories/hot.png";
import natural from "../../assets/imgs/user/categories/natural.png";
import soft from "../../assets/imgs/user/categories/soft.png";
import spirits from "../../assets/imgs/user/categories/spirits.png";
import back from "../../assets/imgs/user/back.png";

function Panel({ title }) {
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
    showShopingList,
    setShowShopingList,
    shoppingList,
    setShoppingList,
    showPopUp,
    setShowPopUp,
    showWaiterModal,
    setShowWaiterModal,
  ] = useOutletContext();

  const options = [
    ["Topli napitci", hot, "/hotdrinks"],
    ["Gazirana pića", carbonated, "/carbonateddrinks"],
    ["Negazirana pića", soft, "/softdrinks"],
    ["Prirodni sokovi", natural, "/naturaljuices"],
    ["Alkoholna pića", spirits, "/spirits"],
    ["Energetski napitci", energy, "/energydrinks"],
    ["Cocktails", cocktail, "/cocktails"],
  ];
  return (
    <div className="menuContainer p-4">
      <div className="h-[44rem] flex flex-col justify-center items-center mb-10">
        <h2 className="text-center text-[2rem] font-light mb-3">
          Odab<span className="text-yellowCol">e</span>rite vrstu pića
        </h2>
        <ul className="w-[30rem] text-center">
          {options.map(([title, img, path], index) => {
            return (
              <Link to={path} key={index}>
                <li className="w-full flex items-center border-[0.1rem] h-[3.5rem] px-[1.2rem] py-[0.8rem] mb-[1.2rem] rounded-md text-[1.5rem] hover:scale-110 active:scale-90 ease-in-out duration-300 cursor-pointer">
                  <img
                    className="w-[2rem] mr-2"
                    src={img}
                    alt={`${title} icon`}
                  />
                  <div className="border-l-[0.1rem] mr-2">&nbsp;</div>
                  <p>{title}</p>
                </li>
              </Link>
            );
          })}
        </ul>
        <button
          onClick={() => setShowWaiterModal(true)}
          className="w-[30rem] bg-yellowCol text-base text-black h-[3.5rem] px-[1.2rem] py-[0.8rem] mb-[1.2rem] rounded-md text-[1.5rem] hover:scale-110 active:scale-90 ease-in-out duration-300 cursor-pointer mt-6"
        >
          Pozovi konobara
        </button>
      </div>
      <button className="buttonBack hover:scale-110 active:scale-90 cursor-pointer">
        <Link to="/">
          <img src={back} className="w-[2rem]" alt="arrowBack" />
          <span className="text-[1.5rem]"> Nazad</span>
        </Link>
      </button>
      <div className="text-center text-[0.7rem] w-full p-4 mt-10">
        <Link to="/">
          <p className="">©EKONOBAR 2023</p>{" "}
        </Link>
      </div>
    </div>
  );
}

export default Panel;
