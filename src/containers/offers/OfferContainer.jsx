import "./Offer.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import Modal from "../../components/Modal/Modal";
import CustomTable from "../../components/CustomTable/CustomTable";
import TablePagination from "../../components/TablePagination/TablePagination";
import AddOfferContent from "../../components/Contents/AddOfferContent";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setOfferData,
  filterProductsByAlphabetic,
  setAllOfferData,
} from "../../redux/features/offerSlice/offerSlice";
import { showToast } from "../../utils/showToast";
import useWindowSize from "../../hooks/common/useWindowSize";
import { useTranslation } from "react-i18next";
import CustomSelect from "../../components/Header/components/CustomSelect";
import { alertShow } from "../../utils/showAlert";
import useCreateOfferMutation from "../../hooks/api/useCreateOfferMutation";
import useDeleteOfferMutation from "../../hooks/api/useDeleteOfferMutation";
import useUpdateOfferMutation from "../../hooks/api/useUpdateOfferMutation";

export default function OfferContainer({ offers }) {
  const [show, setShow] = useState(false);
  const [resetAlphabetic, setResetAlphabetic] = useState(null);
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const { datas, visibleOffers } = useSelector((state) => state.offerReducer);
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState([]);
  const [itsEdit, setItsEdit] = useState(false);

  const { mutateAsync } = useCreateOfferMutation();
  const { mutateAsync: deleteOffer } = useDeleteOfferMutation();
  const { mutateAsync: updateOffer } = useUpdateOfferMutation();

  useEffect(() => {
    dispatch(
      setAllOfferData(
        offers.map((item) => ({
          id: item.id.stringValue,
          name: item.title.stringValue,
          description: item.description.stringValue,
          image: item.image.stringValue,
        }))
      )
    );
  }, [offers]);

  function handleEdit(data) {
    setShow(true);
    setInitialValues(data);
    setItsEdit(true);
  }

  async function handleDelete(data) {
    alertShow(async () => {
      await deleteOffer(data[0].data);
    }, t);
  }

  async function addOfferCallBack(values) {
    if (itsEdit) {
      const data = {
        ...values,
        id: initialValues[0].data,
      };

      await updateOffer(data);

      showToast(t("toast33"));
    } else {
      await mutateAsync(values);
      showToast(t("toast3"));
    }
    setShow(false);
  }

  function filterProductsByAlphabeticName(_, value) {
    setResetAlphabetic(value);
    dispatch(
      filterProductsByAlphabetic({
        name: value,
        itemsPerPage: width > 500 ? 6 : 8,
      })
    );
  }

  return (
    <section className="Offer">
      <PageHeader
        label={"📣 " + t("Offers")}
        boxes={[
          <CustomSelect
            label={resetAlphabetic || "🔠 " + t("alphabeticalFilter")}
            list={["A-Z", "Z-A"]}
            onChange={filterProductsByAlphabeticName}
            keyName="alphabetic"
            key={"offerCustomSelect"}
          />,
          <button
            className="addOffer_btn"
            onClick={() => {
              setShow(true);
              setItsEdit(false);
              setInitialValues({});
            }}
            key={"addOffer_btn_key"}
          >
            📣 {t("AddOffer")}
          </button>,
        ]}
      />

      <CustomTable
        body={visibleOffers.map((x) => [
          { data: x.id, type: "id" },
          { data: x.image, type: "image" },
          { data: x.name },
          { data: x.description },
        ])}
        head={["ID", t("Image"), t("Title"), t("Description")]}
        editable={{
          show: true,
          handleEdit: handleEdit,
          handleDelete: handleDelete,
        }}
      />

      <TablePagination
        data={{
          myAllData: datas,
          myAction: setOfferData,
          itemsPerPageCore: { normal: 6, mobile: 8, screenWidth: 500 },
        }}
      />

      <Modal show={show} setShow={setShow}>
        <AddOfferContent
          initialValues={initialValues}
          callback={addOfferCallBack}
          setShow={setShow}
          itsEdit={itsEdit}
        />
      </Modal>
    </section>
  );
}
