import React, { Component } from 'react';

import axios from 'axios';

import { Row, Col } from 'react-grid-system';

//const URL = 'https://tagsrest.herokuapp.com';
let URL = 'http://localhost:3001';

export default class Tags extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            tag : {},
            isData : false,
            date : ''
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
            });
    }

    localDate(date) {
        let currentDate = date.split('T')[0];
        let splitedHour = date.split('T')[1];
        let hourDate = splitedHour.split('.')[0];
        
        let itemDate = {
            date : currentDate,
            hour : hourDate
        }
        
           return itemDate;
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
                                <Col key={post._id} sm={12} md={6} lg={4}>
                                    <div style={{borderBottom : `3px solid ${post.color}`, borderTop : `3px solid ${post.color}`}} className="post-wrapper" >
                                        <h3>#{post.tag}</h3>
                                        <i onClick={this.deleteItem.bind(this)} id={post._id} className="far fa-trash-alt"></i>
                                        <p>{post.post}</p>
                                        <hr/>
                                        <p id="post-date">{this.localDate(post.date).date} - {this.localDate(post.date).hour}</p> 
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
