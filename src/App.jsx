import { RouterProvider } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";
import router from "./components/rooter/Rooter";

function App() {
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const setDataFilter = (data) => {
      return data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    };

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
