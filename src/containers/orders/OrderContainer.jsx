import "./Order.css";
import { useSelector, useDispatch } from "react-redux";
import PageHeader from "../../components/PageHeader/PageHeader";
import CustomTable from "../../components/CustomTable/CustomTable";
import eye from "../../assets/icons/eye.svg";
import TablePagination from "../../components/TablePagination/TablePagination";
import {
  setOrderData,
  filterProductsByAlphabetic,
  setAllOrderData,
} from "../../redux/features/orderSlice/orderSlice";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import CustomSelect from "../../components/Header/components/CustomSelect";
import useWindowSize from "../../hooks/common/useWindowSize";
import { alertShow } from "../../utils/showAlert";
import { format } from "date-fns";
import useDeleteOrderMutation from "../../hooks/api/useDeleteOrderMutation";

export default function OrderContainer({ orders }) {
  const { visibleOrders, datas } = useSelector((state) => state.orderReducer);
  const [resetAlphabetic, setResetAlphabetic] = useState(null);
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const { mutateAsync } = useDeleteOrderMutation();

  useEffect(() => {
    dispatch(
      setAllOrderData(
        orders.map((item) => ({
          id: item.id.stringValue,
          customerID: item.customerID.stringValue,
          time: format(new Date(+item.time.stringValue), "yyyy-MM-dd"),
          address: item.deliveryAddress.stringValue,
          price: item.amount.stringValue,
          payment: item.paymentMethod.stringValue,
          contact: item.contactNumber.stringValue,
        }))
      )
    );
  }, [orders]);

  async function handleDelete(data) {
    alertShow(async () => {
      await mutateAsync(data[0].data);
    }, t);
  }

  function filterProductsByAlphabeticName(_, value) {
    setResetAlphabetic(value);
    dispatch(
      filterProductsByAlphabetic({
        name: value,
        itemsPerPage: width > 500 ? 10 : 8,
      })
    );
  }

  return (
    <section className="Order">
      <PageHeader
        label={"📋 " + t("Orders")}
        boxes={[
          <CustomSelect
            label={resetAlphabetic || "🕒 " + t("timeFilter")}
            list={["1 - 31 🡩", "31 - 1 🡫"]}
            onChange={filterProductsByAlphabeticName}
            keyName="alphabetic"
            key={"orderCustomSelect"}
          />,
        ]}
      />

      <CustomTable
        body={visibleOrders.map((x) => [
          { data: x.id, type: "id" },
          { data: x.customerID, type: "id" },
          { data: x.time },
          { data: x.address },
          { data: x.price },
          { data: x.payment },
          { data: x.contact, type: "iconly", icon: eye },
        ])}
        head={[
          "ID",
          t("Customer") + " ID",
          t("Time"),
          t("Delivery Address"),
          t("Amount"),
          t("Payment Method"),
          t("Contact"),
        ]}
        editable={{ show: true, onlyDelete: true, handleDelete: handleDelete }}
      />

      <TablePagination
        data={{
          myAllData: datas,
          myAction: setOrderData,
          itemsPerPageCore: { normal: 10, mobile: 8, screenWidth: 500 },
        }}
      />
    </section>
  );
}
