import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'
import { TextField } from '@material-ui/core';
import './ClientIO.css'
const socket = io('http://localhost:5000', {
  withCredentials: true,
  extraHeaders:
    {
      "my-custom-header": "abcd"}
})



export default function ClientIO() {

  const [state, setState] = useState({
    message: '',
    name: ''
  })
  const [chat, setChat] = useState([])

  const onTextChange = event => {
    setState(
      {
        ...state, [event.target.name]: event.target.value
      }
    )
  }

  useEffect(() => {
    socket.on('message', ({
      name,
      message
    }) => {
      setChat([...chat, {
        name,
        message
      }])
    })
  })

  const onMessageSubmit = event => {
    event.preventDefault();
    const {name, message} = state;
    socket.emit('message', {name, message})
    setState({message: '', name})
  }

  const renderChat = () => {
    return chat.map(({ name, message }, index) =>(
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }

  console.log('',renderChat())

   return(
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <hi>Orca Chat</hi>
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
        <button>
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