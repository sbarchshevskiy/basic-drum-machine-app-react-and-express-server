import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

import "./Nav.css";

const NewTrack = () => {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/sessions/${id}`);
  };

  const [newTrack, setNewTrack] = useState({
    title: "",
    category: "",
    description: "",
  });

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setNewTrack({
      ...newTrack,
      [name]: value,
    });
  };

  const createTrack = (event) => {
    event.preventDefault();
    const createNewTrack = {
      title: newTrack.title,
      category: newTrack.category,
      description: newTrack.description,
    };

    if (createNewTrack.title && createNewTrack.category) {
      axios
        .post("http://localhost:5000/tracks/new", { createNewTrack })
        .then((res) => {
          const trackID = res.data.id;
          console.log("CREATED!", trackID);
          axios
            .post("http://localhost:5000/sessions/new", { trackID })
            .then((res) => handleClick(res.data.id))
            .catch((err) => console.log("ERROR!", err));
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log("ERROR!", err));
    }
  };

  return (
    <div className="new-track-form">
      <h1>Create New Track</h1>
      <form onSubmit={createTrack}>
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={newTrack.title}
            className="form-control"
            placeholder="Track Title"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <select
            name="category"
            className=" form-control"
            onChange={handleChange}
          >
            <option value={newTrack.category} disabled selected>
              Please Select a Category...
            </option>
            <option value="House">House</option>
            <option value="Techno">Disco</option>
            <option value="Bass">Bass</option>
            <option value="HipHop">Hip Hop</option>
            <option value="IDK">¯\_(ツ)_/¯</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            value={newTrack.description}
            name="description"
            className="form-control"
            placeholder="Description"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewTrack;
