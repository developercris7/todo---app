import React, { useContext, useEffect } from "react";
import Styles from "./Assets/css/app.module.css";
import Header from "./Components/Header";
import Input from "./Components/Input";
import Todos from "./Components/Todos";
import { DataContext } from "./Context/ContextAPI";

const App = () => {
  const { todoItems, lightmode, taskFilter, setTaskFilter, setTodoItems } =
    useContext(DataContext);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("todo"));
    if (savedTasks) {
      setTodoItems(savedTasks);
    }
  }, [todoItems, setTodoItems]);

  return (
    <div className={Styles.app}>
      <div
        className={`${Styles.backgroundImage}
        ${
          lightmode ? Styles.backgroundImageLight : Styles.backgroundImageDark
        }`}
      >
        <main className={Styles.todoApp}>
          <Header />
          <Input />
          <Todos />

          <div
            className={`${Styles.filterOptions1} ${
              lightmode ? Styles.backgroundlight : Styles.backgroundDark
            }`}
          >
            <span
              className={`${
                taskFilter === "all" ? Styles.filterOptionActive : ""
              }`}
              onClick={() => setTaskFilter("all")}
            >
              All
            </span>
            <span
              className={`${
                taskFilter === "active" ? Styles.filterOptionActive : ""
              }`}
              onClick={() => setTaskFilter("active")}
            >
              Active
            </span>
            <span
              className={`${
                taskFilter === "completed" ? Styles.filterOptionActive : ""
              }`}
              onClick={() => setTaskFilter("completed")}
            >
              Completed
            </span>
          </div>
          <div
            className={`${Styles.hint} ${
              lightmode ? Styles.backgroundlight : Styles.backgroundDark
            }`}
          >
            <span>* Drag and drop to reorder list</span>
          </div>
        </main>
      </div>

      <div
        className={`${Styles.backgroundBody} ${
          lightmode ? Styles.backgroundBodyLight : Styles.backgroundBodyDark
        }`}
      ></div>
    </div>
  );
};

export default App;
