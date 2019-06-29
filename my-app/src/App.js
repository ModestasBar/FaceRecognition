import React from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Link from './Components/Link/Link';
import Rank from './Components/Rank/Rank';

const particlesOption = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  return (  
    <div  >
      <Particles params={particlesOption} className='particles' />
      <Navigation />
      <Logo />
      <Rank />
      <Link />
      {/* //  <Image /> */}
    </div>
  );
}

export default App;
