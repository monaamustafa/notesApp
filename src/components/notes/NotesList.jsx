import React from "react";
import { Link } from "react-router-dom";
import "./notesList.scss";
const getTitle = (note) => {
  const title = note.body.split("\n")[0];
  if (title.length > 30) return title.slice(0, 10);
  return title;
};
const getdate = (note) => {
  return new Date(note.modified_At).toLocaleDateString();
};

const NotesList = ({ note }) => {
  return (
    <div className="notes">
      <Link to={`/note/${note.id}`} className="notesDetails">
        <div>
          <p>{note.body}</p>
        </div>
      </Link>
      <div className="mainInfo">
        <p>{getTitle(note)}</p>
        <p>{getdate(note)}</p>
      </div>
    </div>
  );
};

export default NotesList;
