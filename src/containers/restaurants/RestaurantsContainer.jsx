import "./Restaurant.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import CustomSelect from "../../components/Header/components/CustomSelect";
import Modal from "../../components/Modal/Modal";
import AddRestaurantContent from "../../components/Contents/AddRestaurantContent.jsx";
import RestaurantList from "./components/RestaurantList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterRestaurantsByCategory,
  setRestaurantsData,
  filterProductsByAlphabetic,
  setAllRestaurantsData,
} from "../../redux/features/restaurantSlice/restaurantSllice";
import PaginationArea from "../../components/PaginateArea/PaginateArea";
import { useTranslation } from "react-i18next";
import useWindowSize from "../../hooks/common/useWindowSize";
import { motion, AnimatePresence } from "framer-motion";

export default function RestaurantsContainer({ restaurants, categories }) {
  const [preview, setPreview] = useState([false, null]);
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [resetAlphabetic, setResetAlphabetic] = useState(null);

  const { filteredRestaurants, visibleRestaurants } = useSelector(
    (state) => state.restaurantReducer
  );

  useEffect(() => {
    dispatch(setAllRestaurantsData(restaurants));
  }, [restaurants]);

  function filterProductsByCategoryName(_, value) {
    setResetAlphabetic("🔠 " + t("alphabeticalFilter"));
    dispatch(
      filterRestaurantsByCategory({
        name: value,
        itemsPerPage: width > 500 ? 9 : 10,
      })
    );
  }

  function filterProductsByAlphabeticName(_, value) {
    setResetAlphabetic(value);
    dispatch(
      filterProductsByAlphabetic({
        name: value,
        itemsPerPage: width > 500 ? 9 : 10,
      })
    );
  }

  return (
    <article className="Restaurant">
      <AnimatePresence>
        {preview[0] && (
          <motion.div
            className="restaurant_preview"
            onClick={() => {
              setPreview([false, null]);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "just",
              stiffness: 260,
              damping: 20,
            }}
          >
            <figure>
              <img
                src={preview[1].image.stringValue}
                alt={preview[1].name.stringValue}
              />
            </figure>
          </motion.div>
        )}
      </AnimatePresence>

      <PageHeader
        label={"🍽️ " + t("Restaurants")}
        boxes={[
          <CustomSelect
            label={"🗂️ " + t("CategoryType")}
            list={[t("All"), ...categories]}
            onChange={filterProductsByCategoryName}
            keyName="restaurants"
            zIndex={2}
            key={"restaurantsCustomSelect"}
          />,

          <button
            className="AddRestaurant_btn"
            onClick={() => setShow(true)}
            key={"AddRestaurant_btn_key"}
          >
            🍽️ {t("AddRestaurant")}
          </button>,
        ]}
        key={"RestaurantPageHeader"}
      />

      <PageHeader
        label={"🔠 " + t("alhabeticalFilterTitle")}
        boxes={[
          <CustomSelect
            label={resetAlphabetic || "🔠 " + t("alphabeticalFilter")}
            list={["A-Z", "Z-A"]}
            onChange={filterProductsByAlphabeticName}
            keyName="alphabetic"
            zIndex={1}
            key={"restaurantsCustomSelect2"}
          />,
        ]}
        key={"RestaurantPageHeader2"}
      />

      <RestaurantList
        restaurants={visibleRestaurants}
        setPreview={setPreview}
      />

      <PaginationArea
        data={{
          myAllData: filteredRestaurants,
          myAction: setRestaurantsData,
          itemsPerPageCore: { normal: 9, mobile: 10, screenWidth: 500 },
        }}
      />

      <Modal setShow={setShow} show={show}>
        <AddRestaurantContent setShow={setShow} itsEdit={false} />
      </Modal>
    </article>
  );
}
