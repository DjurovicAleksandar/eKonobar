import Panel from "./Panel";
import carbonated from "../../assets/imgs/user/categories/carbonated.png";
import cocktail from "../../assets/imgs/user/categories/cocktail.png";
import energy from "../../assets/imgs/user/categories/energy.png";
import hot from "../../assets/imgs/user/categories/hot.png";
import natural from "../../assets/imgs/user/categories/natural.png";
import soft from "../../assets/imgs/user/categories/soft.png";
import spirits from "../../assets/imgs/user/categories/spirits.png";

function DrinksPanel() {
  const title = (
    <>
      Odab<span className="text-yellowCol">e</span>rite vrstu pića
    </>
  );

  const options = [
    ["Topli napitci", hot, "/hotdrinks"],
    ["Gazirana pića", carbonated, "/carbonateddrinks"],
    ["Negazirana pića", soft, "/softdrinks"],
    ["Prirodni sokovi", natural, "/naturaljuices"],
    ["Alkoholna pića", spirits, "/spirits"],
    ["Energetski napitci", energy, "/energydrinks"],
    ["Cocktails", cocktail, "/cocktails"],
  ];

  return <Panel title={title} options={options} />;
}

export default DrinksPanel;
