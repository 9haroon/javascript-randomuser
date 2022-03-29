import { useState } from "react";
import ReactPaginate from "react-paginate";

import UserCard from "./UserCard";

import "./Paginate.scss";

const Paginate = ({ users, handleClick, closeModal }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 12;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="paginate">
      <div className="Cards">
        {users.slice(pagesVisited, pagesVisited + usersPerPage).map((user) => (
          <UserCard
            key={user.email}
            user={user}
            handleClick={handleClick}
            closeModal={closeModal}
          />
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
};

export default Paginate;
