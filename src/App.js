import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Cards from "./components/Cards";
import axios from "axios";



// Searchdata, setsearchdata contains URL
// data, setdata contains api responsedata
function App() {
  const [param, setParam] = useState(new URLSearchParams());
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cardHidden, setCardHidden] = useState(false);

  const updateParam = (newParam) => {
    setParam(newParam);
  };

  async function getData() {
    setIsLoading(true)
    const url = `http://www.omdbapi.com/?apikey=9f492cf2&${param}`;
    
   const {data}= await axios.get(url)
   setData(data)

    setIsLoading(false)
    console.log(data)
   
  }
  

  useEffect(() => {
    getData();
  }, [param]);

  return (
    <div className="App w-full overflow-x-hidden h-[100vh] bg-[#183052]">
      
      <div >
        <Navbar />
        <div className="bg-[#EDF2F4] h-2"></div>
      </div>
      <div className="">
        <Searchbar cardHidden={cardHidden}
                  setCardHidden={setCardHidden} updateParam={updateParam} getData={getData} />
      </div>
      <div className=" m-10 w-full mx-auto">
      
       <Cards cardHidden={cardHidden}
                  setCardHidden={setCardHidden} data={data} setData={setData} updateParam={updateParam} isLoading={isLoading} setIsLoading={ setIsLoading}/>
      </div>
    </div>
  );
}
export default App;
