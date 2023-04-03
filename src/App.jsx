import { RouterProvider } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import Loading from "./components/Loading";
import router from "./components/rooter/Rooter";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="App max-w-[40rem] mx-auto">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
