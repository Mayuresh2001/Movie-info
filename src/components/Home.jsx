import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Searchbar from "./Searchbar";
import Cards from "./Cards";
import axios from "axios";
import Pagination from "./Pagination";

function Home() {
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
    <div className={`Home ${theme} min-h-100vh`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Searchbar
        cardHidden={cardHidden}
        setCardHidden={setCardHidden}
        updateParam={updateParam}
        getData={getData}
        theme={theme}
      />
      <Cards
        cardHidden={cardHidden}
        setCardHidden={setCardHidden}
        data={data}
        setData={setData}
        updateParam={updateParam}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        theme={theme}
        results={data?.totalResults}
      />
      {/* Pagination */}
      {data?.totalResults >= 11 && (
        <Pagination results={data?.totalResults} updateParam={updateParam} theme={theme} />
      )}
    </div>
  );
}

export default Home;
