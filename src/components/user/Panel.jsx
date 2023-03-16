import { Link } from "react-router-dom";
import carbonated from "../../assets/imgs/user/categories/carbonated.png";
import cocktail from "../../assets/imgs/user/categories/cocktail.png";
import energy from "../../assets/imgs/user/categories/energy.png";
import hot from "../../assets/imgs/user/categories/hot.png";
import natural from "../../assets/imgs/user/categories/natural.png";
import soft from "../../assets/imgs/user/categories/soft.png";
import spirits from "../../assets/imgs/user/categories/spirits.png";
import back from "../../assets/imgs/user/back.png";

function Panel({ title }) {
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
    <div className="h-full flex flex-col justify-between">
      <div className=" h-[450px] pt-12">
        <h2 className="text-center text-[20px] font-light mb-3">
          Odab<span className="text-yellowCol">e</span>rite vrstu pića
        </h2>
        <ul className="w-[320px] text-center">
          {options.map(([title, img, path], index) => {
            return (
              <Link to={path} key={index}>
                <li className="w-full flex items-center border-[1px] h-[35px] px-[12px] py-[8px] mb-[12px] rounded-md text-[15px] hover:scale-110 active:scale-90 ease-in-out duration-300 cursor-pointer">
                  <img
                    className="w-[20px] mr-2"
                    src={img}
                    alt={`${title} icon`}
                  />
                  <div className="border-l-[1px] mr-2">&nbsp;</div>
                  <p>{title}</p>
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
      <button className="buttonBack hover:scale-110 active:scale-90 cursor-pointer">
        <Link to="/">
          <img src={back} className="w-[20px]" alt="arrowBack" />
          <span className="text-[15px]"> Nazad</span>
        </Link>
      </button>
    </div>
  );
}

export default Panel;
