import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="text-center text-[1.2rem] w-full p-4">
      <Link to="/">
        <p className="">©EKONOBAR 2023</p>
      </Link>
    </div>
  );
}

export default Footer;
