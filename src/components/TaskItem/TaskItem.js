import React, { useState } from "react";
import styles from "./TaskItem.module.css";
import TaskEditor from "../TaskEditor/TaskEditor";
import Stopwatch from "../Stopwatch/Stopwatch";

function TaskItem({ task, onDelete, onEdit, onDeleteTag, ...props }) {
  const [isEditMode, setEditMode] = useState(false);

  const editTaskMode = (e) => {
    setEditMode(true);
  };

  const deleteTask = (e) => {
    if (onDelete && typeof onDelete === "function") {
      onDelete(task.id);
    }
  };

  const editTask = (editedTask) => {
    if (onEdit && typeof onEdit === "function") {
      onEdit(editedTask);
    }
    setEditMode(false);
  };

  const deleteTag = (taskId, tagId) => {
    if (onDeleteTag && typeof onDeleteTag === "function") {
      onDeleteTag(taskId, tagId);
    }
  };

  return (
    <>
      {isEditMode && (
        <TaskEditor
          data={task}
          mode="edit"
          onEdit={editTask}
          onCancel={() => setEditMode(false)}
        />
      )}
      {!isEditMode && (
        <div className={styles.main}>
          <div>{task.title}</div>
          <div className={styles.tags}>
            {task.tags.map((tag) => {
              return (
                <div className={styles.tag} key={tag.id}>
                  <div className={styles.tagName}>{tag.name}</div>
                  <div
                    className={styles.cross}
                    onClick={() => deleteTag(task.id, tag.id)}
                  >
                    &times;
                  </div>
                </div>
              );
            })}
          </div>
          <button className={styles.editBtn} onClick={editTaskMode}>
            Edit
          </button>
          <button className={styles.deleteBtn} onClick={deleteTask}>
            Delete
          </button>
          <div className={styles.stopwatch}>Stopwatch</div>
          <Stopwatch />
        </div>
      )}
    </>
  );
}

export default TaskItem;
