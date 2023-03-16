import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

//Icons
import userIcon from "../../assets/imgs/admin/user.png";
import lockIcon from "../../assets/imgs/admin/lock.png";
import logo from "../../assets/imgs/logo.png";
import { useEffect } from "react";

function AdminLogin() {
  const navigate = useNavigate();

  const passwordRef = useRef(null);

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/administrator-page", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (
      auth?.currentUser &&
      auth.currentUser?.email === "ekonobar1@gmail.com"
    ) {
      navigate("/administrator-page", { replace: true });
    } else if (
      auth?.currentUser &&
      auth?.currentUser.email !== "ekonobar1@gmail.com"
    ) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <>
      <Link to="/">
        <img src={logo} />
      </Link>
      <div className="w-[300px] h-[220px] relative">
        <form onSubmit={loginHandler}>
          <input
            onChange={(e) => {
              if (e.target.value === "eKonobar__admin") {
                setUserName("eKonobar__admin");
                setEmail("ekonobar1@gmail.com");
              }
            }}
            type="text"
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[20px]"
            placeholder="Vaše ime"
            style={{
              backgroundImage: `url(${userIcon})`,
              backgroundPosition: "left 0.5rem center",
              backgroundSize: "20px",
              backgroundRepeat: "no-repeat",
            }}
            required
            autoComplete={userName}
          />
          <input
            ref={passwordRef}
            value={password}
            onChange={() => setPassword(passwordRef.current.value)}
            type="password"
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[40px]"
            placeholder="Sigurnosni kod"
            style={{
              backgroundImage: `url(${lockIcon})`,
              backgroundPosition: "left 0.5rem center",
              backgroundSize: "20px",
              backgroundRepeat: "no-repeat",
            }}
            required
          />
          <input
            className=" bg-white text-black w-full h-[45px] rounded-lg text-center font-semibold text-[16px] active:scale-90 ease-in-out duration-300 cursor-pointer"
            type="submit"
            value="PRIJAVA"
          />
          <button className="cursor-pointer text-yellowCol text-[9px] font-medium absolute bottom-[-2px] right-0 active:scale-90">
            Izgbili ste Vaš sigurnosni kod?
          </button>
        </form>
      </div>
    </>
  );
}

export default AdminLogin;
