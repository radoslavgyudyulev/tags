import React from 'react';

function Msg(props) {
    let { msg } = props;
    return (
        <div className="message">
            <p>{msg}</p>
        </div>
    )
}

export default Msg;