import React from "react";
import { useEffect } from "react";
import { getStudents, deleteStudent } from "../redux/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Table.css";

const Table = () => {
  const students = useSelector((state) => state.students.students);
  const isLoading = useSelector((state) => state.students.isLoading);
  const error = useSelector((state) => state.students.error);
  console.log(error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudents());
  }, [dispatch]);

  if (isLoading) {
    return <div className='mt-5 pt-5 display-4'>Loading...</div>;
  }

  if (error) {
    return (
      <div className='mt-5 pt-5 display-4'>{`${error}. Please try again :(`}</div>
    );
  }

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  return (
    <div className='container pt-5'>
      <div className=' pt-5'>
        <table className='table table-hover table-responsive shadow'>
          <thead>
            <tr className='align-middle'>
              <th scope='col'>#</th>
              <th scope='col'>First Name</th>
              <th scope='col'>Last Name</th>
              <th scope='col'>Email</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              return (
                <tr key={student.id} className='align-middle'>
                  <th scope='row'>{student.id}</th>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>{student.email}</td>
                  <td>
                    <Link to={`/students/studentDetails/${student.id}`}>
                      <button className='btn btn-primary mx-1 py-1'>
                        View
                      </button>
                    </Link>
                    <Link to={`/students/editStudent/${student.id}`}>
                      <button className='btn btn-outline-primary mx-1 py-1'>
                        Edit
                      </button>
                    </Link>
                    <button
                      className='btn btn-outline-danger mx-1 py-1'
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
