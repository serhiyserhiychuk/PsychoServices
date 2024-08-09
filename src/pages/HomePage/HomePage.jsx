import css from "./HomePage.module.css";
import svg from "../../../public/icons.svg";
import imageSrc from "../../../public/psychologist.png";

import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className={css.maindiv}>
      <div className={css.div}>
        <h1 className={css.title}>
          The road to the <span className={css.span}>depths</span> of the human
          soul
        </h1>
        <p className={css.text}>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <button
          className={css.btn}
          onClick={() => {
            navigate("/psychologists");
          }}
        >
          Get started
          <svg className={css.icon}>
            <use href={svg + "#icon-right-up"}></use>
          </svg>
        </button>
      </div>
      <div className={css.imagediv}>
        <img className={css.image} src={imageSrc} alt="psychologist" />
        <div className={css.users}>
          <svg className={css.icon}>
            <use href={svg + "#icon-users"}></use>
          </svg>
        </div>
        <div className={css.question}>
          <svg className={css.icon}>
            <use href={svg + "#icon-question"}></use>
          </svg>
        </div>
        <div className={css.checkdiv}>
          <div className={css.check}>
            <svg className={css.checkicon}>
              <use href={svg + "#icon-check"}></use>
            </svg>
          </div>
          <div className={css.textdiv}>
            <p className={css.label}>Experienced psychologists</p>
            <p className={css.num}>15,000</p>
          </div>
        </div>
      </div>
    </div>
  );
}
