import "../style/TDComponent.css";
import tableTDCreator from "../../../utils/tableTDCreator";
import edit from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import { useEffect, useState } from "react";
import Skeleton from "../../skeleton/Skeleton";

export default function TDComponent({ td, editable }) {
  const [show, setShow] = useState(false);
  const [showImg, setShowImg] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = td[1].data;
    img.onload = () => {
      setShowImg(true);
    };
  }, [td[1].data]);

  return (
    <tr className="CustomTable_tr">
      {td.map((x, i) => (
        <td key={i}>
          {showImg || x.type != "image" ? (
            tableTDCreator(x, td, show, setShow, setShowImg)
          ) : (
            <Skeleton
              width="3.5rem"
              height="3.5rem"
              borderRadius="6px"
              backgroundColor="#1E1E30"
            />
          )}
        </td>
      ))}

      {editable?.show && (
        <td className="editButtons_table_td">
          <div className="editButtons_table">
            {!editable?.onlyDelete && (
              <img
                src={edit}
                alt="edit"
                onClick={() => editable.handleEdit(td)}
              />
            )}
            <img
              src={deleteIcon}
              alt="delete"
              onClick={() => editable.handleDelete(td)}
            />
          </div>
        </td>
      )}
    </tr>
  );
}
