import React, { useContext } from "react";
import check from "../Assets/images/icon-check.svg";
import cross from "../Assets/images/icon-cross.svg";
import Styles from "../Assets/css/app.module.css";
import { DataContext } from "../Context/ContextAPI";

const Item = ({ item, index }) => {
  const {
    handleTaskCompletion,
    handleDeleteTask,
    dragList,
    dragOverList,
    handleDrag,
  } = useContext(DataContext);

  return (
    <div
      className={Styles.item}
      draggable
      onDragStart={() => (dragList.current = index)}
      onDragEnter={() => (dragOverList.current = index)}
      onDragEnd={handleDrag}
    >
      <div
        className={`${Styles.checkBox} ${item.completed ? Styles.checked : ""}`}
        onClick={() => handleTaskCompletion(item.id)}
      >
        {item.completed && <img src={check} alt="" />}
      </div>
      <p
        className={`${item.completed ? Styles.line : ""}`}
        onClick={() => handleTaskCompletion(item.id)}
      >
        {item.task}{" "}
      </p>
      <img
        src={cross}
        alt=""
        className={Styles.crossIcon}
        onClick={() => handleDeleteTask(item.id)}
      />
    </div>
  );
};

export default Item;
