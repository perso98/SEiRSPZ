import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import DniLista from "./DniLista";
import "../App.css";

export default function Pagination(props) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
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
      <DniLista
        currentItems={currentItems}
        changeStatus={props.changeStatus}
        open={props.open}
        handleOpen={props.handleOpen}
        status={props.status}
        statusOpiekuna={props.statusOpiekuna}
        dzienniczek={props.dzienniczek}
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
