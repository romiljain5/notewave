import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  notes: {
    id: nanoid(),
    noteId: "",
  },
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    currentNoteId: (state, action) => {
      state.notes.noteId = action.payload;
    },
  },
});

export const { currentNoteId } = notesSlice.actions;

//need to wire this with the store
export default notesSlice.reducer;
