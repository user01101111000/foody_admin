import "./Products.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import CustomSelect from "../../components/Header/components/CustomSelect";
import ProductList from "./components/ProductList";
import PaginateArea from "../../components/PaginateArea/PaginateArea";
import useWindowSize from "../../hooks/common/useWindowSize";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  setProductsData,
  setAllProducts,
  filterProductsByRestaurant,
  filterProductsByAlphabetic,
} from "../../redux/features/productsSlice/productsSlice";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function ProductsContainer({ products, restaurants }) {
  const [preview, setPreview] = useState([false, null]);
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [resetAlphabetic, setResetAlphabetic] = useState(null);
  const { visibleProducts, filteredProducts } = useSelector(
    (state) => state.productsReducer
  );

  useEffect(() => {
    dispatch(setAllProducts(products));
  }, [products]);

  function filterProductsByRestaurantName(_, value) {
    setResetAlphabetic("🔠 " + t("alphabeticalFilter"));
    dispatch(
      filterProductsByRestaurant({
        name: value,
        itemsPerPage: width > 500 ? 10 : 9,
      })
    );
  }

  function filterProductsByAlphabeticName(_, value) {
    setResetAlphabetic(value);
    dispatch(
      filterProductsByAlphabetic({
        name: value,
        itemsPerPage: width > 500 ? 10 : 9,
      })
    );
  }

  return (
    <article className="Products">
      <AnimatePresence>
        {preview[0] && (
          <motion.div
            className="Products_preview"
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
        label={"📦 " + t("Products")}
        boxes={[
          <CustomSelect
            label={"🍽️ " + t("RestaurantType")}
            list={[t("All"), ...restaurants]}
            onChange={filterProductsByRestaurantName}
            keyName="restaurant"
            zIndex={2}
            key={"productsCustomSelect1"}
          />,

          <CustomSelect
            label={resetAlphabetic || "🔠 " + t("alphabeticalFilter")}
            list={["A-Z", "Z-A"]}
            onChange={filterProductsByAlphabeticName}
            keyName="alphabetic"
            zIndex={1}
            key={"productsCustomSelect2"}
          />,
        ]}
      />

      <ProductList products={visibleProducts} setPreview={setPreview} />

      <PaginateArea
        data={{
          myAllData: filteredProducts,
          myAction: setProductsData,
          itemsPerPageCore: { normal: 10, mobile: 9, screenWidth: 500 },
        }}
      />
    </article>
  );
}
