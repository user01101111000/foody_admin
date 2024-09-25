import "./PageHeader.css";

import { motion } from "framer-motion";

export default function PageHeader({ label, boxes = [] }) {
  const warpperBoxes = boxes.map((box, i) => (
    <div key={i} className="pageHeader_box_wrapper">
      {box}
    </div>
  ));

  return (
    <motion.div
      className="PageHeader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <h1>{label}</h1>

      <div className="PageHeaderBoxes">{warpperBoxes}</div>
    </motion.div>
  );
}
