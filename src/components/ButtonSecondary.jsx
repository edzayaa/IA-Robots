import "@styles/button_secondary.scss";
export default function ButtonSecondary({ content = "Sec Button Content" }) {
  return (
    <button className="secondary-btn">
      {content}
    </button>
  );
}
