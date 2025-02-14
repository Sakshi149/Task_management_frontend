import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Autocomplete,
} from "@mui/material";
import api from "./api";

const options = ["Pending", "In Progress", "Completed"];

const EditTaskDialog = ({ open, onClose, task, onUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setStatus(task.status);
    }
  }, [task]);

  const handleEdit = async () => {
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    try {
      await api.put(`/tasks/${task.id}`, { title, description, status });

      onUpdate({ ...task, title, description, status });
      alert("Edited Successfully");
      onClose();
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Task Title"
          fullWidth
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Task Description"
          fullWidth
          variant="outlined"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Autocomplete
          disablePortal
          options={options}
          sx={{ width: "100%", marginTop: 2 }}
          value={status}
          onChange={(event, newValue) => setStatus(newValue || "Pending")}
          renderInput={(params) => <TextField {...params} label="Status" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleEdit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskDialog;
