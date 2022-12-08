import React from "react";
import { useEffect } from "react";
import { getStudent } from "../redux/studentSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const StudentDetails = () => {
  const student = useSelector((state) => state.students.student);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getStudent(id));
  }, [dispatch]);

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-6 mt-5 shadow py-3'>
          <h5 className='py-3'>First Name: {student.firstName}</h5>
          <h5>Last Name: {student.lastName}</h5>
          <h5 className='pt-3'>Email: {student.email}</h5>
          {student.address ? (
            <h5 className='pt-3'>Address: {student.address}</h5>
          ) : (
            ""
          )}
          <Link to='/' className='btn btn-primary mx-1 my-3 py-1'>
            back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
