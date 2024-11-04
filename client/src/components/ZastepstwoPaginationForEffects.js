import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Studenci from "./ZastepstwoStudenci";
import "../App.css";

function ZastepstwoPaginationForEffects(props) {
  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 4;
  const { data } = props;
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };
  return (
    <>
      <Studenci
        currentItems={currentItems}
        open={props.open}
        handleOpen={props.handleOpen}
        setEfekt={props.setEfekt}
        efekt={props.efekt}
        setOpis={props.setOpis}
        checkStudent={props.checkStudent}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={4}
        marginPagesDisplayed={0}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
    </>
  );
}

export default ZastepstwoPaginationForEffects;
