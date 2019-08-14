import React, { Component } from 'react';

export default class Modal extends Component {
    state = {  }
    render() { 
        return (
            <div className="Modal-Wrapper">
                <ul>
                    {this.props.Answers.map((item)=>{
                        return <li>{item}</li>
                    })}
                </ul>
            </div>
        );
    }
}