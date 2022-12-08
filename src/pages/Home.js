import React from "react";
import Table from "../components/Table";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <>
      <div className='position-relative my-4'>
        <Link to='/students/newStudent'>
          <button className='position-absolute top-0 start-0 px-2 py-1 mx-2 btn btn-primary'>
            Add Student
          </button>
        </Link>
      </div>
      <Table />
    </>
  );
};

export default Home;
