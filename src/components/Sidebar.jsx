import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Box, Button } from "@mui/material";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "200px",
        background: "#1e293b",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <h3>Dashboard</h3>
      <Button
        variant="contained"
        onClick={() => navigate("/students")}
        sx={{ margin: "1rem 0", background: "#3b82f6" }}
      >
        Students Page
      </Button>
      <Button
        variant="contained"
        onClick={handleLogout}
        sx={{ background: "#ef4444" }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Sidebar;
