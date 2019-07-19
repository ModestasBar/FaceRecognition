import React from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import Link from './Components/Link/Link';
import Rank from './Components/Rank/Rank';
import Image from './Components/Image/Image';
import LoginForm from './Components/LoginForm/LoginForm';
import RegistrationForm from './Components/RegistrationForm/RegistrationForm';


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

const initialValue = {
      input: '',
      imageURL: '',
      box: {},
      router: 'sign',
      user: {
        id: '',
        name: '',
        email: '',
        score: 0,
        date: ''
    }
}

class App extends React.Component {
  constructor(){
    super();
    this.state =  initialValue;
  }

  calculateBoxCoordinates = (data) => {
    const coordinates = (data.outputs[0].data.regions[0].region_info.bounding_box)
    const imageGrab = document.getElementById('imageId');
    const width = Number(imageGrab.width);
    const height = Number(imageGrab.height);
    return {
      topRow: height * coordinates.top_row,
      rightColumn: width - (width * coordinates.right_col),
      leftColumn: coordinates.left_col * width,
      bottomRow: height -(coordinates.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({
      box: box
    })
  }

  onLinkAction = (event) => {
   this.setState({
     input: event.target.value
   })
  }

  
  onButtonClick = () => {
    this.setState({
      imageURL: this.state.input
    });

      fetch('http://localhost:3000/imagesURL', {
        method: 'post',
        headers: {'Content-type' : 'application/json'},
        body: JSON.stringify({
            input: this.state.input
        })
      })
      .then(response => response.json())
      .catch(error => console.log('Unable to use API'))
      .then(response => {
        if(response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({
                id: this.state.user.id 
            })
            })
          .then(response => response.json())
          .then(count => {
          this.setState(Object.assign(this.state.user,{score: count})) //update object elements 'Object.assign()'
          })
          }
        this.displayFaceBox(this.calculateBoxCoordinates(response))
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (data) => {
    this.setState({router: data})
    if(data === 'sign'){
      this.setState(initialValue);
    }
  }

  loadUser =(data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      score: data.entries,
      date: data.date
    }})
  }


  render () {
   return (  
     <div>
       <Particles params={particlesOption} className='particles' />
       <Navigation onClick={this.onRouteChange} routerState={this.state.router}/>
       { this.state.router === 'sign' ?
        <LoginForm onClick={this.onRouteChange} loadUser={this.loadUser}/>
         : 
          (
            this.state.router === 'register' ?
            <RegistrationForm  onClick={this.onRouteChange} loadUser={this.loadUser}/>
            :
            <div>
              <Logo />
              <Rank userName={this.state.user.name} userScore={this.state.user.score}/>
              <Link 
                onLinkAction={this.onLinkAction}
                onButtonClick={this.onButtonClick}
                />
              <Image displayBox={this.state.box} imageURL={this.state.imageURL}/>
            </div>
          )
      } 
     </div>
   );
  }
}

export default App;
