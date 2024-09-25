import "./Skeleton.css";

const Skeleton = ({
  width,
  height,
  borderRadius = "0px",
  gridArea = "auto",
}) => {
  return (
    <div
      className="skeleton"
      style={{ width, height, borderRadius, gridArea }}
    ></div>
  );
};

export default Skeleton;
