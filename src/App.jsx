import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
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
    <div className="App w-full h-screen flex flex-col justify-between items-center pb-12">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
