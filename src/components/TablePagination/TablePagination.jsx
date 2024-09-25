import "./TablePagination.css";

import { usePagination } from "@mantine/hooks";
import { useEffect } from "react";

import useWindowSize from "../../hooks/common/useWindowSize";

import arrowLeft from "../../assets/icons/arrow_left.svg";
import arrowRight from "../../assets/icons/arrow_right.svg";

import { useDispatch } from "react-redux";
import CustomSelectForTable from "../CustomSelectForTable/CustomSelectForTable";
import { motion } from "framer-motion";

export default function TablePagination({ data }) {
  const { myAllData, myAction, itemsPerPageCore } = data;

  const dispatch = useDispatch();

  const { width } = useWindowSize();

  const itemsPerPage =
    width > itemsPerPageCore.screenWidth
      ? itemsPerPageCore.normal
      : itemsPerPageCore.mobile;

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

  function handleSelect(_, value) {
    pagination.setPage(+value);
  }

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

  return (
    <motion.div
      className="pagination_area_box"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="pagination_area2">
        <button
          onClick={() => pagination.previous()}
          className="pagination_btn2"
        >
          <img src={arrowLeft} alt="" />
        </button>
        {pagination.range.map((range, i) =>
          range == "dots" ? (
            <button key={i} className="pagination_btn2">
              {"..."}
            </button>
          ) : (
            <button
              key={i}
              onClick={() => pagination.setPage(range)}
              className={`pagination_btn2 ${
                pagination.active === range ? "activePag2" : ""
              }`}
            >
              {range}
            </button>
          )
        )}
        <button onClick={() => pagination.next()} className="pagination_btn2">
          <img src={arrowRight} alt="" />
        </button>
      </div>

      <CustomSelectForTable
        label="1"
        datas={pagination.range}
        onChange={handleSelect}
      />
    </motion.div>
  );
}
