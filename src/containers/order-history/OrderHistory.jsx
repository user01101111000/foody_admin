import "./OrderHistory.css";
import { useSelector, useDispatch } from "react-redux";
import {
  setOrderData,
  filterProductsByAlphabetic,
  setAllOrderHData,
} from "../../redux/features/orderHSlice/orderHSlice";
import PageHeader from "../../components/PageHeader/PageHeader";
import CustomTable from "../../components/CustomTable/CustomTable";
import eye from "../../assets/icons/eye.svg";
import TablePagination from "../../components/TablePagination/TablePagination";
import { useTranslation } from "react-i18next";
import CustomSelect from "../../components/Header/components/CustomSelect";
import useWindowSize from "../../hooks/common/useWindowSize";
import { useEffect, useState } from "react";
import { format } from "date-fns";

export default function OrderHistoryContainer({ orders }) {
  const { datas, visibleOrders } = useSelector((state) => state.orderHReducer);
  const [resetAlphabetic, setResetAlphabetic] = useState(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { width } = useWindowSize();

  useEffect(() => {
    dispatch(
      setAllOrderHData(
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
    <section className="OrderH">
      <PageHeader
        label={"📜 " + t("OrderHistory")}
        boxes={[
          <CustomSelect
            label={resetAlphabetic || "🕓 " + t("timeFilter")}
            list={["1 - 31 🡩", "31 - 1 🡫"]}
            onChange={filterProductsByAlphabeticName}
            keyName="alphabetic"
            key={"orderHCustomSelect"}
          />,
        ]}
      />

      <CustomTable
        body={visibleOrders.map((x) => [
          { data: x.id, type: "id" },
          { data: x.customerID, type: "id" },
          { data: x.time },
          { data: x.address },
          { data: `${x.price}` },
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
