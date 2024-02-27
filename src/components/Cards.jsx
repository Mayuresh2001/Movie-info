import React, { useEffect, useState } from "react";
import imgnotfound from "../image_not_found.png";
import Card from "./Card";
import Pagination from "./Pagination";
import Loader from "../components/Loader";

function Cards({
  setData,
  data,
  updateParam,
  isLoading,
  setIsLoading,
  cardHidden,
  setCardHidden,
}) {
  let allMovies = [];

  function getdata() {
    if (data && data.Search && Array.isArray(data.Search)) {
      allMovies = data.Search;
    }
    return allMovies;
  }
  let results = data.totalResults;

  function fetchMovieData() {
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);
      newParam.set("type", "movie");

      return newParam.toString();
    });
  }
  useEffect(() => {}, [cardHidden]);

  function fetchSeriesData() {
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);
      newParam.set("type", "series");

      return newParam.toString();
    });
  }
  function fetchAllData(movie) {
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);

      newParam.delete("type");
      return newParam.toString();
    });
  }

  if (data && data.Search && Array.isArray(data.Search)) {
    allMovies = data.Search;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="flex flex-col justify-center ">
      {results === undefined ? null : (
        <p className="text-white text-xl p-5 pl-14">
          {results <= 1
            ? `${results} Result Found`
            : `${results} Results Found`}
        </p>
      )}
      <div>
        {results >= 1 ? (
          <div className="text-white -mt-2">
            <ul className="flex w-52 justify-evenly ">
              <li>
                <button
                  className="hover:bg-slate-200 p-3 pb-1"
                  onClick={() => fetchAllData()}>
                  All
                </button>
              </li>
              <li>
                <button
                  className="hover:bg-slate-200 p-3 pb-1"
                  onClick={() => fetchMovieData()}>
                  Movies
                </button>
              </li>
              <li>
                <button
                  className="hover:bg-slate-200 p-3 pb-1"
                  onClick={() => fetchSeriesData()}>
                  Series
                </button>
              </li>
            </ul>
            <hr className="h-[1px] w-full  bg-orange-600" />
          </div>
        ) : null}
      </div>
      {!cardHidden && (
        <div className="m-auto flex bg-[#3D5A80] flex-col">
          <div className="Cards inline-flex flex-wrap my- max-w-[90%] gap-6 m-[5%]">
            {getdata().map((data) => {
              return (
                <Card
                  key={data.id}
                  setData={setData}
                  data={data}
                  updateParam={updateParam}
                  cardHidden={cardHidden}
                  setCardHidden={setCardHidden}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              );
            })}
          </div>
          <br />
          <div className="m-auto mb-5">
            {results >= 11 ? (
              <Pagination results={results} updateParam={updateParam} />
            ) : null}
          </div>
        </div>
      )}

      {cardHidden && (
        <div className="flex bg-[#3D5A80] flex-col justify-center ">
          <div>
            <button
              className=""
              title="Go Back"
              onClick={() => {
                setCardHidden(false);
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M19 12H6M12 5l-7 7 7 7" />
              </svg>
            </button>
          </div>
          <div className=" flex justify flex-col mb-28 bg-[#86bbd8] w-3/4 rounded-md  mx-auto">
            {/* Title */}
            <div className="bg-black w-full text-white">
              <h1 className=" m-auto text-6xl p-12 text-center ">
                {data.Title} <br/>
                <span> ({data.Year})</span>
              </h1>


              <div className="flex p-5 m-2 justify-evenly items-end pb-4">
                <div>
                  <span className=" border-white p-1 -x-2 border-[3px]">{data.Rated}</span>
                </div>
                <div className="capitalize">
                {data.Type}
                </div>
                <div>
                {data.Runtime}
                </div>
                <div className="w-36 text-center">
                {data.Language}
                </div>
                <div>
                {data.Genre}
                </div>
                <div>
                {data.Released}
                </div>
              
                <div>
                {data.Country}
                </div>
              </div>

            </div>
            <div className="card1 w-10/12  m-auto text-white flex flex-row justify-evenly items-center">
              <div className="w-2/5">
                <img
                  className="w-72 m-auto pointer-events-none	rounded-sm"
                  src={data.Poster === "N/A" ? imgnotfound : data.Poster}
                  alt={data.Title}
                />
              </div>
              <div className="w-1/2 p-10">
              
              {/* Imbd */}
                <p className="font-semibold">
                  <span className="bg-[#ebbf17] text-black px-2 p-1 rounded-lg font-bold text-lg">IMbd</span> {data.imdbRating}
                </p>
               
                <p><span className="font-semibold text-black p-1">Cast: </span> {data.Actors}</p>
                
                
                <p><span className="font-semibold text-black p-1">Director:</span> {data.Director}</p>
                
          
                <p className="w-80"><span className="font-semibold text-black p-1 pb-2">Plot:</span>{data.Plot}</p>
                
                <p><span className="font-semibold text-black p-1 pb-2">Writer: </span>{data.Writer}</p>
              
                <p><span className="font-semibold text-black p-1">Box Office: </span>{data.BoxOffice}</p>
                <p><span className="font-semibold text-black p-1 pb-2">Production: </span>{data.Production}</p>
                <p className="flex w-80">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-award text-black">
                      <circle cx="12" cy="8" r="7"></circle>
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                    </svg>
                  </span>
                  <span className="font-semibold text-black p-1">Awards: </span>{data.Awards}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Cards;
