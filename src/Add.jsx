import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";

const AddTask = ({ onTaskAdded }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending"); 

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setDescription("");
    setStatus("Pending");
  };

  const handleSaveTask = async () => {
    if (!title.trim() || !description.trim() || !status.trim()) {
      alert("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/v1/tasks", {
        title,
        description,
        status,
      });

      if (response.data.success) {
        alert("Task added successfully!");
        onTaskAdded(); 
        handleClose();
      }
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task. Try again later.");
    }
  };

  return (
    <Box sx={{ textAlign: "right", padding: "10px" }}>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add task
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Task Description"
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveTask} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddTask;
