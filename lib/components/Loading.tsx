import loader from "../assets/loading.gif";

export default function Loading() {
  return (
    <div
      style={{
        display: "grid",
        placeItems: "center",
        position: "absolute",
        inset: 0,
        background: "#000000dd",
        zIndex: 300,
      }}
    >
      <img
        style={{ borderRadius: "50%", width: "100px" }}
        src={loader}
        alt=""
      />
    </div>
  );
}
