import React from "react";
import "./App.css";
import TaskEditor from "./components/TaskEditor/TaskEditor";
import TaskList from "./components/TaskList/TaskList";
import { useState } from "react";

const getTasksFromStore = () => {
  return JSON.parse(localStorage.getItem("tasks")) || [];
};

const saveTasksToStore = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

function App() {
  const [tasks, setTasks] = useState(getTasksFromStore());
  const [keyword, setKeyword] = useState("");

  const onTaskCreate = (task) => {
    setTasks((prevState) => {
      return [task, ...prevState];
    });
    const tasks = getTasksFromStore();
    saveTasksToStore([task, ...tasks]);
  };

  const onEditTask = (editedTask) => {
    setTasks((prevState) => {
      const newTasks = prevState.map((task) => {
        return task.id === editedTask.id ? editedTask : task;
      });
      saveTasksToStore(newTasks);
      return newTasks;
    });
  };

  const deleteTask = (taskId) => {
    setTasks((prevState) => {
      const newTasks = prevState.filter((task) => task.id !== taskId);
      saveTasksToStore(newTasks);
      return newTasks;
    });
  };

  const deleteTag = (taskId, tagId) => {
    setTasks((prevState) => {
      const newTasks = prevState.map((task) => {
        return task.id !== taskId
          ? task
          : {
              ...task,
              tags: task.tags.filter((tag) => tag.id !== tagId),
            };
      });
      saveTasksToStore(newTasks);
      return newTasks;
    });
  };

  const searchTasks = (e) => {
    const searchTerm = e.target.value;
    setKeyword(searchTerm);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="create-task">
          <h4>Create New Task</h4>
          <TaskEditor onCreate={onTaskCreate} />
        </div>
        <input
          name="search"
          placeholder="Search for tasks"
          onChange={searchTasks}
          autoComplete="off"
        />
        <TaskList
          tasks={tasks}
          onEdit={onEditTask}
          onDelete={deleteTask}
          onDeleteTag={deleteTag}
          searchTerm={keyword}
        />
      </div>
    </div>
  );
}

export default App;
