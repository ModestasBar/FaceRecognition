import React from 'react';

function Navigation({onClick, routerState}) {
    return (
        <div>
            <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            {
                routerState === 'home' ?
                    <p onClick={()=>onClick('sign')} className='f3 pointer link pa3 dim black'>Sign out</p> 
                : 
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p onClick={()=>onClick('sign')} className='f3 pointer link pa3 dim black'>Sign in</p>
                    <p onClick={()=>onClick('register')} className='f3 pointer link pa3 dim black'>Register</p>
                </div>
            }
            </nav>
        </div>
    );
}

export default Navigation;