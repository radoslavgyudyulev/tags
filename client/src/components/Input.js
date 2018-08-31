import React, { Component } from 'react';
import axios from 'axios';


export default class Input extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            tag : '',
            post : '',
            color : '',
            isInputVisible : true,
            isTextVisible : false,
            isColor : false,
            msg : ''
        };

        // functions
        this.handleChange = this.handleChange.bind(this);
        this.saveTheData = this.saveTheData.bind(this);
        this.enterClickedTag = this.enterClickedTag.bind(this);
        this.enterClickedMsg = this.enterClickedMsg.bind(this);
        this.getTag = this.getTag.bind(this);
        this.getColor = this.getColor.bind(this);

    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    saveTheData() {
        let { tag, post, color } = this.state;
        let postLenght = post.length;
        const URL = 'https://tagsrest.herokuapp.com';
        //let URL = 'http://localhost:3001';
        let data = {
            tag : tag,
            post : post,
            color : color
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

    enterClickedTag(e) {
        if(e.key === 'Enter') {
            this.getTag();
        }
    }

    enterClickedMsg(e) {
        if(e.key === 'Enter') {
            this.saveTheData();
        }
    }

    getColor(e) {
        let color = e.target.id;
        this.setState({color : color});
    }

    render() {
        let { isInputVisible, isTextVisible, color, msg } = this.state;
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
                        <input 
                            id="input" 
                            placeholder="Type your tag here..."  
                            name="tag" 
                            onChange={this.handleChange} 
                            onKeyPress={this.enterClickedTag}
                            type="text"/>
                        <div>
                            <button 
                                className="btn" 
                                onClick={this.getTag}>Next</button>
                        </div> 
                    </div>
                    : '' }
                {isTextVisible
                    ?
                    <div>
                        <div className="label">
                            <label>Type your message</label>
                        </div>
                        <textarea 
                            onChange={this.handleChange} 
                            onKeyPress={this.enterClickedMsg}
                            name="post" 
                            id="text-area" 
                            placeholder="Type your message here..." 
                            cols="30" 
                            rows="10">
                        </textarea>
                        {!color
                            ?
                            <div>
                                <h3>Pick up a color</h3>
                                <div className="colors-wrapper">
                                    <div onClick={this.getColor} id="green"></div>
                                    <div onClick={this.getColor} id="yellow"></div>
                                    <div onClick={this.getColor} id="red"></div>      
                                </div> 
                            </div>
                            : '' }
                        <div>
                            <button 
                                className="btn" 
                                onClick={this.saveTheData}>Send</button>
                        </div>
                    </div>
                    : ''}
            </div>
        );
    }
}
