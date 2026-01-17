import "./TitleComponent.style.scss";

function TitleComponent({ title, subtitle }) {
    return <div className="search-title-container">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>
}

export default TitleComponent;