import { useEffect, useState } from "react";
import FilterForm from "../../components/FilterForm/FilterForm";
import { getAllCampers } from "../../redux/campers/operations";
import { useSelector, useDispatch } from "react-redux";
import { selectLoading } from "../../redux/campers/selectors";
import Loader from "../../components/Loader/Loader";
import css from "./PsychologistsPage.module.css";

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

  useEffect(() => {
    dispatch(getAllCampers());
  }, [dispatch]);

  return (
    <div className={css.div}>
      <FilterForm onSubmit={onSubmit} />
      {isLoading && <Loader />}
    </div>
  );
}
