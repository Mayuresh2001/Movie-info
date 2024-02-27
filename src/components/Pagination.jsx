import React,{useEffect, useState} from 'react'
import ReactPaginate from 'react-paginate'

function Pagination({updateParam, results}) {

  const [pages, setPages]= useState(0)

 const handlePageChange= (selected)=>{
   updateParam((prevParam) => {
   const newParam = new URLSearchParams(prevParam);
   newParam.set('page', selected + 1);
      return newParam.toString();
    });
  }
  
  
  const noOfPages = Math.ceil(results / 10); 
  useEffect(() => {
    setPages(noOfPages);
  }, []);

  // const disableButton = true; //change this value to false and the button will be clickable
  // const nextButton = document.getElementsByClassName('.next-link');
  // const prevButton = document.getElementsByClassName('.previous-link');
  
  // if (pages === 1) {nextButton.disabled = true};
  // if (pages === noOfPages) {
  //   nextButton.disabled =true;
  //   nextButton.classList.add('btn-disabled');
  //   console.log('prevButton[0]',prevButton[0])
  //   // prevButton[0].classList.remove('btn-disabled')
  // }
  return (
    <div onClick={(prev)=> prev  }>
  <ReactPaginate
  breakLabel={'...'}
  previousLabel={"Previous"}
  nextLabel={"Next"}
  pageCount={pages}
  marginPagesDisplayed={3} 
  pageRangeDisplayed={5}
  onPageChange={({ selected }) => handlePageChange(selected)}
  containerClassName={'pagination-container'}
  pageClassName={'text-xl'}
  pageLinkClassName={'pagination-number'}
  activeClassName={''}
  activeLinkClassName={'pagination-active'}
  previousClassName={'text-white'}
  previousLinkClassName={'arrow'}
  nextClassName={'text-xl'}
nextLinkClassName={'arrow'}
  
  next/>

  </div>
  )
}

export default Pagination