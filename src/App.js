import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddStudent from "./pages/AddStudent";
import EditStudent from "./pages/EditStudent";
import StudentDetails from "./pages/StudentDetails";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/students/newStudent' element={<AddStudent />}></Route>
        <Route
          path='/students/editStudent/:id'
          element={<EditStudent />}
        ></Route>
        <Route
          path='/students/studentDetails/:id'
          element={<StudentDetails />}
        ></Route>
      </Routes>
      <ToastContainer position='top-center' />
    </>
  );
}

export default App;
