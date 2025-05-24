import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

const TaskDetailsDialog = ({ open, onClose, task, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "12px",
          padding: "16px",
          backgroundColor: "#f8f9fa",
          boxShadow: 6,
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          backgroundColor: "#1976d2",
          color: "white",
          padding: "12px",
          borderRadius: "8px 8px 0 0",
        }}
      >
        Task Details
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <CircularProgress />
          </Box>
        ) : task ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              padding: 2,
            }}
          >
            <Typography variant="body1">
              <strong>ID:</strong> {task.id}
            </Typography>
            <Typography variant="body1">
              <strong>Title:</strong> {task.title}
            </Typography>
            <Typography variant="body1" sx={{ wordBreak: 'break-word'}}>
              <strong>Description:</strong> {task.description}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                backgroundColor:
                  task.status === "Completed"
                    ? "#4CAF50"
                    : task.status === "In Progress"
                    ? "#FFC107"
                    : "#F44336",
                color: "white",
                fontWeight: "bold",
                padding: "6px 12px",
                borderRadius: "4px",
                display: "inline-block",
                width: "fit-content",
              }}
            >
              <strong>Status:</strong> {task.status}
            </Typography>
            <Typography variant="body1">
              <strong>Created At:</strong>{" "}
              {new Date(task.created_at).toLocaleString()}
            </Typography>
            <Typography variant="body1">
              <strong>Updated At:</strong>{" "}
              {task.updated_at
                ? new Date(task.updated_at).toLocaleString()
                : "N/A"}
            </Typography>
          </Box>
        ) : (
          <Typography variant="body1" align="center" color="textSecondary">
            No details available.
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onClose}
          variant="contained"
          color="primary"
          sx={{ borderRadius: "8px", px: 3 }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetailsDialog;
