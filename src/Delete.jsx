import api from "./api";

export const deleteTask = async (taskId, setTasks, tasks) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete the task?"
  );
  if (!confirmDelete) {
    return;
  }

  try {
    await api.delete(`http://localhost:8080/api/v1/tasks/${taskId}`);
    setTasks(tasks.filter((task) => task.id !== taskId));
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};
