import React from 'react';

const Hero = ({handleLogin}) => {

  return (

    <section className="hero">
      <nav>
        <h2>Welcome</h2>
        <button onClick={handleLogin}>Welcome</button>
      </nav>
    </section>
  )
}

export default Hero;