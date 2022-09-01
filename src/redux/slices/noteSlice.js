import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  isLoading: false,
  isSuccess: false,
  notes: [],
  note: {},
  isError: false,
  message: "",
};

export const getNotes = createAsyncThunk("note/getNotes", async () => {
  try {
    const resp = await axios.get("http://localhost:5000/notes");
    // console.log(resp.data)
    return resp.data;
  } catch (err) {
    console.error(err);
  }
});
export const getNoteByID = createAsyncThunk("note/getNoteByID", async (id) => {
  try {
    const resp = await axios.get(`http://localhost:5000/notes/${id}`);
    return resp.data;
  } catch (err) {
    // return err;
    // console.error(err);
  }
});

export const postNote = createAsyncThunk(
  `note/postNote`,
  async (note, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`http://localhost:5000/notes`, {
        method: "POST",
        body: JSON.stringify({ ...note, 'modified_At': new Date(),'created_At': new Date()}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateNote = createAsyncThunk(
  `note/updateNote`,
  async (note, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(`http://localhost:5000/notes/${note.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...note, 'modified_At': new Date() }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteNote = createAsyncThunk("note/deleteNote", async (id) => {
  try {
    const resp = await axios.delete(`http://localhost:5000/notes/${id}`);
    return resp.data;
  } catch (err) {
    // return err;
    // console.error(err);
  }
});

const noteSlice = createSlice({
  name: "note",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getNotes.pending, (state) => {
      state.isLoading = true;
      state.note = {};
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notes = action.payload;
      state.isError = false;
    });
    builder.addCase(getNotes.rejected, (state, action) => {
      state.isLoading = false;
      state.notes = [];
      state.isError = true;
    });
    builder.addCase(getNoteByID.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getNoteByID.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.note = action.payload;
    });
    builder.addCase(getNoteByID.rejected, (state, action) => {
      state.isLoading = false;
      state.note = {};
      state.isError = true;
    });
    builder.addCase(postNote.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(postNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(postNote.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(updateNote.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(updateNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(updateNote.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });builder.addCase(deleteNote.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteNote.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default noteSlice.reducer;
