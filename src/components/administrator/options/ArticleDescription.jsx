import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { db } from "../../config/firebase";
import { warningHandler } from "../../config/helperFunctions";

function ArticleDescription() {
  const navigate = useNavigate();
  const location = useLocation();
  //
  const [categoryType, setCategoryType] = useState("");
  const [articleName, setArticleName] = useState("");
  const [articleDescription, setArticleDescription] = useState("");
  const [articleID, setArticleID] = useState("");
  const [shortDescription, setShortDescription] = useState("");

  //
  const [newArticleDescription, setNewArticleDescription] = useState("");

  const updateDescriptionHandler = async () => {
    const dataDoc = doc(db, categoryType, articleID);

    await updateDoc(dataDoc, {
      itemDescription:
        `${shortDescription}. ${newArticleDescription}` || articleDescription,
    });

    navigate(-1);
  };

  useEffect(() => {
    const item = location.state;
    setArticleName(item.item.itemName);
    setArticleID(item.item.id);
    setCategoryType(item.item.categoryID);
    setArticleDescription(item.item.itemDescription);
  }, []);
  return (
    <div className="px-[1.8rem]">
      <h2 className="font-light text-[2rem] text-center">
        <span className="text-yellowCol pl-">Detalji</span> <span>artikla</span>{" "}
        | {articleName}
      </h2>

      <div className="mt-[20px] w-[30rem] sm:w-[390px] h-[300px] rounded-md p-[1px]">
        <label className="pl-5" htmlFor="shortDescription">
          Kratki opis artikla
        </label>
        <textarea
          value={shortDescription}
          onChange={(e) => {
            setShortDescription(e.target.value);
          }}
          id="shortDescription"
          placeholder="Maksimalno 50 karaktera"
          className="bg-transparent border-[1px] w-[95%]  resize-none rounded-md px-5 py-2 font-normal text-[13px] mt-1"
          maxLength={50}
        ></textarea>
        <label className="pl-5" htmlFor="longDescription">
          Duži opis artikla
        </label>
        <textarea
          id="longDescription"
          value={newArticleDescription}
          onChange={(e) => {
            setNewArticleDescription(e.target.value);
          }}
          placeholder={articleDescription}
          className="bg-transparent border-[1px] w-[95%] h-[95%] resize-none rounded-md p-5 font-normal text-[13px] mt-1 overflow-y-auto"
        ></textarea>
      </div>
      <button className="active:scale-90 ease-in-out duration-300 cursor-pointer block mx-auto underline text-yellowCol text-[9px] font-medium mt-[9rem]">
        Pogledaj uputstvo za promjene detalja artikla
      </button>
      <div className="flex items-center justify-around mt-[20px] mb-[30px]">
        <button
          onClick={updateDescriptionHandler}
          className="rounded-md bg-transparent text-center py-[10px] text-white border-[1px] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[120px] "
        >
          Sacuvaj
        </button>
        <Link to="/change-details">
          <button
            onClick={warningHandler}
            className="rounded-md bg-transparent text-center py-[10px] text-white border-[1px] border-white ease-in-out duration-300 active:scale-90 cursor-pointer w-[120px] "
          >
            Nazad
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ArticleDescription;
