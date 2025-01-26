import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const AddStudentModal = ({ open, handleClose, fetchStudents }) => {
  // Define state for the student form fields
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    age: "",
    gender: "",
    address: "",
    phone: "",
    email: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "students"), formData);
      handleClose(); // Close the modal
      fetchStudents(); // Refresh the student list
    } catch (error) {
      console.error("Error adding student: ", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: 24,
          width: "400px",
        }}
      >
        <h2>Add Student</h2>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          label="Class"
          fullWidth
          margin="normal"
          name="class"
          value={formData.class}
          onChange={handleInputChange}
        />
        <TextField
          label="Section"
          fullWidth
          margin="normal"
          name="section"
          value={formData.section}
          onChange={handleInputChange}
        />
        <TextField
          label="Roll Number"
          fullWidth
          margin="normal"
          name="rollNumber"
          value={formData.rollNumber}
          onChange={handleInputChange}
        />
        <TextField
          label="Age"
          fullWidth
          margin="normal"
          name="age"
          value={formData.age}
          onChange={handleInputChange}
        />
        <TextField
          label="Gender"
          fullWidth
          margin="normal"
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        />
        <TextField
          label="Address"
          fullWidth
          margin="normal"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <TextField
          label="Phone"
          fullWidth
          margin="normal"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <TextField
          label="Parent's Name"
          fullWidth
          margin="normal"
          name="parentName"
          value={formData.parentName}
          onChange={handleInputChange}
        />
        <TextField
          label="Parent's Phone"
          fullWidth
          margin="normal"
          name="parentPhone"
          value={formData.parentPhone}
          onChange={handleInputChange}
        />
        <TextField
          label="Parent's Email"
          fullWidth
          margin="normal"
          name="parentEmail"
          value={formData.parentEmail}
          onChange={handleInputChange}
        />
        
        <Button
          variant="contained"
          fullWidth
          sx={{ marginTop: "1rem" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default AddStudentModal;
