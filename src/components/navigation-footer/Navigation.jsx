import { Link } from "react-router-dom";
import navLogo from "../../assets/imgs/navLogo.png";

function Navigation() {
  return (
    <div className="text-center">
      <Link to="/">
        <img src={navLogo} />
      </Link>
    </div>
  );
}

export default Navigation;
