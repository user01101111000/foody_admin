import "./Modal.css";
import close from "../../assets/icons/close.svg";
import { AnimatePresence, motion } from "framer-motion";

export default function Modal({ children, show, setShow }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.article
          className="modalWrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="Modal"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            {children}

            <figure
              className="close_modal_img_fig"
              onClick={() => setShow(false)}
            >
              <img src={close} alt="close" />
            </figure>
          </motion.div>
        </motion.article>
      ) : null}
    </AnimatePresence>
  );
}
