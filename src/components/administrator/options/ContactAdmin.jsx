import { Link } from "react-router-dom";

function ContactAdmin() {
  const options = [
    ["Poruka", "sms:+38766151382"],
    ["Poziv", "tel:+38766151382"],
    ["Mail", "mailto:@ekonobar1@gmail.com"],
  ];

  return (
    <div className="menuContainer">
      <div className="flex flex-col items-center">
        <div className="h-[42rem]">
          <h2 className="font-light text-[2rem] text-center my-28">
            <span className="text-yellowCol">Kontaktirajte</span> podršku
          </h2>
          <ul className="w-[30rem] text-center">
            {options.map(([title, path], index) => {
              return (
                <li
                  key={index}
                  className="w-full h-[4rem] bg-white text-[#212121] py-[0.8rem] mb-[1.2rem] rounded-md text-[1.5rem] hover:scale-110 active:scale-90 ease-in-out duration-300"
                >
                  <a href={path}>{title}</a>
                </li>
              );
            })}
          </ul>
          <div className="flex items-center justify-around mt-72">
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

export default ContactAdmin;
