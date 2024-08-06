import css from "./PsychologistCard.module.css";
import svg from "../../../public/icons.svg";

export default function PsychologistCard({ psychologist }) {
  return (
    <div className={css.carddiv}>
      <div className={css.imgdiv}>
        <img
          className={css.img}
          src={psychologist.avatar_url}
          alt="psychologist"
        />
      </div>
      <div className={css.contentdiv}>
        <div className={css.headdiv}>
          <div className={css.namediv}>
            <p className={css.jobtitle}>Psychologist</p>
            <h2 className={css.name}>{psychologist.name}</h2>
          </div>
          <div className={css.ratingdiv}>
            <div className={css.ratingprice}>
              <div className={css.rating}>
                <svg className={css.staricon}>
                  <use href={svg + "#icon-star"}></use>
                </svg>
                <p>Rating: {psychologist.rating}</p>
              </div>
              <p>
                Price / 1 hour: <span className={css.price}>120$</span>
              </p>
            </div>
            <button className={css.likebtn}>
              <svg className={css.likeicon}>
                <use href={svg + "#icon-heart"}></use>
              </svg>
            </button>
          </div>
        </div>
        <ul className={css.list}>
          <li className={css.item}>
            <p className={css.featname}>
              Experience:
              <span className={css.feature}> {psychologist.experience}</span>
            </p>
          </li>
          <li className={css.item}>
            <p className={css.featname}>
              License:
              <span className={css.feature}> {psychologist.license}</span>
            </p>
          </li>
          <li className={css.item}>
            <p className={css.featname}>
              Specialization:
              <span className={css.feature}>
                {" "}
                {psychologist.specialization}
              </span>
            </p>
          </li>
          <li className={css.item}>
            <p className={css.featname}>
              Initial Consultation:
              <span className={css.feature}>
                {" "}
                {psychologist.initial_consultation}
              </span>
            </p>
          </li>
        </ul>
        <p className={css.about}>{psychologist.about}</p>
        <button className={css.btn}>Read more</button>
      </div>
    </div>
  );
}
