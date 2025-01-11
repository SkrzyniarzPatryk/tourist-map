import React, { useState } from "react";
import { Pagination } from "react-bootstrap";

const changePage = (page) => {};

function Paginator({ pointsData }) {
  const [paginatedQuery, setPaginatedQuery] = useState({
    page: 1,
    pageSize: 2,
  });

  return (
    <Pagination className="justify-content-center mt-4">
      <Pagination.First
        disabled={pointsData.prev === null}
        onClick={() => changePage(pointsData.first)}
      />
      <Pagination.Prev
        disabled={pointsData.prev === null}
        onClick={() => pointsData.prev && changePage(pointsData.prev)}
      />
      {Array.from({ length: pointsData.pages }, (_, idx) => (
        <Pagination.Item
          key={idx + 1}
          active={paginatedQuery.page === idx + 1}
          onClick={() => changePage(idx + 1)}
        >
          {idx + 1}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={pointsData.next === null}
        onClick={() => pointsData.next && changePage(pointsData.next)}
      />
      <Pagination.Last
        disabled={pointsData.next === null}
        onClick={() => changePage(pointsData.last)}
      />
    </Pagination>
  );
}
export default Paginator;
