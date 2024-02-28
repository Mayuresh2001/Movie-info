import React from "react";


function Searchbar({  updateParam ,isLoading, setIsLoading, cardHidden, setCardHidden}) {
  
  let searchBox = document.querySelector(".searchbox");
  function clearSearch(){
   searchBox.value = '';
  }

 function name() {
    updateParam((prevParam) => {
      const newParam = new URLSearchParams(prevParam);
      newParam.set('s', searchBox.value);
      return newParam.toString();
    });
    
  }

  return (
    <div className="flex flex-col  justify-center mx-auto w-10/12  mt-10 " >
      <label className="mx-auto w-screen flex justify-center relative" htmlFor='search'>
        <input onFocus={() =>setCardHidden(false)}
          type="text"
          placeholder="Search Any Movies & TV Shows "
          className="searchbox text-sm sm:text-md md:text-xl border-black border-2 w-[70%] md:-ml-32 -ml-16 h-9 md:h-11 px-4 rounded-sm "
          id="search"
          onInput={name}
        />
        {/* clear button */}
        <button onClick={clearSearch} title="Clear" className="absolute right-28 sm:right-36 md:right-52 lg:right-60 top-[10px] mx-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
          
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x md:w-6 md:h-6 h-5 w-5 ">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </label>
      <button
        className="bg-slate-900 text-white text-center mx-auto h-9 md:h-11 md:text-xl text-sm sm:text-md my-6 md:my-1 px-2 rounded-sm "
        type="submit"
        onClick={()=>name()}
        >
        Search
      </button>
    </div>
  );
}

export default Searchbar;
