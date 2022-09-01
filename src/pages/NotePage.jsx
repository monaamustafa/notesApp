import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiArrowBack } from "react-icons/bi";
import {
  deleteNote,
  getNoteByID,
  postNote,
  updateNote,
} from "../redux/slices/noteSlice";

const NotePage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const note = useSelector((state) => state.note.note);
  const [upDatednote, setNote] = useState({});
  useEffect(() => {
    getSingleNote(id);
    setNote(note);
  }, [id, note.id]);
  const getSingleNote = (id) => {
    if (id === "new") return;
    dispatch(getNoteByID(id));
  };
  const undateSingleNote = () => {
    if (id !== "new" && !upDatednote.body) deletThisNote();
    else if (id !== "new") dispatch(updateNote(upDatednote));
    else if (id === "new" && upDatednote.body) {
      dispatch(postNote(upDatednote));
    }
    navigate("/");
  };
  const deletThisNote = () => {
    console.log(id);
    dispatch(deleteNote(id));
    navigate("/");
  };

  // const note = notes.find((note) => note.id.toString() === id.toString());
  if (!note) return <p>invalid info</p>;
  return (
    <>
      <div className="d-flex justify-content-between">
        <h3 className="innerHeading">
          <Link to="/">
            <BiArrowBack onClick={undateSingleNote} />
          </Link>
        </h3>
        {id === "new" ? (
          <h3 className="innerHeading" onClick={undateSingleNote}>
            Done
          </h3>
        ) : (
          <h3 className="innerHeading" onClick={deletThisNote}>
            Delete
          </h3>
        )}
      </div>
      <div className="testArea">
        <textarea
          onChange={(e) => {
            setNote({ ...upDatednote, body: e.target.value });
          }}
          value={upDatednote.body}
        ></textarea>
      </div>
    </>
  );
};

export default NotePage;
