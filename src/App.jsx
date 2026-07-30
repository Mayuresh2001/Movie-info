import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Cards from "./components/Cards";
import axios from "axios";

function App() {
  const [param, setParam] = useState(new URLSearchParams());
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cardHidden, setCardHidden] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("mi-theme") || "dark";
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("mi-theme", next);
      return next;
    });
  };

  const updateParam = (newParam) => {
    setParam(newParam);
  };

  async function getData() {
    setIsLoading(true);
    const API_URL = import.meta.env.VITE_API_URL;
    const API_KEY = import.meta.env.VITE_API_KEY;
    const url = `${API_URL}?apikey=${API_KEY}&${param}`;
    const { data } = await axios.get(url);
    setData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return (
    <div className={`App ${theme}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <>  <Searchbar
        cardHidden={cardHidden}
        setCardHidden={setCardHidden}
        updateParam={updateParam}
        getData={getData}
        theme={theme}
      />
      </>
      <Cards
        cardHidden={cardHidden}
        setCardHidden={setCardHidden}
        data={data}
        setData={setData}
        updateParam={updateParam}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        theme={theme}
      />
    </div>
  );
}

export default App;
