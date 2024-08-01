import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import { useState } from "react";
import css from "./BookingForm.module.css";
import "./react-date-picker.css";
import toast from "react-hot-toast";

export default function BookingForm({ onClose }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleSubmit = (values, actions) => {
    toast.success(
      `${values.name}, your booking has been successfully sent to the tenant, thank you for choosing our service!`,
      { duration: 7000 }
    );
    actions.resetForm();
    onClose();
  };
  const initialValues = {
    name: "",
    email: "",
    bookingDate: selectedDate,
    comment: "",
  };
  const bookingValidation = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too short!")
      .max(20, "Too long!")
      .required("Required!"),
    email: Yup.string().email("Must be a valid email!").required("Required!"),
    bookingDate: Yup.string().required("Required!"),
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={bookingValidation}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form autoComplete="off" className={css.form}>
          <h3>Book your campervan now</h3>
          <p className={css.text}>
            Stay connected! We are always ready to help you.
          </p>
          <div className={css.formdiv}>
            <ErrorMessage name="name" component="span" className={css.error} />
            <Field
              type="text"
              name="name"
              className={css.input}
              placeholder="Name"
            />
            <ErrorMessage name="email" component="span" className={css.error} />
            <Field
              type="text"
              name="email"
              className={css.input}
              placeholder="Email"
            />
            <DatePicker
              wrapperClassName={css.wrapper}
              className={css.input}
              dateFormat="EEEE, MMMM dd"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                setFieldValue("bookingDate", date);
              }}
              required
              minDate={new Date()}
              showIcon
            />
            <Field
              as="textarea"
              name="comment"
              className={css.comment}
              placeholder="Comment"
            />
          </div>
          <button type="submit" className={css.btn}>
            Send
          </button>
        </Form>
      )}
    </Formik>
  );
}
