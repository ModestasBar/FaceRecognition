import React from 'react';
import './ImageBox.css';

function Image({imageURL, displayBox}) {
    return (
        <div className='center ma'>
            <div className='absolute  mt2'>
                <img id='imageId' alt='' src={imageURL} style={{width: 400, height: 'auto'}}/>
                <div className='bounding-box' style={{top: displayBox.topRow, right: displayBox.rightColumn, bottom: displayBox.bottomRow, left: displayBox.leftColumn}}></div>
            </div>
       </div>
    );
}

export default Image;