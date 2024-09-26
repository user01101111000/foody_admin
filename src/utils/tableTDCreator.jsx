import { FaWhatsapp } from "react-icons/fa";

function tableTDCreator(singleData, row, show, setShow, setShowImg) {
  switch (singleData?.type) {
    case "image":
      return (
        <figure className="CustomTable_img_fig">
          <img
            src={singleData.data}
            alt={"image_" + row[0].data}
            loading="lazy"
            onLoad={() => setShowImg(true)}
          />
        </figure>
      );

    case "id":
      return <span className="CustomTable_id">{singleData.data}</span>;

    case "iconly": {
      return (
        <div className="CustomTable_iconly">
          <h1>
            <a
              style={{
                color: "green",
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                justifyContent: "center",
              }}
              href={`https://wa.me/${singleData.data}`}
              target="_blank"
            >
              <FaWhatsapp style={{ color: "green", fontSize: "1.2rem" }} />
              {show
                ? singleData.data
                : singleData.data.toString().replace(/./g, "*")}
            </a>
          </h1>

          <figure
            className="CustomTable_iconly_img_fig"
            onClick={() => setShow((prev) => !prev)}
          >
            <img src={singleData.icon} alt="icon" />
          </figure>
        </div>
      );
    }

    default:
      return <p className="normalTDText">{singleData.data}</p>;
  }
}

export default tableTDCreator;
