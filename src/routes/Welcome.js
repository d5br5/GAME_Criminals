import "../styles/Auth.css";
import logo from "../assets/logo.gif";
import Auth from "./Auth";

const Welcome = () => {
  return (
    <div className="welcomeBody">
      <div className="welcome">
        <img src={logo} alt="" className="mainLogo" />
        <h2>
          오직 사진과 이름으로만 <br />
          범죄자의 죄목과 형량을 알아맞힌다!
        </h2>
        <p>
          <strong>게임 시작을 위해 로그인이 필요합니다.</strong>
        </p>
        <Auth />
      </div>
    </div>
  );
};

export default Welcome;
