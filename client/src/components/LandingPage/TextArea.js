import React from 'react';

function TextArea(props) {
    let { handleChange, enterClicked } = props;
    return (
        <div>
            <div className="label">
                <label>Type your message</label>
            </div>
            <textarea 
                onChange={handleChange} 
                onKeyPress={enterClicked}
                name="post" 
                id="text-area" 
                placeholder="Type your message here..." 
                cols="30" 
                rows="10">
            </textarea>
        </div>
    );
}

export default TextArea;