import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import logo2 from './logo2.png';

function Logo() {
    return (
        <div className='ma4 mt0'>
           <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 110, width: 110 }} >
                <div className="Tilt-inner">
                    <img alt='logo' style={{padding: '10px', width: '90px', height: '90px'}} src={logo2}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;