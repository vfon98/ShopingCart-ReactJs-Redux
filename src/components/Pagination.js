import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  nextPage,
  previousPage,
  gotoPage
} from "../actions/pagination.actions";

const Pagination = () => {
  const dispatch = useDispatch();
  const pagination = useSelector(state => state.paginationReducer);

  const isActive = pageNumber => pageNumber === pagination.currentPage;
  const isFirstPage = pagination.previous === null;
  const isLastPage = pagination.next === null;

  const paginationItems = [];
  for (let page = 1; page <= pagination.totalPages; page++) {
    paginationItems.push(
      <li className={"page-item" + (isActive(page) && " active")} key={page}>
        <button className="page-link" onClick={() => dispatch(gotoPage(page))}>
          {page}
        </button>
      </li>
    );
  }

  return (
    <div>
      <ul className="pagination justify-content-center">
        <li className={"page-item" + (isFirstPage && " disabled")}>
          <button
            className="page-link"
            onClick={() => dispatch(previousPage())}
          >
            <i className="fa fa-chevron-left"></i>
          </button>
        </li>

        {paginationItems}

        <li className={"page-item" + (isLastPage && " disabled")}>
          <button className="page-link" onClick={() => dispatch(nextPage())}>
            <i className="fa fa-chevron-right"></i>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
