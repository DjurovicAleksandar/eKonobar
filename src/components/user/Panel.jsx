import { Link, useOutletContext } from "react-router-dom";

import back from "../../assets/imgs/user/back.png";

function Panel({ title, options }) {
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

  return (
    <div className="menuContainer p-4">
      <div className="h-[44rem] flex flex-col justify-center items-center mb-28">
        <h2 className="text-center text-[2rem] font-light mb-3">{title}</h2>
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
          className="w-[30rem] bg-yellowCol text-base text-black h-[3.5rem] px-[1.2rem] py-[0.8rem] mb-[1.2rem] rounded-md text-[1.5rem] hover:scale-110 active:scale-90 ease-in-out duration-300 cursor-pointer mt-10"
        >
          Pozovi konobara
        </button>
      </div>

      {/* <button className="buttonBack hover:scale-110 active:scale-90 cursor-pointer">
        <Link to="/">
          <img src={back} className="w-[2rem]" alt="arrowBack" />
          <span className="text-[1.5rem]"> Nazad</span>
        </Link>
      </button> */}
      <div className="text-center text-[0.7rem] w-full p-4">
        <Link to="/">
          <p className="">©EKONOBAR 2023</p>{" "}
        </Link>
      </div>
    </div>
  );
}

export default Panel;
