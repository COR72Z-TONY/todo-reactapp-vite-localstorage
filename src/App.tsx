import React, { useEffect, useState } from "react";
import { getData, saveData, deleteData } from "./localStorageUtils";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import { Container, Typography, Box, Button } from "@mui/material";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = getData("tasks");
    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      saveData("tasks", tasks);
    }
  }, [tasks]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    saveData("tasks", updatedTasks);
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveData("tasks", updatedTasks);
  };

  const clearAllTasks = () => {
    deleteData("tasks"); // Удаляем все данные из localStorage
    setTasks([]); // Очищаем состояние
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h3" gutterBottom fontFamily="monospace">
          To-Do List
        </Typography>
        <TaskForm addTask={addTask} />
        {tasks.length > 0 ? (
          <>
            <TaskList
              tasks={tasks}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={clearAllTasks}
              sx={{ mt: 2 }}
            >
              Clear All Tasks
            </Button>
          </>
        ) : (
          <Typography
            variant="overline"
            gutterBottom
            fontFamily="monospace"
            sx={{ mt: 5 }}
          >
            There are no tasks yet
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default App;
