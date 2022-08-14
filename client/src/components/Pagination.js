import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import DniLista from "./DniLista";
import "../App.css";

export default function Pagination(props) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 4;
  const { data } = props;
  useEffect(() => {
    const endOffset = props.itemOffset + itemsPerPage;
    setCurrentItems(data.slice(props.itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [props.itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    props.setItemOffset(newOffset);
  };

  return (
    <>
      <DniLista
        currentItems={currentItems}
        acceptStatus={props.acceptStatus}
        declineStatus={props.declineStatus}
        open={props.open}
        handleOpen={props.handleOpen}
        status={props.status}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
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
