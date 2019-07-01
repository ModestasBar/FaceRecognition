import React from 'react';

function Image({imageURL}) {
    return (
        <div className='center ma'>
            <div className='absolute  mt2'>
                <img alt='' src={imageURL} style={{width: 400, height: 'auto'}}/>
            </div>
       </div>
    );
}

export default Image;