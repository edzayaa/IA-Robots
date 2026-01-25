import "@styles/button_primary.scss";

export default function ButtonPrimary({ content = "Button Content", className = "" }) {
  return (
    <button className={`primary-btn ${className}`}>
      {content}
      <div class="icon">
        <img src="/icons/arrow_right.svg" alt="Arrow pointing right" />
      </div>
    </button>
  );
}
