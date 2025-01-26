import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/students");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f3f4f6",
      }}
    >
      <Box
        sx={{
          width: "400px",
          padding: "2rem",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          background: "white",
          borderRadius: "8px",
        }}
      >
        <Typography variant="h5" mb={2} textAlign="center">
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: "1rem" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
