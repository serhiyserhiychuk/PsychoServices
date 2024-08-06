import { useState, useEffect } from "react";
import css from "./PsychologistCard.module.css";
import svg from "../../../public/icons.svg";
import useAuth from "../../hooks/useAuth.js";
import toast from "react-hot-toast";
import { getFavorites, addToFavorites } from "../../redux/users/operations.js";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../../redux/users/selectors.js";

export default function PsychologistCard({ psychologist }) {
  const [isOpen, setIsOpen] = useState(false);
  const [iconClass, setIconClass] = useState(css.likeicon);
  const user = useAuth();
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const handleClick = async () => {
    if (user) {
      await dispatch(addToFavorites({ psychologist, uid: user.uid }));
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(getFavorites(user.uid));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user && favorites) {
      setIconClass(
        favorites.find((item) => item._id === psychologist._id)
          ? css.clickedLike
          : css.likeicon
      );
    }
  }, [favorites, psychologist, user]);

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
                Price / 1 hour:{" "}
                <span className={css.price}>
                  {psychologist.price_per_hour}$
                </span>
              </p>
            </div>
            <button
              className={css.likebtn}
              onClick={() =>
                user
                  ? handleClick()
                  : toast.error(
                      "Only logged in users have access to this feature!",
                      { duration: 7000 }
                    )
              }
            >
              <svg className={iconClass}>
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
        {!isOpen && (
          <button className={css.btn} onClick={() => setIsOpen(true)}>
            Read more
          </button>
        )}
        {isOpen && (
          <div className={css.morediv}>
            <ul className={css.revlist}>
              {psychologist.reviews.map((review, index) => (
                <li className={css.review} key={index}>
                  <div className={css.infodiv}>
                    <span className={css.letterspan}>{review.reviewer[0]}</span>
                    <div className={css.revdiv}>
                      <p>{review.reviewer}</p>
                      <div className={css.revratdiv}>
                        <svg className={css.staricon}>
                          <use href={svg + "#icon-star"}></use>
                        </svg>
                        <p>{review.rating}</p>
                      </div>
                    </div>
                  </div>
                  <p className={css.reviewtext}>{review.comment}</p>
                </li>
              ))}
            </ul>
            <button className={css.appbtn}>Make an appointment</button>
          </div>
        )}
      </div>
    </div>
  );
}
