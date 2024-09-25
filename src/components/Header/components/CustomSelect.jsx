import { useEffect, useState } from "react";
import "../style/CustomSelect.css";
import arrow from "../../../assets/icons/arrow_back.svg";

export default function CustomSelect({
  list = [],
  label = "",
  onChange,
  selectedValue = "",
  keyName = "",
  zIndex = 0,
}) {
  const [selectedText, setSelectedText] = useState(selectedValue || label);

  const [show, setShow] = useState(false);

  const liBoxes = list.map((item) => (
    <li key={item} onClick={() => selectedItem(item)}>
      {item}
    </li>
  ));

  function selectedItem(item) {
    setSelectedText(item);
    onChange(keyName, item);
  }

  useEffect(() => {
    setSelectedText(selectedValue || label);
  }, [label, selectedValue]);

  return (
    <div
      className="CustomSelect"
      style={{
        zIndex: zIndex,
      }}
      onClick={() => setShow((prev) => !prev)}
    >
      <h1>{selectedText}</h1>
      <figure className="CustomSelect_arrow_fig">
        <img src={arrow} alt="arrow" />
      </figure>

      {show && <ul className="CustomSelect_list">{liBoxes}</ul>}
    </div>
  );
}
