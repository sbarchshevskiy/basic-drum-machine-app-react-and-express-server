import React, { useContext, useEffect, memo, useState } from "react";
import classNames from "classnames";
import { Context } from "../../hooks/useDrumStore";
import "./DrumNote.css";
import { io } from 'socket.io-client';

const newSocket = io();



const Note = ({ trackID, stepID, isNoteOn, isNoteOnCurrentStep, play }) => {


  const { toggleNote } = useContext(Context);

  const noteClassNames = classNames("note", {
    on: isNoteOn,
    playing: isNoteOn && isNoteOnCurrentStep,
  });


  const onNoteClick = event => {
    event.preventDefault();
    const {trackID, stepID} = state;
    console.log('prev state', state)
    console.log(`note clicked on ${trackID} and ${stepID}`)
    // socket.emit('notes played: ', state)
    socket.emit('drumNoteClick', {stepID, trackID});
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


  return <div className={noteClassNames} onClick={(event) => {onNoteClick(event); noteClicked(event)}} />;

};

export default memo(Note);


