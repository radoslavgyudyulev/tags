import React, { Component } from 'react';

import axios from 'axios';


let URL = 'https://tagsrest.herokuapp.com/';

export default class Tags extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            tag : {},
            isData : false
        };

        this.getTag = this.getTag.bind(this);
        this.getInputValue = this.getInputValue.bind(this);
    }

    getInputValue(e) {
        this.setState({tag : e.target.value});
    }

    getTag() {
        let tag = this.state.tag;

        axios(`${URL}/post?tag=${tag}`)
            .then(response => this.setState({
                tag : response.data,
                isData : true }));
    }

    render() {
        let { tag, isData }  = this.state;
        return (
            <div className="tag-wrapper">
                <input placeholder="Search by tag..." id="input" onChange={this.getInputValue} type="text"/>
                <button className="btn" onClick={this.getTag}>Search</button>
                
                {isData 
                    ? 
                    tag.map(post => {
                        return (
                            <div className="post-wrapper" key={post._id} >
                                <h3>#{post.tag}</h3>
                                <p>{post.post}</p>
                                <hr/>
                                <p>{post.date}</p>
                            </div>
                        );
                    })
                    :
                    ''} 
            </div>
        );
    }
}
