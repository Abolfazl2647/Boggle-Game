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
		this.ToggleModal = this.ToggleModal.bind(this);
		this.playGame = this.playGame.bind(this);
		this.RunTimer = this.RunTimer.bind(this);

		this.timer = 10;
		this.timeInterval = null;
	}

	ToggleModal(bool) { this.props.toggle_modal(bool) }

	playGame() {
		this.timer = 10;
		let RandomValues = Helper.generate_random_aplphabet();
		let availableAnswers = Helper.find_answer(RandomValues);
		// we need at least ten word to be found
		// remove duplicate data
		var uniqueNames = [];
		availableAnswers.forEach((item) => {
			if ( uniqueNames.indexOf(item) === -1) uniqueNames.push(item);
		});

		if ( uniqueNames.length < 10 ) {
			this.playGame();
			return;
		}
		
		this.RunTimer();
		this.props.new_game(RandomValues , uniqueNames);
	}

	RunTimer() {
		
		clearTimeout(this.timeInterval);
		this.timeInterval = setInterval(() => {
			this.timer--;
			let min = parseInt(this.timer / 60);
			let sec = this.timer % 60;
			if ( sec < 10 ) sec = "0"+sec;
			if ( this.props.winingStatus === 0) {
				this.props.updateClock(min+":"+sec);
				if ( this.timer === 0) {
					this.props.toggle_wining_status(-1);
					this.props.updateClock("00:00");
					clearTimeout(this.timeInterval);
				}
			}
		},1000);
	}

	componentDidMount() {this.playGame(); }
	componentWillUnmount() { clearTimeout(this.timeInterval); }

	render() {
		return (
			<div className="App">
				<div className={((this.props.help_visibility) ? " blur " : "" )}>
					<div className="Menu">
						<nav>
							<ul className="actions">
								<li><button className="new" onClick={this.playGame}><i className="fa fa-gamepad" aria-hidden="true"></i><span> بازی جدید </span></button></li>
								<li><button className="help" onClick={() => {this.ToggleModal(null)}}><i className="fa fa-exclamation" aria-hidden="true"></i><span> راهنما </span></button></li>
							</ul>
						</nav>
					</div>
					<Game />
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