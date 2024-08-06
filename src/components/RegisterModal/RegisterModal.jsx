import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { set, ref } from "firebase/database";
import { auth, database } from "../../../firebaseConfig.js";
import Modal from "react-modal";
import svg from "../../../public/icons.svg";
import css from "./RegisterModal.module.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(64, "Too Long!")
    .required("Required!"),
  email: Yup.string().email("Must be a valid email!").required("Required!"),
  password: Yup.string()
    .min(8, "Too short!")
    .max(64, "Too long!")
    .required("Required!"),
});

export default function RegisterModal({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidationSchema),
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: data.name,
      });
      await set(ref(database, "users/" + user.uid), {
        name: data.name,
        email: data.email,
        favorites: [],
      });
      await signInWithEmailAndPassword(auth, data.email, data.password);
      toast.success(`Welcome, ${user.displayName}!`, { duration: 5000 });
      onClose();
      navigate("/psychologists");
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };

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
      <h2 className={css.title}>Registration</h2>
      <p className={css.text}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>
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
          <input
            className={css.input}
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
          <button
            type="button"
            className={css.eye}
            onClick={togglePasswordVisibility}
          >
            <svg className={css.icon}>
              <use
                href={`${svg}${showPassword ? "#icon-eye-off" : "#icon-eye"}`}
              ></use>
            </svg>
          </button>
        </div>
        <button className={css.btn} type="submit">
          Sign Up
        </button>
      </form>
    </Modal>
  );
}
