import React from "react";

import "./Nav.css";

const NewTrack = () => {
  return (
    <div className="new-track-form">
      <h1>Create New Track</h1>
      <form id="register-form" method="POST" action="/tracks/new">
        <div class="form-group">
          <input
            type="text"
            name="title"
            class="form-control"
            placeholder="Track Title"
          />
        </div>
        <div class="form-group">
          <select
            name="track-category"
            id="track-category"
            class=" form-control"
          >
            <option value="" disabled selected>
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
        <div class="form-group">
          <input
            type="text"
            name="description"
            class="form-control"
            placeholder="Description"
          />
        </div>
        <button type="submit" class="">
          Create
        </button>
      </form>
    </div>
  );
};

export default NewTrack;
