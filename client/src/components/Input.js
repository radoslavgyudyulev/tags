import React, { Component } from 'react';
import axios from 'axios';

export default class Input extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            tag : '',
            post : '',
            isInputVisible : true,
            isTextVisible : false,
            visibility: 'visible',
            msg : ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.saveTheData = this.saveTheData.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    saveTheData() {
        let { tag, post } = this.state;
        let postLenght = post.length;
        let URL = 'https://tagsrest.herokuapp.com/';
        let data = {
            tag : tag,
            post : post
        };
        
        if(postLenght >= 8) {
            axios.post(URL, {
                body : data
            }).then(response => this.setState({
                msg : response.data.msg,
                isTextVisible : false}));
        } else {
            this.setState({msg : 'Message must be 8 symbols at least'});
        }
        
    }

    getTag() {
        let { tag } = this.state;
        if(tag.length >= 3) {
            this.setState({
                isInputVisible : false,
                isTextVisible: true,
                msg : ''});
        } else {
            this.setState({msg : 'Tags must be at least 3 symbols'});
        }
            
    }

    render() {
        let { isInputVisible, isTextVisible, msg } = this.state;
        return (
            <div className="input-wrapper">
                {msg 
                    ?
                    <div className="message">
                        <p>{msg}</p>
                    </div>
                    : '' }

                {isInputVisible 
                    ? 
                    <div className="input-wrapper">
                        <div className="label">
                            <label >Type your tag</label>
                        </div>
                        <input id="input" placeholder="Type your tag here..."  name="tag" onChange={this.handleChange} type="text"/>
                        <div>
                            <button className="btn" onClick={this.getTag.bind(this)}>Next</button>
                        </div> 
                    </div>
                    : '' }

                {isTextVisible
                    ?
                    <div>
                        <div className="label">
                            <label>Type your message</label>
                        </div>
                        <textarea onChange={this.handleChange} name="post" id="text-area" placeholder="Type your message here..." cols="30" rows="10">
                        </textarea>
                        <div>
                            <button className="btn" onClick={this.saveTheData}>Send</button>
                        </div>
                    </div>
                    : ''}
            </div>
        );
    }
}
