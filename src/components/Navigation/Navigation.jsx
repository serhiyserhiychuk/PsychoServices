import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import css from "./Navigation.module.css";
import svg from "../../../public/icons.svg";
import LogInModal from "../LogInModal/LogInModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import useAuth from "../../hooks/useAuth.js";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig.js";
import toast from "react-hot-toast";

export default function Navigation() {
  const [isLogInOpen, setIsLogInOpen] = useState(false);
  const [isRegOpen, setIsRegOpen] = useState(false);
  const user = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success(`Goodbye, ${user.displayName}!`);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <div
      className={
        window.location.pathname === "/"
          ? css.navdiv
          : `${css.navdiv} ${css.bc}`
      }
    >
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
        {user ? (
          <NavLink className={buildLinkClass} to="/favorites">
            Favorites
          </NavLink>
        ) : (
          false
        )}
      </nav>
      {user ? (
        <div className={css.loggeddiv}>
          <div className={css.namediv}>
            <div className={css.userdiv}>
              <svg className={css.usericon}>
                <use href={svg + "#icon-user"}></use>
              </svg>
            </div>
            <p className={css.name}>{user.displayName}</p>
          </div>
          <button className={`${css.btnlog} ${css.btn}`} onClick={handleLogout}>
            Log Out
          </button>
        </div>
      ) : (
        <ul className={css.btnlist}>
          <li>
            <button
              className={`${css.btnlog} ${css.btn}`}
              onClick={() => {
                setIsLogInOpen(true);
              }}
            >
              Log In
            </button>
          </li>
          <li>
            <button
              className={`${css.btnreg} ${css.btn}`}
              onClick={() => {
                setIsRegOpen(true);
              }}
            >
              Registration
            </button>
          </li>
        </ul>
      )}
      {isLogInOpen && (
        <LogInModal
          isOpen={isLogInOpen}
          onClose={() => {
            setIsLogInOpen(false);
          }}
        />
      )}
      {isRegOpen && (
        <RegisterModal
          isOpen={isRegOpen}
          onClose={() => {
            setIsRegOpen(false);
          }}
        />
      )}
    </div>
  );
}
