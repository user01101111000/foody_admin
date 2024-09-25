import "./PaginateArea.css";

import { usePagination } from "@mantine/hooks";
import { useEffect } from "react";

import useWindowSize from "../../hooks/common/useWindowSize";

import arrowLeft from "../../assets/icons/arrow_left.svg";
import arrowRight from "../../assets/icons/arrow_right.svg";

import { useDispatch } from "react-redux";

export default function PaginateArea({ data }) {
  const { myAllData, myAction, itemsPerPageCore } = data;

  const dispatch = useDispatch();

  const { width } = useWindowSize();

  const itemsPerPage =
    width > itemsPerPageCore.screenWidth
      ? itemsPerPageCore.normal
      : itemsPerPageCore.mobile;

  useEffect(() => {
    dispatch(
      myAction({
        start: 0,
        end: itemsPerPage,
      })
    );
  }, []);

  useEffect(() => {
    if (width > 1000) {
      dispatch(
        myAction({
          start: 0,
          end: itemsPerPage,
        })
      );
    }
    if (width < 500) {
      dispatch(
        myAction({
          start: 0,
          end: itemsPerPage,
        })
      );
    }
  }, [width]);

  const pagination = usePagination({
    total: Math.ceil(myAllData.length / itemsPerPage),
    initialPage: 1,
    onChange(page) {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;

      dispatch(
        myAction({
          start: start,
          end: end,
        })
      );
    },
  });

  return (
    <div className="pagination_area">
      <button onClick={() => pagination.previous()} className="pagination_btn">
        <img src={arrowLeft} alt="" />
      </button>
      {pagination.range.map((range, i) =>
        range == "dots" ? (
          <button key={i} className="pagination_btn">
            {"..."}
          </button>
        ) : (
          <button
            key={i}
            onClick={() => pagination.setPage(range)}
            className={`pagination_btn ${
              pagination.active === range ? "activePag" : ""
            }`}
          >
            {range}
          </button>
        )
      )}
      <button onClick={() => pagination.next()} className="pagination_btn">
        <img src={arrowRight} alt="" />
      </button>
    </div>
  );
}
