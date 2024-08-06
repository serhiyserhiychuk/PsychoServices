import { useEffect, useState } from "react";
// import FilterForm from "../../components/FilterForm/FilterForm";
import { getAllPsychologists } from "../../redux/psychologists/operations";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  selectPsychologists,
} from "../../redux/psychologists/selectors";
import Loader from "../../components/Loader/Loader";
import css from "./PsychologistsPage.module.css";
import PsychologistCard from "../../components/PsychologistCard/PsychologistCard";
import { resetPsychologists } from "../../redux/psychologists/slice";

export default function MoviesPage() {
  const [lastOrder, setLastOrder] = useState(0);
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

  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);

  const isLoading = useSelector(selectLoading);

  useEffect(() => {
    if (lastOrder === 0) {
      dispatch(resetPsychologists());
    }
    const fetchData = async () => {
      await dispatch(getAllPsychologists(lastOrder));
    };
    fetchData();
  }, [dispatch, lastOrder]);

  return (
    <div className={css.div}>
      {/* <FilterForm onSubmit={onSubmit} /> */}
      {psychologists && psychologists.length > 0 && (
        <ul className={css.list}>
          {psychologists.map(
            (psychologist) =>
              psychologist && (
                <li key={psychologist._id}>
                  <PsychologistCard psychologist={psychologist} />
                </li>
              )
          )}
        </ul>
      )}
      {lastOrder < 30 && (
        <button
          className={css.btn}
          onClick={() => {
            setLastOrder(lastOrder + 3);
          }}
        >
          Load more
        </button>
      )}
      {isLoading && <Loader />}
    </div>
  );
}
