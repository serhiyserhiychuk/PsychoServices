import { useEffect, useState } from "react";
import FilterForm from "../../components/FilterForm/FilterForm";
import { useSelector, useDispatch } from "react-redux";
import { selectLoading } from "../../redux/campers/selectors";
import Navigation from "../../components/Navigation/Navigation";
import Loader from "../../components/Loader/Loader";
import css from "./FavoritesPage.module.css";

export default function MoviesPage() {
  const [filters, setFilters] = useState({
    location: "",
    details: [],
    form: "",
  });
  const onSubmit = (values, actions) => {
    const filters = {
      location: values.location,
      details: values.details,
      form: values.form,
    };
    actions.resetForm();
    setFilters(filters);
  };

  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);

  return (
    <>
      <Navigation />
      <div className={css.div}>
        <FilterForm onSubmit={onSubmit} />
        {isLoading && <Loader />}

        <p className={css.text}>
          It appears that you haven`t added any campers to your favorites yet.
          To get started, you can add campers that you like to your favorites
          for easier access in the future.
        </p>
      </div>
    </>
  );
}
