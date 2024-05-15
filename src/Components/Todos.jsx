import React, { useContext, useEffect, useState } from "react";
import Styles from "../Assets/css/app.module.css";
import Item from "./Item";
import { DataContext } from "../Context/ContextAPI";

const Todos = () => {
  const {
    todoItems,
    handleDeleteCompletedTasks,
    taskFilter,
    setTaskFilter,
    displayCountOfActive,
    lightmode,
  } = useContext(DataContext);

  const [filteredItems, setFilteredItems] = useState(todoItems || []);

  useEffect(() => {
    let filterdList;
    if (todoItems) {
      switch (taskFilter) {
        case "all":
          setFilteredItems(todoItems);
          break;
        case "completed":
          if (todoItems.length > 0) {
            filterdList = todoItems.filter((item) => item.completed === true);
            setFilteredItems(filterdList);
          }
          break;
        case "active":
          if (todoItems.length > 0) {
            filterdList = todoItems.filter((item) => item.completed === false);
            setFilteredItems(filterdList);
          }
          break;
        default:
          setFilteredItems(todoItems);
          break;
      }
    }
  }, [taskFilter, todoItems]);

  return (
    <div
      className={`${Styles.todoContainer} ${
        lightmode ? Styles.backgroundlight : Styles.backgroundDark
      }`}
    >
      <div
        className={`${
          filteredItems.length > 0
            ? Styles.listContainer
            : Styles.listContainerMessage
        }`}
      >
        {filteredItems.length < 1 && taskFilter === "all" ? (
          <p>No Tasks Available !</p>
        ) : filteredItems.length < 1 && taskFilter === "active" ? (
          <p>No active tasks available !</p>
        ) : filteredItems.length < 1 && taskFilter === "completed" ? (
          <p>No tasks completed yet !</p>
        ) : (
          <></>
        )}
        {filteredItems.map((item, index) => (
          <Item item={item} index={index} key={index} />
        ))}
      </div>
      <div
        className={`${Styles.todoFooter} ${
          lightmode ? Styles.backgroundlight : Styles.backgroundDark
        }`}
      >
        <span>{displayCountOfActive()} items left</span>

        <div className={Styles.filterOptions}>
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
        <span
          onClick={handleDeleteCompletedTasks}
          className={Styles.clearAllOption}
        >
          Clear Completed
        </span>
      </div>
    </div>
  );
};

export default Todos;
