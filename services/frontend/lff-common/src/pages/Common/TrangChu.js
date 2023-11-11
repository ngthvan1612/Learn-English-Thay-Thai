import background from "../../assets/images/5515.svg";
import study from "../../assets/images/5514.svg";
import "./style.scss";

const TrangChu = () => {
  return (
    <>
      <section className="homepage">
        <div className="homepage-background">
          <img className="background-img" src={background} />
          <div className="content">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </div>
          <img className="study" src={study} alt="study" />
          <div className="about"></div>
        </div>
      </section>
    </>
  );
};

export default TrangChu;
