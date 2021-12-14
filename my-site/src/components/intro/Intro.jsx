import "./intro.css";
const Intro = () => {
  return (
    <div className="i">
      <div className="i-left">
        <div className="i-left-wrapper">
          <h2 className="i-intro">Hello, I am</h2>
          <h1 className="i-name">Swikriti Neupane</h1>
          <div className="i-title">
            <div className="i-title-wrapper">
              <div className="i-title-item">React.js Developer</div>
              <div className="i-title-item">Photographer</div>
              <div className="i-title-item">Writer</div>
              <div className="i-title-item">Influencer</div>
              <div className="i-title-item">Content Creator</div>
            </div>
          </div>
          <p className="i-desc">
            I design and develop services for various companies.Lorem Ipsum is
            simply dummy text of the printing and typesetting industry. Lorem he
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the humour and the like).
          </p>
        </div>
        <div className="buttonscroll">
          <button className="i-scroll">scroll</button>
        </div>
      </div>
      <div className="i-right">
        <div className="i-right-wrapper">
          <div className="i-bg">
            <img
              src="https://okayswikhome.files.wordpress.com/2021/06/9f178255-8c6e-40d1-a0e1-43e713988c46.jpeg?w=1024"
              alt="Swikriti Neupane"
              className="i-image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
