import "../style/TDComponent.css";
import tableTDCreator from "../../../utils/tableTDCreator";
import edit from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import { useState } from "react";

export default function TDComponent({ td, editable }) {
  const [show, setShow] = useState(false);
  return (
    <tr className="CustomTable_tr">
      {td.map((x, i) => (
        <td key={i}>{tableTDCreator(x, td, show, setShow)}</td>
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
