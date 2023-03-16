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

  //
  const [newArticleDescription, setNewArticleDescription] = useState("");

  const updateDescriptionHandler = async () => {
    const dataDoc = doc(db, categoryType, articleID);

    await updateDoc(dataDoc, {
      itemDescription: newArticleDescription || articleDescription,
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
    <div className="px-[18px]">
      <h2 className="font-light text-[23px] text-center">
        <span className="text-yellowCol pl-">Detalji</span> <span>artikla</span>{" "}
        | {articleName}
      </h2>

      <div className="mt-[40px] w-[310px] sm:w-[390px] h-[300px] rounded-md overflow-y-scroll p-[1px]">
        <textarea
          value={newArticleDescription}
          onChange={(e) => {
            setNewArticleDescription(e.target.value);
          }}
          placeholder={articleDescription}
          className="bg-transparent border-[1px] w-[95%] h-full resize-none rounded-md p-5 font-normal text-[13px]"
        ></textarea>
      </div>
      <button className="active:scale-90 ease-in-out duration-300 cursor-pointer block mx-auto underline text-yellowCol text-[9px] font-medium mt-[20px]">
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
