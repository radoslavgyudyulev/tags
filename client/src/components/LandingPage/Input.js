import React from 'react';

function Input(props) {
    let { handleChange, enterClicked, getTag } = props;
    return (
        <div className="input-wrapper">
            <div className="label">
                <label >Type your tag</label>
            </div>
            <input 
                id="input" 
                placeholder="Type your tag here..."  
                name="tag" 
                onChange={handleChange} 
                onKeyPress={enterClicked}
                type="text"/>
            <div>
                <button 
                    className="btn" 
                    onClick={getTag}>Next</button>
            </div> 
        </div>
    );
}

export default Input;