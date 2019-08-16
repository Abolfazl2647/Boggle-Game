import React , { Component } from 'react';
import Game from './View/Components/Game';
import Modal from './View/Components/Help';
import Helper from './Controller/helper.js';
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
		this.RunTimer = this.RunTimer.bind(this);
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
		time: 90,
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
		// remove duplicate data
		var uniqueNames = [];
		Answers.forEach((item) => {
			if ( uniqueNames.indexOf(item) === -1) uniqueNames.push(item);
		});

		if ( Answers.length < 10 ) {
			this.playGame();
			return;
		}

		this.RunTimer();
		this.setState({
			tableValues: RandomValues,
			availableAnswers: uniqueNames,
			userAnswers:[],
			win: false,
			loose: false,
			time: 90,
		});
	}

	RunTimer() {
		let timer = this.state.time;
		clearTimeout(this.timer);
		this.timer = setInterval(() => {
			timer--;	
			this.setState({time: timer}, () => {
				let min = parseInt(this.state.time / 60);
				let sec = this.state.time % 60;
				if ( sec < 10 )  sec = "0" + sec;
				if ( !this.state.win ) {
					this.setState({clock: min+":"+sec},() => {
						if ( this.state.time === 0) {
							clearTimeout(this.timer);
							this.setState({loose: true});
						}
					});
				}
			});		
		},1000);
	}

	handleUserAnswers(obj) {
		let availableAnswers = [...this.state.availableAnswers];
		let userAnswers = [...this.state.userAnswers];
		if ( availableAnswers.indexOf(obj) === -1 ) {
			userAnswers.push(obj);
		}
			
		this.setState({userAnswers}, () => {
			if ( this.state.userAnswers.length === this.state.availableAnswers.length) {
				this.setState({win:true, clock:"00:00"});
			}
		});
	}

	componentDidMount() {this.playGame(); }
	componentWillUnmount() { clearTimeout(this.timer); }
	componentDidUpdate() {
		if ( this.state.time === 90 ) {
			this.RunTimer();
		}
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
						win={this.state.win}
						loose={this.state.loose}
						clock={this.state.clock}
						draging={this.state.draging} 
						tableValues={this.state.tableValues}
						userPickups={this.state.userAnswers}
						userAnswers={this.handleUserAnswers}
						Answers={this.state.availableAnswers} />
				</div>
				<Modal 
					visibility={this.state.needHelp} 
					ToggleModal={this.ToggleModal} 
					userPickups={this.state.userAnswers}
					Answers={this.state.availableAnswers} />
			</div>
		);
	}
}