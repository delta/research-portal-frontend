import React from "react";

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
}: {
  postsPerPage: any;
  totalPosts: any;
  paginate: any;
}) => {
  const pageNumbers = [];

  for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            style={{
              cursor: "pointer",
              float: "left",
              display: "block",
              color: "red",
              padding: "12px",
            }}
            key={number}
            className="hover:bg-red-200"
          >
            <a onClick={() => paginate(number)}>{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
