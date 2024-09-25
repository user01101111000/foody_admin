import "./Category.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal/Modal";
import AddCategoryContent from "../../components/Contents/AddCategoryContent";
import CustomTable from "../../components/CustomTable/CustomTable";
import TablePagination from "../../components/TablePagination/TablePagination";
import { useSelector, useDispatch } from "react-redux";
import {
  setCategoryData,
  filterProductsByAlphabetic,
  setAllCategoryData,
} from "../../redux/features/categorySlice/categorySlice";

import { useTranslation } from "react-i18next";
import useWindowSize from "../../hooks/common/useWindowSize";
import CustomSelect from "../../components/Header/components/CustomSelect";
import { alertShow } from "../../utils/showAlert";

import useDeleteCategoryMutation from "../../hooks/api/useDeleteCategoryMutation";

export default function CategoryContainer({ categories }) {
  const { mutateAsync } = useDeleteCategoryMutation();

  const { t } = useTranslation();
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const [resetAlphabetic, setResetAlphabetic] = useState(null);
  const [itsEdit, setItsEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [initialValues, setInitialValues] = useState([]);

  const { datas, visibleCategory } = useSelector(
    (state) => state.categoryReducer
  );

  useEffect(() => {
    dispatch(
      setAllCategoryData(
        categories.map((item) => ({
          id: item.id.stringValue,
          name: item.name.stringValue,
          slug: item.slug.stringValue,
          image: item.image.stringValue,
        }))
      )
    );
  }, [categories]);

  function handleEdit(values) {
    setInitialValues(values);
    setShow(true);

    setItsEdit(true);
  }

  function handleDelete(values) {
    alertShow(async () => {
      await mutateAsync(values[0].data);
    }, t);
  }

  function filterProductsByAlphabeticName(_, value) {
    setResetAlphabetic(value);
    dispatch(
      filterProductsByAlphabetic({
        name: value,
        itemsPerPage: width > 500 ? 5 : 10,
      })
    );
  }

  return (
    <section className="Category">
      <PageHeader
        label={"🗂️ " + t("Category")}
        boxes={[
          <CustomSelect
            label={resetAlphabetic || "🔠 " + t("alphabeticalFilter")}
            list={["A-Z", "Z-A"]}
            onChange={filterProductsByAlphabeticName}
            keyName="alphabetic"
            key={"categoryCustomSelect"}
          />,
          <button
            className="Category_add_btn"
            onClick={() => {
              setShow(true);
              setItsEdit(false);
              setInitialValues({});
            }}
            key={"categoryAddBtn"}
          >
            🗂️ {t("AddCategory")}
          </button>,
        ]}
      />

      <CustomTable
        head={["ID", t("Image"), t("Name"), t("Slug")]}
        body={visibleCategory.map((x) => [
          { data: x.id, type: "id" },
          { data: x.image, type: "image" },
          { data: x.name },
          { data: x.slug },
        ])}
        editable={{
          show: true,
          handleEdit: handleEdit,
          handleDelete: handleDelete,
        }}
      />

      <TablePagination
        data={{
          myAllData: datas,
          myAction: setCategoryData,
          itemsPerPageCore: { screenWidth: 500, normal: 5, mobile: 10 },
        }}
      />

      <Modal show={show} setShow={setShow}>
        <AddCategoryContent
          initialValues={initialValues}
          setShow={setShow}
          itsEdit={itsEdit}
        />
      </Modal>
    </section>
  );
}
