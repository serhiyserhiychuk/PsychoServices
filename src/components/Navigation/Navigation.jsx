import { useState } from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import LogInModal from "../LogInModal/LogInModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";

export default function Navigation() {
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);

  const openLogInModal = () => {
    setIsLogInOpen(true);
  };

  const openRegModal = () => {
    setIsRegOpen(true);
  };

  const closeLogInModal = () => {
    setIsLogInOpen(false);
  };

  const closeRegModal = () => {
    setIsRegOpen(false);
  };

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div className={css.navdiv}>
      <p className={css.logo}>
        <span className={css.logospan}>psychologists.</span>services
      </p>
      <nav className={css.nav}>
        <NavLink className={buildLinkClass} to="/">
          Home
        </NavLink>
        <NavLink className={buildLinkClass} to="/psychologists">
          Psychologists
        </NavLink>
        <NavLink className={buildLinkClass} to="/favorites">
          Favorites
        </NavLink>
      </nav>
      <ul className={css.btnlist}>
        <li>
          <button
            className={`${css.btnlog} ${css.btn}`}
            onClick={openLogInModal}
          >
            Log In
          </button>
        </li>
        <li>
          <button className={`${css.btnreg} ${css.btn}`} onClick={openRegModal}>
            Registration
          </button>
        </li>
      </ul>
      {isLogInOpen && (
        <LogInModal isOpen={isLogInOpen} onClose={closeLogInModal} />
      )}
      {isRegOpen && (
        <RegisterModal isOpen={isRegOpen} onClose={closeRegModal} />
      )}
    </div>
  );
}
