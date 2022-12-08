import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteStudentThunk } from "./studentThunk";
import { toast } from "react-toastify";

const url = "http://localhost:7002/api/v1/students";

const initialState = {
  student: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  },
  students: [],
  isLoading: true,
  error: null,
};

export const getStudents = createAsyncThunk(
  "student/getStudents",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addStudent = createAsyncThunk(
  "student/addStudents",
  async (student, thunkAPI) => {
    try {
      const response = await axios.post(url, student);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editStudent = createAsyncThunk(
  "student/editStudents",
  async (student, thunkAPI) => {
    const id = student.id;
    try {
      const response = await axios.put(
        `http://localhost:7002/api/v1/student/${id}`,
        student
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  "student/deleteStudents",
  deleteStudentThunk
);

export const getStudent = createAsyncThunk(
  "student/getStudent",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:7002/api/v1/student/${id}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errorMessage);
    }
  }
);

const studentSlice = createSlice({
  name: "students",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getStudents.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.students = action.payload;
    },
    [getStudents.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getStudents.pending]: (state) => {
      state.isLoading = true;
    },
    [addStudent.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.student = action.payload;
      state.students.push(state.student);
      toast.success(
        `Student ${state.student.firstName} ${state.student.lastName} added`
      );
    },
    [addStudent.rejected]: (state) => {
      state.isLoading = false;
      toast.error(`Student could not be added`);
    },
    [addStudent.pending]: (state) => {
      state.isLoading = true;
    },
    [editStudent.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      const { id, firstName, lastName, email, address } = action.payload;
      const existingStudent = state.students.find(
        (student) => student.id === id
      );
      if (existingStudent) {
        existingStudent.firstName = firstName;
        existingStudent.email = email;
        existingStudent.lastName = lastName;
        existingStudent.email = email;
        existingStudent.address = address;
      }
      toast.success("Student successfully updated");
    },
    [editStudent.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },
    [editStudent.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteStudent.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.students = state.students.filter(
        (student) => student.id !== action.id
      );
      toast.success(
        `Student ${state.student.firstName} ${state.student.lastName} deleted`
      );
    },
    [deleteStudent.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteStudent.pending]: (state) => {
      state.isLoading = true;
    },
    [getStudent.fulfilled]: (state, action) => {
      state.isLoading = false;
      const { id } = action.payload;
      const existingStudent = state.students.find(
        (student) => student.id === id
      );
      if (existingStudent) {
        state.student = action.payload;
      }
    },
    [getStudent.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [getStudent.pending]: (state) => {
      state.isLoading = true;
    },
  },
});

export default studentSlice.reducer;
