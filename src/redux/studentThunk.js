import { getStudents } from "./studentSlice";
import axios from "axios";
export const deleteStudentThunk = async (id, thunkAPI) => {
  try {
    const response = await axios.delete(
      `http://localhost:7002/api/v1/student/${id}`
    );
    thunkAPI.dispatch(getStudents());
    return id;
  } catch (error) {
    thunkAPI.rejectWithValue(error.message);
  }
};
