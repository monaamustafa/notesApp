import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import NotesList from "../components/notes/NotesList";
import { getNotes } from "../redux/slices/noteSlice";
import { BsPlus } from "react-icons/bs";
import { Link } from "react-router-dom";
const NotesPage = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.note.notes);
  useEffect(() => {
    getAllNotes();
  }, []);
  const getAllNotes = () => {
    dispatch(getNotes());
  };
  return (
    <>
      <div className="notesPage">
        <h3 className="innerHeading">
          <AiOutlineMenuUnfold />
          Notes
        </h3>
        <div className="container noteList">
          <div className="d-flex justify-content-between  flex-wrap">
            {notes.map((note, index) => (
              <NotesList note={note} key={index} />
            ))}
          </div>
        </div>
      </div>
      <Link to={"/note/new"} className="plus-icon">
        <BsPlus />
      </Link>
    </>
  );
};

export default NotesPage;
