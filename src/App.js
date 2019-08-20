import React , { Component } from 'react';
import Game from './View/Components/Game';
import Modal from './View/Components/Help';
import Helper from './Controller/helper.js';
import { connect } from 'react-redux';

import BoggleActions from './ViewModel/actions/boggle_actions';
import './App.scss';

// TODO: remove Duplication 

class Boggle extends Component {

	constructor() {
		super();

		this.handleUserAnswers = this.handleUserAnswers.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.ToggleModal = this.ToggleModal.bind(this);
		this.playGame = this.playGame.bind(this);
		this.RunTimer = this.RunTimer.bind(this);

		this.timer = 150;
		this.timeInterval = null;
	}

	ToggleModal(bool) { this.props.toggle_modal(bool) }
	handleMouseDown() {this.props.toggle_draging(true)}
	handleMouseUp() { this.props.toggle_draging(false)}

	playGame() {
		let RandomValues = Helper.generate_random_aplphabet();
		let availableAnswers = Helper.find_answer(RandomValues);
		// we need at least ten word to be found
		// remove duplicate data
		var uniqueNames = [];
		availableAnswers.forEach((item) => {
			if ( uniqueNames.indexOf(item) === -1) uniqueNames.push(item);
		});

		if ( availableAnswers.length < 10 ) {
			this.playGame();
			return;
		}
		
		this.RunTimer();
		this.props.new_game(RandomValues , availableAnswers);
	}

	RunTimer() {
		this.timer = 150;
		clearTimeout(this.timeInterval);
		this.timeInterval = setInterval(() => {
			this.timer--;
			let min = parseInt(this.timer / 60);
			let sec = this.timer % 60;
			if ( sec < 10 ) sec = "0"+sec;
			if ( !this.props.winingStatus ) {
				this.props.updateClock(min+":"+sec);
				if ( this.timer === 0) {
					clearTimeout(this.timeInterval);
					this.props.toggle_wining_status(false);
				}
			}	
		},1000);
	}

	handleUserAnswers(obj) {
        let userAnswers = [...this.props.userAnswers];
        let index = -1;
        for (let i=0; i < userAnswers.length ; i++) {
            if ( userAnswers[i].string === obj.string ) {
				index = i;
				break;
            }
        }
		if ( index === -1 ) { userAnswers.push(obj); }
		
		console.log(userAnswers);
		this.props.user_find_something(userAnswers);
		if ( this.props.userAnswers.length === this.props.Answers.length) {
			this.props.toggle_wining_status(true);
			this.props.updateClock("00:00");
		}
	}

	componentDidMount() {this.playGame(); }
	componentWillUnmount() { clearTimeout(this.timeInterval); }

	render() {
		return (
			<div className="App" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
				<div className={((this.props.help_visibility) ? " blur " : "" )}>
					<div className="Menu">
						<nav>
							<ul className="actions">
								<li><button className="new" onClick={this.playGame}><i className="fa fa-gamepad" aria-hidden="true"></i><span> بازی جدید </span></button></li>
								<li><button className="help" onClick={() => {this.ToggleModal(null)}}><i className="fa fa-exclamation" aria-hidden="true"></i><span> راهنما </span></button></li>
							</ul>
						</nav>
					</div>
					<Game userAnswers={this.handleUserAnswers} />
				</div>
				<Modal />
			</div>
		);
	}
}


const mappropsToProps = (state) => {
	return {
		userAnswers: state.Boggle.userAnswers,
		tableValues: state.Boggle.tableValues,
		Answers: state.Boggle.Answers,
		help_visibility: state.Boggle.help_visibility,
		winingStatus: state.Boggle.winingStatus,
		clock: state.Boggle.clock
	}
}

export default connect( mappropsToProps , BoggleActions )(Boggle);
