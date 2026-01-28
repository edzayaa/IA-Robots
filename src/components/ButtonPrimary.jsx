import "@styles/button_primary.scss";

export default function ButtonPrimary({
  content = "Button Content",
  className = "",
  type = "button",
  href = "",
}) {
  if (type == "a") {
    return (
      <a className={`primary-btn ${className}`} href={href}>
        <ButtonPrimaryInner {...{ content, className, tag: type }} />
      </a>
    );
  }

  if (type == "button") {
    return (
      <button className={`primary-btn ${className}`}>
        <ButtonPrimaryInner {...{ content, className, tag: type }} />
      </button>
    );
  }
}

function ButtonPrimaryInner({ content }) {
  return (
    <>
      {content}
      <div className="icon">
        <img src="/icons/arrow_right.svg" alt="Arrow pointing right" />
      </div>
    </>
  );
}
