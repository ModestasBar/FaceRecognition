import React from 'react';
import './Link.css';

function Link() {
    return (
        <div>
            <p className='f4 center'>
            {'Hello, my purpose is to detect faces in images. Give me a try!'}
            </p>
            <div className='center'>
                <div className='center form pa3 br3 shadow-5'>
                    <input className='f5 pa1 w-70'input='text' placeholder='Image URL...'></input>
                    <button className='f5 br2 link w-30 dim grow white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default Link;