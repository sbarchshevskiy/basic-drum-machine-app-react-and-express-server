import React, { useContext, useEffect, memo, useState } from "react";
import classNames from "classnames";
import { Context } from "../../hooks/useDrumStore";
import "./DrumNote.css";
import { io } from 'socket.io-client';
// import $ from 'jquery';
import { findDOMNode } from 'react-dom'
const newSocket = io();



const Note = ({ trackID, stepID, isNoteOn, isNoteOnCurrentStep, play }) => {

  const { toggleNote } = useContext(Context);

  const noteClassNames = classNames("note", {
    on: isNoteOn,
    playing: isNoteOn && isNoteOnCurrentStep,
  });

  //// jQuery function to indicate that the note was played on client UI
  // function displayNote() {
  //   const element = findDOMNode();
  //   $(element).replaceWith("X")
  // }


  const onNoteClick = event => {
    event.preventDefault();
    const {trackID, stepID} = state;
    console.log('prev state', state)
    console.log(`note clicked on ${trackID} and ${stepID}`)
    // socket.emit('notes played: ', state)
    // socket.broadcast.emit(`stepID ${stepID} and trackID ${trackID}`)
    socket.emit('drumNoteClick', {stepID, trackID})
    setState({stepID: '', trackID: ''})
    console.log('state after click', state)

  }

    //socket setup
    const [socket, setSocket] = useState(null)
    const [state, setState] = useState({
      stepID,
      trackID
    })
  
    const [note, setNote] = useState([]);

  useEffect(() => {
    newSocket.on('drumNoteClick',({
      stepID,
      trackID
    }) => {
      setNote([...note, {
        trackID,
        stepID
      }])
    })


    setSocket(newSocket)
  }, [])
  console.log('new socket',newSocket);
  console.log('set note:', setNote);


  useEffect(() => {
    if (isNoteOn && isNoteOnCurrentStep) {
      play();
    }
  }, [isNoteOn, isNoteOnCurrentStep, play]);


  const noteClicked = (e) => {
    e.target.classList.toggle("on");
    toggleNote({ trackID, stepID });
    play();
  };


  return (
    <div
    className={noteClassNames}
    onClick={(event) => {
      onNoteClick(event);
      noteClicked(event);
    // displayNote(event) //in case when jQuery is active
    }} />
)

};

export default memo(Note);


