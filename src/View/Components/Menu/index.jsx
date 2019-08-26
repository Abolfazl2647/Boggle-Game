import React, { Component } from 'react';

export default class  extends Component {
    state = {  }
    render() { 
        return (
            <div className="dificaulty-level">
                <ul>
                    <li>Easy</li>
                    <li>Medium</li>
                    <li>Hard</li>
                </ul>
            </div>
        );
    }
}