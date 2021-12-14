import "./about.css";

const About = () => {
  return (
    <div className="a">
      <div className="a-left">
        <div className="a-card bg"></div>
        <div className="a-card">
          <img
            src="https://images.pexels.com/photos/4680375/pexels-photo-4680375.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
            alt=""
            className="a-img"
          />
        </div>
      </div>
      <div className="a-right">
        <h1 classname="a-title">About Me</h1>
        <div>
          <p className="a-sub">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia
            libero dicta laborum earum delectus eveniet dignissimos tempora.
            Similique praesentium quas, harum exercitationem hic voluptas culpa.
            Soluta tempore tempora placeat itaque!
          </p>
          <p className="a-desc">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor
            sequi laudantium molestias sunt cumque, nostrum nisi, provident
            quisquam quo nulla veniam delectus accusantium mollitia blanditiis,
            quibusdam quam perferendis corporis repellendus. Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Cum numquam accusantium
            molestias facilis?
          </p>
          <div className="a-award">
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Award-PNG.png"
              className="a-award-img"
            />
            <div className="a-award-texts">
              <h4 className="a-award-title">International Developer</h4>
              <p className="a-award-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                rerum
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
