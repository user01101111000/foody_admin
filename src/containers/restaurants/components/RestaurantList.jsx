import "../style/RestaurantList.css";
import { motion } from "framer-motion";
import RestaurantCard from "./RestaurantCard";
import { container, item } from "../../../utils/framerMotionVariables";

export default function RestaurantList({ restaurants, setPreview }) {
  const productBoxes = restaurants.map((restaurant, i) => (
    <RestaurantCard
      key={i}
      {...restaurant}
      item={item}
      setPreview={setPreview}
    />
  ));

  return (
    <motion.div
      className="RestaurantList"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {productBoxes}
    </motion.div>
  );
}
