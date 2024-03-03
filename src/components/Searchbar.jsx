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
      <label className="mx-auto flex w-[80%] justify-center relative" htmlFor='search'>
        <input onFocus={() =>setCardHidden(false)}
          type="text"
          placeholder="Search Any Movies/TV Shows "
          className="searchbox h-8 text-sm sm:text-md md:text-lg border-black w-full md:h-11 px-4 rounded-sm "
         id="search"
          onInput={name}
        />
        {/* clear button */}
        <button onClick={clearSearch} title="Clear" className="absolute
        right-3 mt-2 mb-2 md:
         ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
          
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x  sm:mt-1 md:w-6 md:h-6 h-5 w-4  ">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </label>
      <button
        className="bg-slate-900 text-white mt-7 text-center mx-auto my h-9 md:h-11 md:text-xl text-sm sm:text-md md:my-1 px-2 rounded-sm "
        type="submit"
        onClick={()=>name()}
        >
        Search
      </button>
    </div>
  );
}

export default Searchbar;
