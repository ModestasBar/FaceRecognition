import React from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Link from './Components/Link/Link';
import Rank from './Components/Rank/Rank';
import Image from './Components/Image/Image';

const app = new Clarifai.App({
  apiKey: '1da7846f22cb4198a6e67d6085f6bcfc'
 });

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

class App extends React.Component {
  constructor(){
    super();
    this.state =  {
      input: '',
      imageURL: ''
    }
  }

  onLinkAction = (event) => {
   this.setState({
     input: event.target.value
   })
  }

  
  onButtonClick = (event) => {
    this.setState({
      imageURL: this.state.input
    });
    console.log(event.target)
      app.models.predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input) 
        .then(
        function(response) {
          console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        },
        function(err) {
          console.log(err)
        }
    );
    console.log(this.state.input)
  }


  render () {
   return (  
     <div>
       <Particles params={particlesOption} className='particles' />
       <Navigation />
       <Logo />
       <Rank />
       <Link 
        onLinkAction={this.onLinkAction}
        onButtonClick={this.onButtonClick}
        />
      <Image imageURL={this.state.imageURL}/>
     </div>
   );
  }
}

export default App;
