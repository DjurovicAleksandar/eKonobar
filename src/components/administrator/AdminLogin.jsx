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
    <div className="menuContainer p-4">
      <div className="h-[45rem] flex flex-col items-center justify-between">
        <div>
          <Link to="/">
            <img src={logo} />
          </Link>
        </div>
        <div className="w-[30rem] h-[22rem] relative">
          <form onSubmit={loginHandler}>
            <input
              onChange={(e) => {
                if (e.target.value === "eKonobar__admin") {
                  setUserName("eKonobar__admin");
                  setEmail("ekonobar1@gmail.com");
                }
              }}
              type="text"
              className="w-full py-[1.3rem] pl-[5.1rem] text-[1.4rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[2rem]"
              placeholder="Vaše ime"
              style={{
                backgroundImage: `url(${userIcon})`,
                backgroundPosition: "left 0.5rem center",
                backgroundSize: "2rem",
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
              className="w-full py-[1.3rem] pl-[5.1rem] text-[1.4rem] pr-3 rounded-lg border-[0.1rem] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[4rem]"
              placeholder="Sigurnosni kod"
              style={{
                backgroundImage: `url(${lockIcon})`,
                backgroundPosition: "left 0.5rem center",
                backgroundSize: "2rem",
                backgroundRepeat: "no-repeat",
              }}
              required
            />
            <input
              className=" bg-white text-black w-full h-[4.5rem] rounded-lg text-center font-semibold text-[1.6rem] active:scale-90 ease-in-out duration-300 cursor-pointer"
              type="submit"
              value="PRIJAVA"
            />
            <button className="cursor-pointer text-yellowCol text-[0.9rem] font-medium absolute bottom-[-0.2rem] right-0 active:scale-90">
              Izgbili ste Vaš sigurnosni kod?
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
