import "./CustomTable.css";
import TDComponent from "./components/TDComponent";
import { motion } from "framer-motion";

export default function CustomTable({ head = [], body = [], editable = {} }) {
  const ths = head.map((th, i) => <th key={i}>{th}</th>);
  const tds = body.map((td) => (
    <TDComponent key={td[0]?.data} td={td} editable={editable} />
  ));
  return (
    <motion.div
      className="CustomTable_wrapper"
      initial={{ opacity: 0.8 }}
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <table className="CustomTable">
        <thead>
          <tr>{ths}</tr>
        </thead>

        <tbody>{tds}</tbody>
      </table>
    </motion.div>
  );
}
