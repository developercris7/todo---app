import React, { useContext } from "react";
import Styles from "../Assets/css/app.module.css";
import { DataContext } from "../Context/ContextAPI";

const Input = () => {
  const { taskInput, setTaskInput, handleNewTask, lightmode } =
    useContext(DataContext);
  return (
    <form onSubmit={handleNewTask}>
      <label htmlFor="input" className={Styles.label}>
        Add Tasks
      </label>
      <input
        type="text"
        id="input"
        placeholder="Create a new todo..."
        autoComplete="off"
        className={`${Styles.input} ${
          lightmode ? Styles.backgroundlight : Styles.backgroundDark
        }`}
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button type="submit" className={`${Styles.addButton} `}>
        Add
      </button>
    </form>
  );
};

export default Input;
