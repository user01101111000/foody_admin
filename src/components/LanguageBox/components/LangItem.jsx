import "../style/LangItem.css"

export default function LangItem({ data }) {
  const { key, langs, handleLangSelect } = data;

  return (
    <li onClick={() => handleLangSelect(key)}>
      <figure className="lang_fig_img">
        <img src={langs[key]} alt={key} />
      </figure>
    </li>
  );
}
