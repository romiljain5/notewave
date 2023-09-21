import {configureStore} from '@reduxjs/toolkit';
import notesReducer from '../features/note/noteSlice'

export const store = configureStore({
    reducer: notesReducer,
})