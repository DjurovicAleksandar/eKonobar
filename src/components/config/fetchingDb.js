import { getDocs, collection } from "firebase/firestore";
import { auth, db } from "./firebase";

//Necessary collection from the firebase, for the application
export const getDatabase = async (category, setCategory, setError) => {
  try {
    //Getting data for the drink list
    const data = await getDocs(collection(db, category));
    if (!data.ok) return new Error("Something went wrong");
    //Filtering data from database
    const dataFilter = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setCategory(dataFilter);
    console.log(dataFilter);
  } catch (error) {
    console.error(error);
    setError(error.message);
  }
};
