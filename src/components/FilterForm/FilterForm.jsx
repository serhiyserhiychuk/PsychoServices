import { Formik, Form, Field } from "formik";
import css from "./FilterForm.module.css";

export default function FilterForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ location: "", details: [], form: "" }}
      onSubmit={onSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label} htmlFor="location">
          Location
        </label>
        <Field className={css.input} type="text" name="location" />
        <label className={css.label} htmlFor="details">
          Filters
        </label>
        <h3 className={css.title}>Vehicle Equipment</h3>
        <h3 className={css.title}>Vehicle type</h3>
        <button className={css.btn}>Search</button>
      </Form>
    </Formik>
  );
}
