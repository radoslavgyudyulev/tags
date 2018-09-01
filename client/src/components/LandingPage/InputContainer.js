import React, { Component } from 'react';
import axios from 'axios';

import Msg from './Msg';
import Input from './Input';
import TextArea from './TextArea';
import ColorPicker from './ColorPicker';


export default class InputContainer extends Component {

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
                    <Msg msg={msg} />
                    : '' }

                {isInputVisible 
                    ? 
                    <Input 
                        handleChange={this.handleChange}
                        enterClicked={this.enterClickedTag} 
                        getTag={this.getTag} />
                    : '' }
                {isTextVisible
                    ?
                    <div>
                        <TextArea 
                            handleChange={this.handleChange}
                            enterClicked={this.enterClickedMsg}/>
                        {!color
                            ?
                            <ColorPicker getColor={this.getColor}/>
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
