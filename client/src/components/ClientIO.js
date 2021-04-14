import React, { useState, useEffect } from 'react';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:3000')


export default function ClientIO() {
  const [state, setState] = useState({
    message: '',
    name: ''
  })
  const [chat, setChat] = useState([])

  const onTextChane = event => {
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

   return(
    <div>
      <form onSubmit={onMessageSubmit}>
        <hi>Orca Chat</hi>
        <div>
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
            label="Message"
          />
        </div>
        <button>
          Send!
        </button>
      </form>
      <div>
        <h1>Here's what orca's been saying</h1>
        {renderChat()}
      </div>
    </div>
  )
}