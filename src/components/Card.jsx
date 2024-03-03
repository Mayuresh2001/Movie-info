import React, { useState, useEffect } from "react";
import NAimage from "../image_not_found.png";
function Card({ data, updateParam, cardHidden, setCardHidden, isLoading, setIsLoading }) {
  // search suggestion
  // console.log('ousidefetchdat',data)


  function fetchData() {
    setIsLoading(true);
    setCardHidden(true);
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);
      newParam.delete("s");
      newParam.set("i",data.imdbID );
      console.log("crad hide from card",cardHidden)
      setIsLoading(false)
      return newParam.toString();
    });
  }

  return (
    <div>
      {!cardHidden && (
         <div
          className="Card w-52 h-[400px] flex flex-col hover:scale-110  transition-all bg-[#98C1D9] items-center cursor-pointer rounded-md m-auto origin-center"
          onClick={()=> fetchData()}>
          <div className="m-2 overflow-hidden">
            <img
              src={data.Poster === "N/A" ? NAimage : data.Poster}
              alt={data.Title} loading="lazy"
              className=" 
              pointer-events-none	w-64 lazy rounded-lg h-96 "
            />
          </div>

          <div className="flex w-full bg-opacity-10 ">
            <h1 className="font-semibold text-md mx-5 my-2 text-center">
              {data.Title}
              <span>({data.Year})</span>
            </h1>
          </div>
         
        </div>
      )}

    </div>
  );
}

export default Card;
