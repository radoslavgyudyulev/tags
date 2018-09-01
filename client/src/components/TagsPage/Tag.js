import React from 'react';

function Tag(props) {
    let { color, tag, id, date, post, deleteItem, localDate } = props;
    return (
        <div style={{borderBottom : `3px solid ${color}`, borderTop : `3px solid ${color}`}} className="post-wrapper" >
            <h3>#{tag}</h3>
            <i onClick={deleteItem} id={id} className="far fa-trash-alt"></i>
            <p>{post}</p>
            <hr/>
            <p id="post-date">{localDate(date).date} - {localDate(date).hour}</p> 
        </div>
    ); 
}

export default Tag;