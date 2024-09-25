import "../style/ProductList.css";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { container, item } from "../../../utils/framerMotionVariables";

export default function ProductList({ products, setPreview }) {
  const productBoxes = products.map((product, i) => (
    <ProductCard key={i} {...product} item={item} setPreview={setPreview}/>
  ));

  return (
    <motion.div
      className="ProductList"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {productBoxes}
    </motion.div>
  );
}
