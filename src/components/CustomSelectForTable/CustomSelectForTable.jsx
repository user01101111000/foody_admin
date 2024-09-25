import "./CustomSelectForTable.css";
import { IoMdArrowDropdown } from "react-icons/io";

import { useState } from "react";

export default function CustomSelectForTable({
  datas = [],
  label = "",
  onChange = () => {},
  selectedValue = "",
  keyName = "",
}) {
  const [selectedText, setSelectedText] = useState(selectedValue || label);

  const [show, setShow] = useState(false);

  const liBoxes = datas.map((item) => (
    <li key={item} onClick={() => selectedItem(item)}>
      {item}
    </li>
  ));

  function selectedItem(item) {
    setSelectedText(item);
    onChange(keyName, item);
  }

  return (
    <div className="CustomSelect2" onClick={() => setShow((prev) => !prev)}>
      <h1>{selectedText}</h1>
      <IoMdArrowDropdown className="CustomSelect2_arrow" />

      {show && <ul className="CustomSelect_list2">{liBoxes}</ul>}
    </div>
  );
}
