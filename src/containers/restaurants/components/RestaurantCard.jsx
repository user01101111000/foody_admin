import "../style/RestaurantCard.css";
import { motion } from "framer-motion";
import edit_img from "../../../assets/icons/edit.svg";
import delete_img from "../../../assets/icons/delete.svg";
import Modal from "../../../components/Modal/Modal";
import AddRestaurantContent from "../../../components/Contents/AddRestaurantContent";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { alertShow } from "../../../utils/showAlert";
import useDeleteRestaurantMutation from "../../../hooks/api/useDeleteRestaurantMutation";
import Skeleton from "../../../components/skeleton/Skeleton";

export default function RestaurantCard({
  id,
  name,
  image,
  price,
  address,
  category,
  cuisine,
  minute,
  item,
  setPreview,
}) {
  const [show, setShow] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const { t } = useTranslation();

  const { mutateAsync } = useDeleteRestaurantMutation();

  async function deleteRestaurant() {
    alertShow(async () => {
      await mutateAsync(id.stringValue);
    }, t);
  }

  useEffect(() => {
    const img = new Image();
    img.src = image.stringValue;
    img.onload = () => {
      setShowImg(true);
    };
  }, [image.stringValue]);

  return (
    <motion.div className="RestaurantCard" variants={item}>
      {showImg ? (
        <figure
          className="RestaurantCard_img_fig"
          onClick={() => setPreview([true, { name, image }])}
        >
          <img src={image.stringValue} alt={name.stringValue} loading="lazy" />
        </figure>
      ) : (
        <Skeleton
          key={id.stringValue}
          width={"5rem"}
          height={"5rem"}
          borderRadius="5px"
          backgroundColor="#1E1E30"
        />
      )}

      <div className="RestaurantCard_info">
        <h1>{name.stringValue}</h1>
        <p>{category.stringValue}</p>
      </div>

      <div className="RestaurantCard_icons">
        <img src={edit_img} alt="edit" onClick={() => setShow(true)} />
        <img src={delete_img} alt="delete" onClick={deleteRestaurant} />
      </div>

      <Modal setShow={setShow} show={show}>
        <AddRestaurantContent
          setShow={setShow}
          initialValues={{
            file: "",
            id: id.stringValue,
            name: name.stringValue,
            cuisine: cuisine.stringValue,
            price: price.stringValue,
            minute: minute.stringValue,
            address: address.stringValue,
            category: category.stringValue,
          }}
          itsEdit={true}
        />
      </Modal>
    </motion.div>
  );
}
