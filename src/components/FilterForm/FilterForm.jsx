import { useState } from "react";
import svg from "../../../public/icons.svg";
import css from "./FilterForm.module.css";

export default function FilterForm({ onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [icon, setIcon] = useState("down");
  const [filter, setFilter] = useState("Show all");

  return (
    <div className={css.maindiv}>
      <p className={css.text}>Filters</p>
      <button
        className={css.btn}
        onClick={() => {
          setIsOpen(!isOpen);
          icon === "down" ? setIcon("up") : setIcon("down");
        }}
      >
        {filter}
        <svg className={css.icon}>
          <use href={svg + `#icon-${icon}`}></use>
        </svg>
      </button>
      {isOpen && (
        <ul className={css.list}>
          <li
            className={filter === "A to Z" ? css.active : css.item}
            onClick={() => {
              setFilter("A to Z");
              onSubmit("A to Z");
              setIsOpen(false);
            }}
          >
            A to Z
          </li>
          <li
            className={filter === "Z to A" ? css.active : css.item}
            onClick={() => {
              setFilter("Z to A");
              onSubmit("Z to A");
              setIsOpen(false);
            }}
          >
            Z to A
          </li>
          <li
            className={filter === "Less than $160" ? css.active : css.item}
            onClick={() => {
              setFilter("Less than $160");
              onSubmit("Less than $160");
              setIsOpen(false);
            }}
          >
            Less than $160
          </li>
          <li
            className={filter === "Greater than $160" ? css.active : css.item}
            onClick={() => {
              setFilter("Greater than $160");
              onSubmit("Greater than $160");
              setIsOpen(false);
            }}
          >
            Greater than $160
          </li>
          <li
            className={filter === "Popular" ? css.active : css.item}
            onClick={() => {
              setFilter("Popular");
              onSubmit("Popular");
              setIsOpen(false);
            }}
          >
            Popular
          </li>
          <li
            className={filter === "Not popular" ? css.active : css.item}
            onClick={() => {
              setFilter("Not popular");
              onSubmit("Not popular");
              setIsOpen(false);
            }}
          >
            Not popular
          </li>
          <li
            className={filter === "Show all" ? css.active : css.item}
            onClick={() => {
              setFilter("Show all");
              onSubmit("Show all");
              setIsOpen(false);
            }}
          >
            Show all
          </li>
        </ul>
      )}
    </div>
  );
}
