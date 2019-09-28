import React , { Component } from 'react';
import Menu from './View/Components/Menu';
import Game from './View/Components/Game';
import Modal from './View/Components/Help';
import Helper from './Controller/helper.js';
import Lang from './lang';
import { connect } from 'react-redux';
import BoggleActions from './ViewModel/actions/boggle_actions';
import './App.scss';
// TODO: CPU pick up
class Boggle extends Component {

	constructor() {
		super();
		
		this.playGame = this.playGame.bind(this);
		this.RunTimer = this.RunTimer.bind(this);
		this.setLang = this.setLang.bind(this);
		this.handleDifficaulty = this.handleDifficaulty.bind(this);

		this.level = {
			timer: 600,
			score: 10,
			maxWords: 5,
			difficaulty: null,
		};
		this.timeInterval = null;
	}

	setLang(lang) {
		this.props.set_lang(lang);
	}

	handleDifficaulty(level) {
		this.level.difficaulty = level;
		if ( level === 'HEAVEN' ) {
			this.level.timer = 600;
			this.level.maxWords = 5;
			this.level.score = 20;
		} else if ( level === 'HEAVEN_TO_HELL' ) {
			this.level.timer = 300;
			this.level.maxWords = 10;
			this.level.score = 20;
		} else if ( level === 'HELL_TO_HELL' ) {
			this.level.timer = 150;
			this.level.maxWords = 15;
			this.level.score = 50;
		}
		this.playGame();
		// this.props.set_view(true);
	}

	playGame() {
		const RandomValues = Helper.generate_random_aplphabet();
		const availableAnswers = Helper.find_answer(RandomValues);
		// we need at least ten word to be found
		// remove duplicate data

		let total = 0;
		for ( let i=0; i < availableAnswers.length ; i++ ) {
			total += availableAnswers[i].length;
		}

		if (availableAnswers.length < this.level.maxWords || total < this.level.score) {
			this.playGame();
			return;
		}
			
		this.RunTimer();
		this.props.new_game(RandomValues , availableAnswers, true);
	}

	RunTimer() {
		clearTimeout(this.timeInterval);
		this.timeInterval = setInterval(() => {
			this.level.timer--;
			let min = parseInt(this.level.timer / 60);
			let sec = this.level.timer % 60;
			if ( sec < 10 ) sec = "0"+sec;
			if ( this.props.winingStatus === 0) {
				this.props.updateClock(min+":"+sec);
				if ( this.level.timer === 0) {
					this.props.toggle_wining_status(-1);
					this.props.updateClock("00:00");
					clearTimeout(this.timeInterval);
				}
			}
		},1000);
	}

	componentWillUnmount() { clearTimeout(this.timeInterval); }

	render() {
		return (
			<div className="App">
				<div className={((this.props.help_visibility) ? " blur " : "" ) + " App-Content "}>
					<div className="Views-Wrapper">
						<div className={( (this.props.view) ? "game" : '')+" Views"}>
							<Menu Lang={Lang} language={this.props.language} setLang={this.setLang} difficaulty={this.handleDifficaulty}/>
							<Game Lang={Lang} playGame={this.playGame}/>
						</div>
					</div>
				</div>
				<Modal Lang={Lang} />
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
		clock: state.Boggle.clock,
		view: state.Boggle.view,
		language: state.Boggle.language
	}
}

export default connect( mappropsToProps , BoggleActions )(Boggle);