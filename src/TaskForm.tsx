import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskFormProps {
  addTask: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ addTask }) => {
  const [taskText, setTaskText] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };

    addTask(newTask);
    setTaskText("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", gap: 1, justifyContent: "center", mt: 2 }}
    >
      <TextField
        variant="outlined"
        label="New Task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        fullWidth
        sx={{ maxWidth: "300px", fontFamily: "monospace" }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default TaskForm;
