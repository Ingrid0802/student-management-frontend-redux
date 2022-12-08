import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addStudent } from "../redux/studentSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const StudentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.students.isLoading);
  const error = useSelector((state) => state.students.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !email) {
      toast.error("Please fill out all fields");
      return;
    }
    dispatch(addStudent({ firstName, lastName, email, address })).then(
      navigate("/")
    );
  };

  if (isLoading) {
    return <div className='mt-5 pt-5 display-4'>Loading...</div>;
  }

  if (error) {
    return (
      <div className='mt-5 pt-5 display-4'>{`${error}. Please try again :(`}</div>
    );
  }

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-6 mt-5 shadow py-3'>
          <h2 className='mb-5'>Add Student</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3 '>
              <label className='form-label text-left'>First Name</label>
              <input
                type='text'
                className='form-control'
                id='firstNname'
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className='mb-3 '>
              <label className='form-label'>Last Name</label>
              <input
                type='text'
                className='form-control'
                id='lastNname'
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className='mb-3 '>
              <label className='form-label'>Email</label>
              <input
                type='email'
                className='form-control'
                id='studentEmail'
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3 '>
              <label className='form-label'>Address *(optional)</label>
              <input
                type='text'
                className='form-control'
                id='address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='btn btn-primary'
              onSubmit={handleSubmit}
            >
              Submit
            </button>
            <Link to='/'>
              <button className='btn btn-outline-primary mx-3'>Back</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;
