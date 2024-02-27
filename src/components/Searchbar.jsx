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
    <div className="flex md:flex-row flex-col  md:justify-center justify-center mx-auto w-10/12  mt-10 md:space-x-1" >
      <label className="m-auto w-full text-center relative" htmlFor='search'>
        <input onFocus={() =>setCardHidden(false)}
          type="text"
          placeholder="Search Any Movies & TV Shows "
          className="searchbox -ml-36 text-md md:text-xl border-black border w-2/3 h-9 mx-auto md:h-11 px-4 rounded-sm "
          id="search"
          onInput={name}
        />
        {/* clear button */}
        <button onClick={clearSearch} title="Clear" className="absolute right-[25%] top-[16%] md:top-[10px] ">
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
            className="lucide lucide-x  ">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </label>
      <button
        className="bg-slate-900 text-white h-9 md:h-11 md:text-xl text-md my-4 md:my-1 px-2 rounded-sm -translate-x-52"
        type="submit"
        onClick={()=>name()}
        >
        Search
      </button>
    </div>
  );
}

export default Searchbar;
