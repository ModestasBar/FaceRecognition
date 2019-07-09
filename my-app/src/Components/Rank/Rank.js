import React from 'react';

function Rank({userName, userScore}) {
    return (
        <div>
            <p className='f4 ma0 center white'>
                {`${userName}, your rank is...`}
            </p>
            <p className='f3 ma1 center white'>
                {userScore}
            </p>
        </div>
    );
}

export default Rank;