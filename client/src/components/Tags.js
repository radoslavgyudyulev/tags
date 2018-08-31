import React, { Component } from 'react';

import axios from 'axios';

import { Row, Col } from 'react-grid-system';

const URL = 'https://tagsrest.herokuapp.com';
//let URL = 'http://localhost:3001';

export default class Tags extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            tag : {},
            isData : false
        };

        this.getTag = this.getTag.bind(this);
        this.getInputValue = this.getInputValue.bind(this);
        this.enterClicked = this.enterClicked.bind(this);
    }

    getInputValue(e) {
        this.setState({isData : false, tag : e.target.value});
    }
 
    getTag() {
        let tag = this.state.tag;

        axios(`${URL}/post?tag=${tag}`)
            .then(response => this.setState({
                tag : response.data,
                isData : true }));
    }

    enterClicked(e) {
        if(e.key === 'Enter') {
            this.getTag();
        }
    }

    deleteItem(e) {
        let targetItem = e.target.id;

        axios(`${URL}/delete?itemId=${targetItem}`)
            .then(response => {
                if(response.status === 200) {
                    this.getTag();
                }
            })
    }

    render() {
        let { tag, isData }  = this.state;
        return (
            <div className="tag-wrapper">
                <input 
                    placeholder="Search by tag..." 
                    id="input" 
                    onChange={this.getInputValue}
                    onKeyPress={this.enterClicked} 
                    type="text"/>
                <button className="btn" onClick={this.getTag}>Search</button>
                <Row>
                    {isData  
                        ? 
                        tag.map(post => {
                            return (
                                <Col sm={12} md={6} lg={4}>
                                    <div style={{borderBottom : `3px solid ${post.color}`}} className="post-wrapper" key={post._id} >
                                        <h3>#{post.tag}</h3>
                                        <i onClick={this.deleteItem.bind(this)} id={post._id} class="far fa-trash-alt"></i>
                                        <p id="point"></p>
                                        <p>{post.post}</p>
                                        <hr/>
                                        <p id="post-date">{post.date}</p>  
                                    </div>
                                </Col>
                            );
                        })
                        :
                        ''} 
                </Row>
            </div>
        );
    }
}
