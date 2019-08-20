import React, { Component } from 'react';
import { connect } from 'react-redux';
import BoggleActions from '../../../ViewModel/actions/boggle_actions';
import './index.scss';

class Modal extends Component {

    constructor(props){
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentWillUnmount() { document.removeEventListener('mousedown', this.handleClickOutside)}
    componentDidMount() {  document.addEventListener('mousedown', this.handleClickOutside)}
    handleClickOutside = (event) => {
        if ( this.props.help_visibility ) {
            if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
                this.props.toggle_modal(false);
            }
        }
    }

    render() { 

        let userAnswers = this.props.userAnswers ? this.props.userAnswers.map((item) => {
            return item.string;
        }) : [];

        return (
            <div className={(( this.props.help_visibility ) ? 'show' : "") + " Modal-Wrapper "}>
                <div className="Modal" ref={this.wrapperRef}>
                    <p><i className="fa fa-tags" aria-hidden="true"></i><span>راهنما</span></p>
                    <ul>
                        {this.props.availableAnswers ? this.props.availableAnswers.map((item,index)=>{
                            return <li key={index} className={ (userAnswers.indexOf(item) !== -1) ? "found" : "" }><i className="fa fa-tag" aria-hidden="true"></i><span>{item}</span></li>
                        }) : null} 
                    </ul>
                </div>
            </div>
        );
    }
}


const mappropsToProps = (state) => {
	return {
		availableAnswers: state.Boggle.availableAnswers,
		help_visibility: state.Boggle.help_visibility,
	}
}

export default connect( mappropsToProps , BoggleActions )(Modal);
