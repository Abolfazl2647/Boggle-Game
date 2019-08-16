import React , { Component } from 'react';
import Game from './Components/Game';
import Modal from './Components/Help';
import Helper from './helper.js';
import './App.scss';

// TODO: remove Duplication 

export default class Boggle extends Component {

	constructor() {
		super();

		this.handleUserAnswers = this.handleUserAnswers.bind(this);
		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.ToggleModal = this.ToggleModal.bind(this);
		this.handleHelp = this.handleHelp.bind(this);
		this.playGame = this.playGame.bind(this);

		this.timer = null;
	}

	state = {
		needHelp:false,
		draging: false,
		availableAnswers:[],
		userAnswers:[],
		tableValues:[],
		win: false,
		loose: false,
		time: 120,
		clock: null
	}

	handleHelp() {
		this.setState({needHelp: !this.state.needHelp});
	}

	ToggleModal(bool) {
		this.setState({needHelp: bool});
	}

	handleMouseDown() { this.setState({draging:true}) }
	handleMouseUp() { this.setState({draging:false}) }

	playGame() {
		let RandomValues = Helper.generate_random_aplphabet();
		let Answers = Helper.find_answer(RandomValues);
		// we need at least ten word to be found
		if ( Answers.length < 10 ) {
			this.playGame();
			return;
		}

		this.setState({
			tableValues: RandomValues,
			availableAnswers: Answers,
			userAnswers:[],
			win: false,
			loose: false,
			time:120
		});
	}

	handleUserAnswers(obj) {
		let userAnswers = [...this.state.userAnswers];
			userAnswers.push(obj);
		this.setState({userAnswers}, () => {
			if ( this.state.userAnswers.length === this.state.availableAnswers.length) {
				this.setState({win:true});
			}
		});
	}

	componentDidMount() {
		this.playGame();
		let timer = this.state.time;
		if ( this.state.time === 0) {
			clearTimeout(this.timer);
			this.setState({loose: true});
		}
		this.timer = setInterval(() => {
			timer--;
			let min = parseInt(this.state.time / 60);
			let sec = this.state.time % 60;
			if ( sec < 10 ) {
				sec = "0" + sec;
			}
			this.setState({time: timer, clock: min+":"+sec});
		},1000);
	}

	componentWillUnmount() {
		clearTimeout(this.timer);
	}

	render() { 
		return (
			<div className="App" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
				<div className={((this.state.needHelp) ? " blur " : "" )}>
					<div className="Menu">
						<nav>
							<ul className="actions">
								<li><button className="new" onClick={this.playGame}><i className="fa fa-gamepad" aria-hidden="true"></i><span> بازی جدید </span></button></li>
								<li><button className="help" onClick={this.handleHelp}><i className="fa fa-exclamation" aria-hidden="true"></i><span> راهنما </span></button></li>
							</ul>
						</nav>
					</div>
					<Game 
						clock={this.state.clock}
						draging={this.state.draging} 
						tableValues={this.state.tableValues}
						userPickups={this.state.userAnswers}
						userAnswers={this.handleUserAnswers}
						Answers={this.state.availableAnswers} />
				</div>
				<Modal visibility={this.state.needHelp} ToggleModal={this.ToggleModal} Answers={this.state.availableAnswers} />
			</div>
		);
	}
}