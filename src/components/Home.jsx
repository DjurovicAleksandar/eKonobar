import { useEffect, useState } from "react";
import LanguageMenu from "./LanguageMenu";

function Home() {
  const [language, setLanguage] = useState(true);

  const languageChange = (language) => {
    console.log("first");
    console.log(language);
    setLanguage(false);
  };

  return (
    <div>
      {language ? (
        <LanguageMenu languageChange={languageChange} />
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default Home;
