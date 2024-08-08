import Modal from "react-modal";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import svg from "../../../public/icons.svg";
import css from "./AppointmentModal.module.css";
import { DesktopTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

Modal.setAppElement("#root");

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(64, "Too Long!")
    .required("Required!"),
  phone: Yup.string()
    .min(2, "Too Short!")
    .max(64, "Too Long!")
    .required("Required!"),
  time: Yup.string().required("Required!"),
  email: Yup.string().email("Must be a valid email!").required("Required!"),
  comment: Yup.string().required("Required!"),
});

export default function AppointmentModal({ isOpen, onClose, psychologist }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  const onSubmit = (data) => {
    toast.success(
      `Thank you for reaching out, ${psychologist.name} will contact you soon!`,
      { duration: 7000 }
    );
    onClose();
  };

  const [value, setValue] = useState(dayjs("2024-08-07T00:00"));

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <button className={css.closebtn} type="button" onClick={onClose}>
        <svg className={css.closeicon}>
          <use href={svg + "#icon-close"}></use>
        </svg>
      </button>
      <h2 className={css.title}>Make an appointment with a psychologist</h2>
      <p className={css.text}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <div className={css.div}>
        <img
          className={css.img}
          src={psychologist.avatar_url}
          alt="psychologist"
        />
        <div className={css.textdiv}>
          <p className={css.yourtext}>Your psychologist</p>
          <p>{psychologist.name}</p>
        </div>
      </div>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.errordiv}>
          <input
            className={css.input}
            id="name"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && <p className={css.error}>{errors.name.message}</p>}
        </div>
        <div className={css.inputdiv}>
          <div className={css.errordiv}>
            <input
              className={css.smallinput}
              id="phone"
              placeholder="+1"
              {...register("phone")}
            />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>
          <div className={css.errordiv}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopTimePicker
                className={css.timePicker}
                label="Appointment time"
                value={value}
                onChange={(newValue) => setValue(newValue)}
                {...register("time")}
              />
            </LocalizationProvider>
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className={css.errordiv}>
          <input
            className={css.input}
            id="email"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>
        <div className={css.errordiv}>
          <textarea
            className={css.area}
            id="comment"
            placeholder="Comment"
            {...register("comment")}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>
        <button className={css.btn} type="submit">
          Send
        </button>
      </form>
    </Modal>
  );
}
