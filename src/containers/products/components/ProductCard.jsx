import "../style/ProductCard.css";
import edit from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "../../../components/Modal/Modal";
import AddProductContent from "../../../components/Contents/AddProductContent";
import { useTranslation } from "react-i18next";
import { alertShow } from "../../../utils/showAlert";
import useDeleteProductsMutation from "../../../hooks/api/useDeleteProductsMutation";

export default function ProductCard({
  id,
  name,
  image,
  price,
  restaurant,
  item,
  description,
  setPreview,
}) {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const { mutateAsync } = useDeleteProductsMutation();

  async function deleteProductCallback() {
    alertShow(async () => {
      await mutateAsync(id.stringValue);
    }, t);
  }

  return (
    <motion.div className="ProductCard" variants={item}>
      <figure
        className="ProductCard_img_fig"
        onClick={() => setPreview([true, { name, image }])}
      >
        <img src={image.stringValue} alt={name.stringValue} loading="lazy" />
      </figure>

      <div className="ProductCard_info">
        <div className="ProductCard_info_names">
          <h1>{name.stringValue}</h1>
          <p>{restaurant.stringValue}</p>
        </div>

        <div className="ProductCard_info_footer">
          <h1>{price.stringValue} $</h1>

          <div className="ProductCard_info_footer_icons">
            <img
              className="ProductCard_info_footer_icons_edit"
              src={edit}
              alt="edit"
              onClick={() => setShow(true)}
            />

            <img
              className="ProductCard_info_footer_icons_delete"
              src={deleteIcon}
              alt="delete"
              onClick={deleteProductCallback}
            />
          </div>
        </div>
      </div>

      <Modal show={show} setShow={setShow}>
        <AddProductContent
          label={{ keyName: "Edit", buttonName: "Update Product" }}
          initialValues={{
            id: id.stringValue,
            file: "",
            name: name.stringValue,
            description: description.stringValue,
            price: price.stringValue,
            restaurant: restaurant.stringValue,
          }}
          setShow={setShow}
          itsEdit={true}
        />
      </Modal>
    </motion.div>
  );
}
