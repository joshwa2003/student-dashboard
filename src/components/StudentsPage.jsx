// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import { db } from "../firebase";
// import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Modal,
//   Box,
//   TextField,
//   IconButton,
// } from "@mui/material";
// import { Edit, Visibility, Delete } from "@mui/icons-material"; // Importing icons

// const StudentsPage = () => {
//   const [students, setStudents] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [viewOpen, setViewOpen] = useState(false); // For viewing student details
//   const [formData, setFormData] = useState({});
//   const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student for View or Edit

//   // Fetch students from Firestore
//   const fetchStudents = async () => {
//     const querySnapshot = await getDocs(collection(db, "students"));
//     const data = querySnapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     setStudents(data);
//   };

//   // Handle adding a student to Firestore
//   const handleAddStudent = async () => {
//     await addDoc(collection(db, "students"), formData);
//     setOpen(false);
//     fetchStudents();
//   };

//   // Handle deleting a student from Firestore
//   const handleDeleteStudent = async (id) => {
//     await deleteDoc(doc(db, "students", id));
//     fetchStudents();
//   };

//   // Handle viewing student details
//   const handleViewStudent = (student) => {
//     setSelectedStudent(student);
//     setViewOpen(true); // Open the view modal
//   };

//   // Handle form input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   return (
//     <Box sx={{ display: "flex" }}>
//       <Sidebar />
//       <Box sx={{ flex: 1, padding: "1rem" }}>
//         <Button
//           variant="contained"
//           onClick={() => setOpen(true)}
//           sx={{ marginBottom: "1rem" }}
//         >
//           Add Student
//         </Button>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>ID</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Class</TableCell>
//                 <TableCell>Section</TableCell>
//                 <TableCell>Roll Number</TableCell>
//                 <TableCell>Action</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {students.map((student) => (
//                 <TableRow key={student.id}>
//                   <TableCell>{student.id}</TableCell>
//                   <TableCell>{student.name}</TableCell>
//                   <TableCell>{student.class}</TableCell>
//                   <TableCell>{student.section}</TableCell>
//                   <TableCell>{student.rollNumber}</TableCell>
//                   <TableCell>
//                     <IconButton onClick={() => handleViewStudent(student)}>
//                       <Visibility />
//                     </IconButton>
//                     <IconButton onClick={() => handleViewStudent(student)}>
//                       <Edit />
//                     </IconButton>
//                     <IconButton onClick={() => handleDeleteStudent(student.id)}>
//                       <Delete />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Modal for Adding Student */}
//         <Modal open={open} onClose={() => setOpen(false)}>
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               background: "white",
//               padding: "2rem",
//               borderRadius: "8px",
//               boxShadow: 24,
//               width: "400px",
//             }}
//           >
//             <h2>Add Student</h2>

//             {/* Student Form */}
//             <TextField
//               label="Name"
//               fullWidth
//               margin="normal"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//             />
//             <TextField
//               label="Class"
//               fullWidth
//               margin="normal"
//               name="class"
//               value={formData.class}
//               onChange={handleInputChange}
//             />
//             <TextField
//               label="Section"
//               fullWidth
//               margin="normal"
//               name="section"
//               value={formData.section}
//               onChange={handleInputChange}
//             />
//             <TextField
//               label="Roll Number"
//               fullWidth
//               margin="normal"
//               name="rollNumber"
//               value={formData.rollNumber}
//               onChange={handleInputChange}
//             />
//             <Button
//               variant="contained"
//               fullWidth
//               sx={{ marginTop: "1rem" }}
//               onClick={handleAddStudent}
//             >
//               Submit
//             </Button>
//           </Box>
//         </Modal>

//         {/* Modal for Viewing Student Details */}
//         <Modal open={viewOpen} onClose={() => setViewOpen(false)}>
//           <Box
//             sx={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//               background: "white",
//               padding: "2rem",
//               borderRadius: "8px",
//               boxShadow: 24,
//               width: "400px",
//             }}
//           >
//             <h2>View Student</h2>

//             {/* Student Detail Fields */}
//             {selectedStudent && (
//               <>
//                 <TextField
//                   label="Name"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.name}
//                   disabled
//                 />
//                 <TextField
//                   label="Class"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.class}
//                   disabled
//                 />
//                 <TextField
//                   label="Section"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.section}
//                   disabled
//                 />
//                 <TextField
//                   label="Roll Number"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.rollNumber}
//                   disabled
//                 />
//                 <TextField
//                   label="Age"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.age || ""}
//                   disabled
//                 />
//                 <TextField
//                   label="Gender"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.gender || ""}
//                   disabled
//                 />
//                 <TextField
//                   label="Address"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.address || ""}
//                   disabled
//                 />
//                 <TextField
//                   label="Phone"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.phone || ""}
//                   disabled
//                 />
//                 <TextField
//                   label="Email"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.email || ""}
//                   disabled
//                 />
//                 <TextField
//                   label="Parent's Name"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.parentName || ""}
//                   disabled
//                 />
//                 <TextField
//                   label="Parent's Phone"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.parentPhone || ""}
//                   disabled
//                 />
//                 <TextField
//                   label="Parent's Email"
//                   fullWidth
//                   margin="normal"
//                   value={selectedStudent.parentEmail || ""}
//                   disabled
//                 />

//                 {/* Edit Button */}
//                 <Button
//                   variant="contained"
//                   fullWidth
//                   sx={{ marginTop: "1rem" }}
//                   onClick={() => {
//                     setFormData(selectedStudent); // Pre-fill formData with selected student's info
//                     setViewOpen(false); // Close view modal
//                     setOpen(true); // Open add/edit student modal for editing
//                   }}
//                 >
//                   Edit
//                 </Button>
//               </>
//             )}
//           </Box>
//         </Modal>
//       </Box>
//     </Box>
//   );
// };

// export default StudentsPage;



import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { db } from "../firebase";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import { Edit, Visibility, Delete } from "@mui/icons-material"; // Importing icons

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false); // For viewing student details
  const [formData, setFormData] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null); // Store selected student for View or Edit

  // Fetch students from Firestore
  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, "students"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStudents(data);
  };

  // Handle adding a student to Firestore
  const handleAddStudent = async () => {
    await addDoc(collection(db, "students"), formData);
    setOpen(false);
    fetchStudents();
  };

  // Handle editing a student in Firestore
  const handleEditStudent = async () => {
    const studentRef = doc(db, "students", selectedStudent.id);
    await updateDoc(studentRef, formData);
    setOpen(false);
    fetchStudents();
  };

  // Handle deleting a student from Firestore
  const handleDeleteStudent = async (id) => {
    await deleteDoc(doc(db, "students", id));
    fetchStudents();
  };

  // Handle viewing student details
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setFormData(student);
    setViewOpen(true); // Open the view modal
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flex: 1, padding: "1rem" }}>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(true);
            setFormData({});
          }}
          sx={{ marginBottom: "1rem" }}
        >
          Add Student
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Roll Number</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.class}</TableCell>
                  <TableCell>{student.section}</TableCell>
                  <TableCell>{student.rollNumber}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewStudent(student)}>
                      <Visibility />
                    </IconButton>
                    <IconButton onClick={() => handleViewStudent(student)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteStudent(student.id)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Modal for Adding or Editing Student */}
        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: 24,
              width: "400px",
            }}
          >
            <h2>{selectedStudent ? "Edit Student" : "Add Student"}</h2>

            {/* Student Form with all fields */}
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              name="name"
              value={formData.name || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Class"
              fullWidth
              margin="normal"
              name="class"
              value={formData.class || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Section"
              fullWidth
              margin="normal"
              name="section"
              value={formData.section || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Roll Number"
              fullWidth
              margin="normal"
              name="rollNumber"
              value={formData.rollNumber || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Age"
              fullWidth
              margin="normal"
              name="age"
              value={formData.age || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Gender"
              fullWidth
              margin="normal"
              name="gender"
              value={formData.gender || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Address"
              fullWidth
              margin="normal"
              name="address"
              value={formData.address || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Phone"
              fullWidth
              margin="normal"
              name="phone"
              value={formData.phone || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Parent's Name"
              fullWidth
              margin="normal"
              name="parentName"
              value={formData.parentName || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Parent's Phone"
              fullWidth
              margin="normal"
              name="parentPhone"
              value={formData.parentPhone || ""}
              onChange={handleInputChange}
            />
            <TextField
              label="Parent's Email"
              fullWidth
              margin="normal"
              name="parentEmail"
              value={formData.parentEmail || ""}
              onChange={handleInputChange}
            />

            {/* Submit Button */}
            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: "1rem" }}
              onClick={selectedStudent ? handleEditStudent : handleAddStudent}
            >
              {selectedStudent ? "Update Student" : "Add Student"}
            </Button>
          </Box>
        </Modal>

        {/* Modal for Viewing Student Details */}
        <Modal open={viewOpen} onClose={() => setViewOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "white",
              padding: "2rem",
              borderRadius: "8px",
              boxShadow: 24,
              width: "400px",
            }}
          >
            <h2>View Student</h2>

            {/* Student Detail Fields */}
            {selectedStudent && (
              <>
                <TextField
                  label="Name"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.name}
                  disabled
                  sx={{ color: "black" }} // Set text color to black
                />
                <TextField
                  label="Class"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.class}
                  disabled
                  sx={{ color: "black" }}
                />
                <TextField
                  label="Section"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.section}
                  disabled
                  sx={{ color: "black" }}
                />
                <TextField
                  label="Roll Number"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.rollNumber}
                  disabled
                  sx={{ color: "black" }}
                />
                <TextField
                  label="Age"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.age || ""}
                  disabled
                  sx={{ color: "black" }}
                />
                <TextField
                  label="Gender"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.gender || ""}
                  disabled
                  sx={{ color: "black" }}
                />
                <TextField
                  label="Address"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.address || ""}
                  disabled
                  sx={{ color: "black" }}
                />
                <TextField
                  label="Phone"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.phone || ""}
                  disabled
                  sx={{ color: "black" }}
                />
                <TextField
                  label="Email"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.email || ""}
                  disabled
                  sx={{ color: "black" }}
                />
                <TextField
                  label="Parent's Name"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.parentName || ""}
                  disabled
                  sx={{ color: "black" }}
                />
                <TextField
                  label="Parent's Phone"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.parentPhone || ""}
                  disabled
                  sx={{ color: "black" }}
                />
                <TextField
                  label="Parent's Email"
                  fullWidth
                  margin="normal"
                  value={selectedStudent.parentEmail || ""}
                  disabled
                  sx={{ color: "black" }}
                />

                {/* Edit Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ marginTop: "1rem" }}
                  onClick={() => {
                    setFormData(selectedStudent); // Pre-fill formData with selected student's info
                    setViewOpen(false); // Close view modal
                    setOpen(true); // Open add/edit student modal for editing
                  }}
                >
                  Edit
                </Button>
              </>
            )}
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default StudentsPage;
