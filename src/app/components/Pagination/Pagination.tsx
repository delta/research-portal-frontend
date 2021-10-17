import React from "react";
import "./Pagination.css";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}: {
  postsPerPage: any;
  totalPosts: any;
  paginate: any;
  currentPage: any;
}) => {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  const highlight = (number: any) => {
    console.log(number);
  };
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className={currentPage === number ? "active " : ""}>
            <a
              onClick={() => {
                paginate(number);
                highlight(number);
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
