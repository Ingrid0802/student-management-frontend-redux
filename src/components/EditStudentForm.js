import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editStudent } from "../redux/studentSlice";
import { useNavigate } from "react-router";
import { Link, useParams } from "react-router-dom";

const EditStudentForm = () => {
  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editStudent({ id, firstName, lastName, email, address })).then(
      navigate("/")
    );
  };

  return (
    <div className='container'>
      <div className='row justify-content-center mt-5'>
        <div className='col-6 mt-5 shadow py-3'>
          <h2 className='mb-5'>Edit Student</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3 '>
              <label className='form-label text-left'>First Name</label>
              <input
                type='text'
                className='form-control'
                id='firstNname'
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
export default EditStudentForm;
