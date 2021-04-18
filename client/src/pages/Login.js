import React, { Component } from "react";
// import "./login.css";
import axios from "axios";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      currentState: 'login',
      email: '',
      password: ''
    };
  }

  componentDidMount() {
    
  }

  handleChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  handleLogin = async event => {
    // alert("sdkjlfhlksd")
    if (this.state.email.length < 5) {
      alert("invalid email");
    }
    try {
      const body = {email: this.state.email}
      const { data } = await axios.post('http://localhost:5000/api/login', body)
      console.log('helaosoiglda', data)
      // if (data === body) {
      //   this.setState({
      //     currentState: 'password'
      //   })
      // }
    } catch (error) {
      this.setState({
        currentState: 'register'
      })
    }
  }

  handlePassword = event => {
    // this.setState({})
  }

  handleRegister = event => {
    // this.setState({})
  }

  render() {
    const { currentState, email, password, name } = this.state
    return (
      <div>
        { currentState !== 'login' ? null : (
          <div>
            <h2>Login</h2>
            <form autoComplete="off" onSubmit={event => event.preventDefault()}>
              <input
                name="email"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={this.handleChange}
              />
              <button onClick={this.handleLogin} type="submit">
                Login
              </button>
            </form>
            helllo......{email}
          </div>
        )}

        { currentState !== 'password' ? null : (
          <div>
            <h2>Provide password for {email}</h2>
            <form autoComplete="off" onSubmit={event => event.preventDefault()}>
              <input
                name="password"
                type="text"
                placeholder="Enter password"
                value={password}
                onChange={this.handleChange}
              />
              <button onClick={this.handlePassword} type="submit">
                Submit
              </button>
            </form>
            Enter Password for {email}
          </div>
        )}

        { currentState !== 'register' ? null : (
          <div>
            <h2>Register</h2>
            <form autoComplete="off" onSubmit={event => event.preventDefault()}>
              <input
                name="email"
                type="text"
                placeholder="Enter Email"
                value={email}
                onChange={this.handleChange}
              />
              <input
                name="password"
                type="text"
                placeholder="Enter password"
                value={password}
                onChange={this.handleChange}
              />
              <input
                name="name"
                type="text"
                placeholder="Enter new username"
                value={name}
                onChange={this.handleChange}
              />
              <button onClick={this.handleRegister} type="submit">
                Register
              </button>
            </form>
            
          </div>
        )}

      </div>
    );
  }
}

export default Login;
