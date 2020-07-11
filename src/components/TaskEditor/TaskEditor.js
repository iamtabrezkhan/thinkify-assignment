import React, { useEffect } from "react";
import styles from "./TaskEditor.module.css";
import useSetState from "../../hooks/useSetState";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from "uuid";

const createTags = (tagString) => {
  return tagString
    .split(",")
    .filter((tag) => !!tag.trim())
    .map((tag, i) => {
      return {
        name: tag.trim(),
        id: i + 1,
      };
    });
};

function TaskEditor({
  mode = "create",
  onCreate,
  onEdit,
  onCancel,
  data = {},
  ...props
}) {
  const initialFormState = {
    title: "",
    tagString: "",
  };

  const [formState, setFormState] = useSetState(initialFormState);

  useEffect(() => {
    if (mode === "edit") {
      data.title = data.title || "";
      data.tags = data.tags || [];
      const tagString = data.tags.map((tag) => tag.name).join(", ");
      setFormState({
        title: data.title || "",
        tagString,
      });
    }
  }, []);

  const handleChange = (e) => {
    setFormState({
      [e.target.name]: e.target.value,
    });
  };

  const prepareTask = () => {
    const { title, tagString } = formState;
    if (!title) {
      toast("Title cannot be empty!", { type: "error" });
      return false;
    }
    console.log(tagString);
    if (!tagString) {
      toast("Please provide at least one tag", { type: "error" });
      return false;
    }
    const tags = createTags(tagString);
    const task = {
      title,
      id: mode === "edit" ? data.id : uuidv4(),
      tags,
    };
    return task;
  };

  const createTask = (e) => {
    e.preventDefault();
    const task = prepareTask();
    if (!task) {
      return;
    }
    if (onCreate && typeof onCreate === "function") {
      onCreate(task);
    }
    setFormState(initialFormState);
  };

  const saveTask = (e) => {
    e.preventDefault();
    const task = prepareTask();
    if (!task) {
      return;
    }
    if (onEdit && typeof onEdit === "function") {
      onEdit(task);
    }
  };

  const cancelEditing = (e) => {
    if (onCancel && typeof onCancel === "function") {
      onCancel();
    }
  };

  return (
    <div className={styles.main}>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
      <form onSubmit={createTask}>
        <input
          name="title"
          placeholder="Title"
          autoComplete="off"
          onChange={handleChange}
          value={formState.title}
        />
        <input
          name="tagString"
          placeholder="Comma Separated Tags"
          autoComplete="off"
          onChange={handleChange}
          value={formState.tagString}
        />
        {mode === "create" && <button onClick={createTask}>Create</button>}
        {mode === "edit" && <button onClick={saveTask}>Save</button>}
        {mode === "edit" && (
          <button className={styles.cancelBtn} onClick={cancelEditing}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default TaskEditor;
