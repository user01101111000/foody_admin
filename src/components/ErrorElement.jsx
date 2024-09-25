import "./ErrorElement.css";

const ErrorComponentForReactQuery = () => {
  return (
    <div className="errorComponentForReactQuery">
      <div className="errorComponentForReactQueryContent">
        <h1>Something went wrong !!!</h1>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    </div>
  );
};

export default ErrorComponentForReactQuery;
