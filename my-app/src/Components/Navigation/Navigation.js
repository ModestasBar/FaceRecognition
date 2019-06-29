import React from 'react';

function Navigation() {
    return (
        <div>
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
                <p className='f3 pointer link pa3 dim black'>Sign out</p>
            </nav>
        </div>
    );
}

export default Navigation;