import { useState } from "react";
import ReactPaginate from "react-paginate";

import UserList from "./UserList";

import "../App.css";

export default function Paginate({ user }) {
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 9;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(user.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="paginate">
      <div className="user-list">
        {user.slice(pagesVisited, pagesVisited + usersPerPage).map((user) => (
          <UserList key={user.email} user={user} />
        ))}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
}
