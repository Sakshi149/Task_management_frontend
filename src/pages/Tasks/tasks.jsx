import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  IconButton,
  TablePagination,
  Box,
} from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DescriptionIcon from "@mui/icons-material/Description";
import SearchBar from "../../components/Search";
import AddTask from "./Add";
import { deleteTask } from "./Delete";
import EditTaskDialog from "./Edit";
import TaskDetailsDialog from "./Details";
import api from "../../api/api";

const Tasks = () => {
  // For fetching tasks from api using pagination from the backend along with searching tasks
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalTasks, setTotalTasks] = useState(0);

  const fetchTasks = async (newPage = page, newRowsPerPage = rowsPerPage) => {
    setLoading(true);

    try {
      const response = await api.get(
        `/tasks?page=${newPage + 1}&limit=${newRowsPerPage}`,
      );
      

      setTasks(response.data.tasks || []);
      setFilteredTasks(response.data.tasks || []);
      setTotalTasks(response.data.pagination?.totalTasks || 0);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
    fetchTasks(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    fetchTasks(0, newRowsPerPage);
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setFilteredTasks(tasks);
      return;
    }

    try {
      const response = await api.get(`/tasks`, {
        params: {
          q: query,
        },
      });

      setFilteredTasks(response.data.tasks || []);
    } catch (error) {
      console.error("Error searching tasks:", error);
    }
  };

  // For editing tasks
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleEditClick = (task) => {
    setCurrentTask(task);
    setOpenEditDialog(true);
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setFilteredTasks(
      filteredTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // for showing all details
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const handleOpenDetails = async (taskId) => {
    setLoadingDetails(true);
    try {
      const response = await api.get(
        `/tasks/${taskId}`
      );

      console.log("Task details response:", response.data);

      setSelectedTask(response.data.taskDetails || response.data);
      setOpenDetails(true);
    } catch (error) {
      console.error("Error fetching task details:", error);
      alert("Failed to fetch task details.");
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedTask(null);
  };

  // for deleting task
  const handleDelete = (taskId) => {
    deleteTask(taskId, setTasks, tasks);
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 2, height: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <SearchBar onSearch={handleSearch} />
        <AddTask onTaskAdded={fetchTasks} />
        <EditTaskDialog
          open={openEditDialog}
          onClose={() => setOpenEditDialog(false)}
          task={currentTask}
          onUpdate={handleTaskUpdate}
        />
        <TaskDetailsDialog
          open={openDetails}
          onClose={handleCloseDetails}
          task={selectedTask}
          loading={loadingDetails}
        />
      </Box>
      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto" }} />
      ) : (
        <TableContainer
          component={Paper}
          sx={{
            flexGrow: 1,
            overflow: "auto",
            boxShadow: 4,
            borderRadius: 3,
            position: "relative",
            backgroundColor: "#ffffff",
          }}
        >
          <Table
            sx={{
              minWidth: 800,
              width: "100%",
              tableLayout: "fixed",
              height: { xs: "calc(100vh - 246px)" },
            }}
          >
            <TableHead>
              <TableRow
                sx={{ background: "linear-gradient(135deg, #e3f2fd, #bbdefb)" }}
              >
                {/* <TableCell sx={{ fontWeight: "bold", color: "#333" }}>ID</TableCell> */}
                <TableCell sx={{ fontWeight: "bold", color: "#212121" }}>
                  TITLE
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#212121" }}>
                  DESCRIPTION
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#212121" }}>
                  STATUS
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#212121" }}>
                  CREATED AT
                </TableCell>
                {/* <TableCell sx={{ fontWeight: "bold", color: "#333" }}>UPDATED AT</TableCell> */}
                <TableCell sx={{ fontWeight: "bold", color: "#212121" }}>
                  ACTIONS
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
                  <TableRow
                    key={task.id}
                    sx={{
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                      transition: "background-color 0.3s",
                    }}
                  >
                    {/* <TableCell>{task.id}</TableCell> */}
                    <TableCell sx={{ wordBreak: 'break-word'}}>{task.title}</TableCell>
                    <TableCell sx={{ wordBreak: 'break-word'}}>{task.description}</TableCell>
                    <TableCell>
                      <span
                        style={{
                          padding: "6px 12px",
                          borderRadius: "8px",
                          backgroundColor:
                            task.status === "Completed"
                              ? "#4CAF50"
                              : task.status === "In Progress"
                              ? "#FFC107"
                              : "#F44336",
                          color: "#fff",
                          fontWeight: "bold",
                          display: "inline-block",
                          textAlign: "center",
                          minWidth: "100px",
                        }}
                      >
                        {task.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {task.created_at
                        ? new Date(task.created_at).toLocaleDateString()
                        : "N/A"}
                    </TableCell>
                    {/* <TableCell>{new Date(task.updated_at).toLocaleString()}</TableCell> */}
                    <TableCell>
                      <IconButton
                        color="success"
                        onClick={() => handleEditClick(task)}
                        aria-label="Edit Task"
                        sx={{ mx: 0.5 }}
                      >
                        <EditRoundedIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(task.id)}
                        aria-label="Delete Task"
                        sx={{ mx: 0.5 }}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                      <IconButton
                        color="info"
                        aria-label="Task Information"
                        onClick={() => handleOpenDetails(task.id)}
                        sx={{ mx: 0.5 }}
                      >
                        <DescriptionIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No tasks available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {/* PAGINATION */}
          <TablePagination
            rowsPerPageOptions={[5, 10, 15]}
            component="div"
            count={totalTasks}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              ".MuiTablePagination-toolbar": {
                backgroundColor: "#f1f1f1",
                borderRadius: "0 0 8px 8px",
              },
              ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
                { color: "#333" },
            }}
          />
        </TableContainer>
      )}
    </Container>
  );
};

export default Tasks;
