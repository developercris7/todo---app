import { createContext, useState, useRef } from "react";

export const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [lightmode, setLightMode] = useState(true);
  const [todoItems, setTodoItems] = useState([
    { id: 1, task: "Workout", completed: false },
    { id: 2, task: "Mediatation 10 mins.", completed: false },
  ]);

  const [taskInput, setTaskInput] = useState("");
  const [taskFilter, setTaskFilter] = useState("all");
  const dragList = useRef();
  const dragOverList = useRef();

  const handleStorageTask = (tasks) => {
    localStorage.setItem("todo", JSON.stringify(tasks));
  };

  const handleNewTask = (e) => {
    e.preventDefault();
    const taskId =
      todoItems.length > 0 ? todoItems[todoItems.length - 1].id + 1 : 1;
    console.log(taskId);
    const newTask = { id: taskId, task: taskInput, completed: false };
    const updatedList = [...todoItems, newTask];
    setTodoItems(updatedList);
    setTaskInput("");
    handleStorageTask(updatedList);
  };

  const handleTaskCompletion = (id) => {
    const updatedTodoItems = todoItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setTodoItems(updatedTodoItems);
    handleStorageTask(updatedTodoItems);
  };

  const handleDeleteTask = async (id) => {
    const updatedTodoItems = todoItems.filter((item) => item.id !== id);
    setTodoItems(updatedTodoItems);
    handleStorageTask(updatedTodoItems);
  };

  const handleDeleteCompletedTasks = () => {
    const updatedTodoItems = todoItems.filter(
      (item) => item.completed === false
    );
    setTodoItems(updatedTodoItems);
    handleStorageTask(updatedTodoItems);
  };

  const displayCountOfActive = () => {
    let lists = [];
    if (todoItems && todoItems.length > 0) {
      lists = todoItems.filter((item) => item.completed === false);
    }
    return lists.length;
  };

  const handleDrag = (e) => {
    e.preventDefault();
    const todoItemsClone = [...todoItems];
    if (
      dragList.current >= 0 &&
      dragList.current < todoItemsClone.length &&
      dragOverList.current >= 0 &&
      dragOverList.current < todoItemsClone.length
    ) {
      let temp = todoItemsClone[dragList.current];
      todoItemsClone[dragList.current] = todoItemsClone[dragOverList.current];
      todoItemsClone[dragOverList.current] = temp;
      setTodoItems(todoItemsClone);
      handleStorageTask(todoItemsClone);
    }
  };
  return (
    <DataContext.Provider
      value={{
        lightmode,
        setLightMode,
        todoItems,
        setTodoItems,
        taskInput,
        setTaskInput,
        handleNewTask,
        handleTaskCompletion,
        handleDeleteTask,
        handleDeleteCompletedTasks,
        taskFilter,
        setTaskFilter,
        displayCountOfActive,
        dragList,
        dragOverList,
        handleDrag,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
