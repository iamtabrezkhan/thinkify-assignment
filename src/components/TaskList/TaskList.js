import React from "react";
import styles from "./TaskList.module.css";
import TaskItem from "../TaskItem/TaskItem";

function TaskList({
  tasks,
  onEdit,
  onDelete,
  onDeleteTag,
  searchTerm,
  ...props
}) {
  const editTask = (editedTask) => {
    if (onEdit && typeof onEdit === "function") {
      onEdit(editedTask);
    }
  };

  const deleteTask = (taskId) => {
    if (onDelete && typeof onDelete === "function") {
      onDelete(taskId);
    }
  };

  const deleteTag = (taskId, tagId) => {
    if (onDeleteTag && typeof onDeleteTag === "function") {
      onDeleteTag(taskId, tagId);
    }
  };

  return (
    <div className={styles.main}>
      {tasks.length <= 0 && (
        <div className={styles.noTasks}>Oops! No tasks to display!</div>
      )}
      {tasks.length > 0 && <h4>List Of Tasks</h4>}
      {tasks.length > 0 &&
        !searchTerm &&
        tasks.map((task) => {
          return (
            <TaskItem
              task={task}
              onEdit={editTask}
              key={task.id}
              onDelete={deleteTask}
              onDeleteTag={deleteTag}
            />
          );
        })}
      {tasks.length > 0 &&
        searchTerm &&
        tasks
          .filter((task) => {
            return (
              task.title.indexOf(searchTerm) !== -1 ||
              task.tags.filter((tag) => tag.name === searchTerm).length > 0
            );
          })
          .map((task) => {
            return (
              <TaskItem
                task={task}
                onEdit={editTask}
                key={task.id}
                onDelete={deleteTask}
                onDeleteTag={deleteTag}
              />
            );
          })}
    </div>
  );
}

export default TaskList;
