import { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import "styling/App.scss";

const override: CSSProperties = {
  display: "block",
};

export default function Spinner() {
  return (
    <div className="spinner">
      <SyncLoader color="#36d7b7" style={override} />
    </div>
  );
}
