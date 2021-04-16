import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client'
import { TextField } from '@material-ui/core';
import './ClientIO.css'
// const socket = io()




export default function ClientIO() {
  const [socket, setSocket] = useState(null)
  const [state, setState] = useState({
    name: '',
    message: ''
  })
  const [chat, setChat] = useState([])

  const onTextChange = event => {
    setState(
      {
        ...state, [event.target.name]: event.target.value
      }
    )
  }

  const onMessageSubmit = event => {
    event.preventDefault();
    const {name, message} = state;
    console.log('submit ', state);
    // socket.emit('test')

    socket.emit('message', {name, message})
    setState({message: '', name})
  }

  useEffect(() => {
    const newSocket = io()
    newSocket.on('message', ({
      name,
      message
    }) => {
      setChat([...chat, {
        name,
        message
      }])
    })
    setSocket(newSocket)
  },[])

  const renderChat = () => {
    return chat.map(({ name, message }, index) =>(
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
        <h1>Orca Chat</h1>
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
          Send!
        </button>
      </form>
      <div className="render-chat">
        <h1>Here's what orca's been saying</h1>
        {renderChat()}
      </div>
    </div>
  )
}