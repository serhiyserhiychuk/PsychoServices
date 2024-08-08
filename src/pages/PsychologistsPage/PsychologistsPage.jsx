import { useEffect, useState } from "react";
import FilterForm from "../../components/FilterForm/FilterForm";
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

export default function PsychologistsPage() {
  const [lastOrder, setLastOrder] = useState(0);
  const [filter, setFilter] = useState("Show all");
  const dispatch = useDispatch();
  const psychologists = useSelector(selectPsychologists);
  const isLoading = useSelector(selectLoading);
  const [isMoreToLoad, setIsMoreToLoad] = useState(true);

  useEffect(() => {
    if (lastOrder === 0) {
      dispatch(resetPsychologists());
    }
    const fetchData = async () => {
      const newPsychologists = await dispatch(
        getAllPsychologists({ lastOrder, limit: 3, filter })
      );
      if (
        newPsychologists.payload.length < 3 ||
        newPsychologists.payload[2]._id === 32
      ) {
        setIsMoreToLoad(false);
      }
    };
    fetchData();
  }, [dispatch, lastOrder, filter]);

  const onSubmit = async (selectedFilter) => {
    await dispatch(resetPsychologists());
    setLastOrder(0);
    setIsMoreToLoad(true);
    setFilter(selectedFilter);
  };

  return (
    <div className={css.div}>
      <FilterForm onSubmit={onSubmit} />
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
      {isMoreToLoad && (
        <button
          className={css.btn}
          onClick={() => {
            setLastOrder(psychologists[psychologists.length - 1]._id);
          }}
        >
          Load more
        </button>
      )}
      {isLoading && <Loader />}
    </div>
  );
}
