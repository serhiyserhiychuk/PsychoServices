import { useEffect, useState } from "react";
import FilterForm from "../../components/FilterForm/FilterForm";
import { useSelector, useDispatch } from "react-redux";
import { selectLoading } from "../../redux/psychologists/selectors.js";
import { selectFavorites } from "../../redux/users/selectors.js";
import Loader from "../../components/Loader/Loader";
import css from "./FavoritesPage.module.css";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard.jsx";

export default function MoviesPage() {
  // const [filters, setFilters] = useState({
  //   location: "",
  //   details: [],
  //   form: "",
  // });
  // const onSubmit = (values, actions) => {
  //   const filters = {
  //     location: values.location,
  //     details: values.details,
  //     form: values.form,
  //   };
  //   actions.resetForm();
  //   setFilters(filters);
  // };

  const favorites = useSelector(selectFavorites);

  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  return (
    <>
      <div className={css.div}>
        {/* <FilterForm onSubmit={onSubmit} /> */}
        {isLoading && <Loader />}

        {favorites.length > 0 ? (
          <ul className={css.list}>
            {favorites.map(
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
            It appears that you haven`t added any campers to your favorites yet.
            To get started, you can add campers that you like to your favorites
            for easier access in the future.
          </p>
        )}
      </div>
    </>
  );
}
