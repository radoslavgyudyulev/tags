import React from 'react';

function ColorPicker(props) {
    let { getColor } = props;
    return (
        <div>
            <h3>Pick up a color</h3>
            <div className="colors-wrapper">
                <div onClick={getColor} id="green"></div>
                <div onClick={getColor} id="yellow"></div>
                <div onClick={getColor} id="red"></div>      
            </div> 
        </div>
    );
}

export default ColorPicker;