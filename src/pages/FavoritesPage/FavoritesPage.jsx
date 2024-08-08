import { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth.js";
import FilterForm from "../../components/FilterForm/FilterForm";
import { useSelector, useDispatch } from "react-redux";
import { selectLoading } from "../../redux/psychologists/selectors.js";
import { selectFavorites } from "../../redux/users/selectors.js";
import Loader from "../../components/Loader/Loader";
import css from "./FavoritesPage.module.css";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";
import { getFavorites } from "../../redux/users/operations.js";

export default function MoviesPage() {
  const favorites = useSelector(selectFavorites);
  const isLoading = useSelector(selectLoading);
  const [favoritesToRender, setFavoritesToRender] = useState(favorites);
  const user = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(getFavorites(user.uid));
    }
  }, [dispatch, user]);

  useEffect(() => {
    setFavoritesToRender(favorites);
  }, [favorites]);

  const onSubmit = (selectedFilter) => {
    const favoritesToFilter = [...favorites];

    if (selectedFilter === "A to Z") {
      setFavoritesToRender(
        favoritesToFilter.sort((a, b) => a.name.localeCompare(b.name))
      );
    }
    if (selectedFilter === "Z to A") {
      setFavoritesToRender(
        favoritesToFilter.sort((a, b) => a.name.localeCompare(b.name)).reverse()
      );
    }
    if (selectedFilter === "Less than $160") {
      setFavoritesToRender(
        favoritesToFilter.filter((item) => item.price_per_hour <= 160)
      );
    }
    if (selectedFilter === "Greater than $160") {
      setFavoritesToRender(
        favoritesToFilter.filter((item) => item.price_per_hour > 160)
      );
    }
    if (selectedFilter === "Popular") {
      setFavoritesToRender(
        favoritesToFilter.sort((a, b) => b.rating - a.rating)
      );
    }
    if (selectedFilter === "Not popular") {
      setFavoritesToRender(
        favoritesToFilter.sort((a, b) => a.rating - b.rating)
      );
    }
  };

  return (
    <>
      <div className={css.div}>
        <FilterForm onSubmit={onSubmit} />
        {isLoading && <Loader />}

        {favorites.length > 0 ? (
          <ul className={css.list}>
            {favoritesToRender.map(
              (psychologist) =>
                psychologist && (
                  <li key={psychologist._id}>
                    <PsychologistCard psychologist={psychologist} />
                  </li>
                )
            )}
          </ul>
        ) : (
          <p className={css.text}>
            It appears that you haven`t added any psychologists to your
            favorites yet. To get started, you can add psychologists that you
            like to your favorites for easier access in the future.
          </p>
        )}
        {favoritesToRender.length === 0 && favorites.length > 0 && (
          <p className={css.text}>
            There are no psychologists with such properties, try to change the
            filter settings!
          </p>
        )}
      </div>
    </>
  );
}
