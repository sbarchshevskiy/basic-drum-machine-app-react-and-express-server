import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client'
import { TextField } from '@material-ui/core';
import './ClientIO.css'



export default function ClientIO() {
  const [ state, setState ] = useState({ message: "", name: "" })
  const [ chat, setChat ] = useState([])

  const socketRef = useRef()

  useEffect(
    () => {
      socketRef.current = io.connect("http://localhost:3000")
      socketRef.current.on("message", ({ name, message }) => {
        setChat([ ...chat, { name, message } ])
      })
      return () => socketRef.current.disconnect()
    },
    [ chat ]
  )

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const onMessageSubmit = (e) => {
    const { name, message } = state
    socketRef.current.emit("message", { name, message })
    e.preventDefault()
    setState({ message: "", name })
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }


   return(
       <div className="card">
         <form onSubmit={onMessageSubmit}>
           <h1>Here's what orca's been saying</h1>
           {renderChat()}
           <div className="name-field">

             <TextField
               name="name"
               onChange={event => onTextChange(event)}
               value={state.name}
               label="Name"
             />

           </div>
           <div>
             <TextField
               name="message"
               onChange={event => onTextChange(event)}
               value={state.message}
               id="outlined-multiline-static"
               variant='outlined'
               label="Message"
             />
           </div>
           <button type="submit">
             send
           </button>
         </form>
       </div>

  )
}