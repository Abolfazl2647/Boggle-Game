import React , { Component } from 'react';
import Game from './View/Components/Game';
import Modal from './View/Components/Help';
import Helper from './Controller/helper.js';
import { connect } from 'react-redux';
import { toggle_modal, updateClock } from './ViewModel/actions/boggle_actions';
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
		this.timeInter = null;
		this.draging = false;

	}

	state = {
		availableAnswers:[],
		help_visibility:false,
		userAnswers:[],
		tableValues:[],
		win: false,
		loose: false,
		time: 10,
		clock: null
	}

	ToggleModal(bool) {
		this.props.toggle_modal(bool);
	}

	handleMouseDown() { this.draging = true }
	handleMouseUp() { this.draging = false }

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
			time: 10,
		});
	}

	RunTimer() {
		clearTimeout(this.timeInter);
		this.timeInter = setInterval(() => {
			this.timer--;
			let min = parseInt(this.timer / 60);
			let sec = this.timer % 60;
			if ( sec < 10 ) sec = "0"+sec;

			if ( !this.props.winingStatus ) {
				this.props.updateClock(min+":"+sec);
				if ( this.timer === 0) {
					clearTimeout(this.timeInter);
					this.props.toggle_wining_status(false);
				}
			}	
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
	componentWillUnmount() { clearTimeout(this.timeInter); }
	componentDidUpdate() {
		if ( this.state.time === 10 ) {
			this.RunTimer();
		}
	}

	render() {
		return (
			<div className="App" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
				<div className={((this.props.help_visibility) ? " blur " : "" )}>
					<div className="Menu">
						<nav>
							<ul className="actions">
								<li><button className="new" onClick={this.playGame}><i className="fa fa-gamepad" aria-hidden="true"></i><span> بازی جدید </span></button></li>
								<li><button className="help" onClick={()=> {this.ToggleModal(null)}}><i className="fa fa-exclamation" aria-hidden="true"></i><span> راهنما </span></button></li>
							</ul>
						</nav>
					</div>
					<Game 
						win={this.state.win}
						draging={this.draging}
						loose={this.state.loose}
						clock={this.props.clock}
						tableValues={this.state.tableValues}
						userPickups={this.state.userAnswers}
						userAnswers={this.handleUserAnswers}
						Answers={this.state.availableAnswers} />
				</div>
				<Modal 
					ToggleModal={this.ToggleModal}
					visibility={this.props.help_visibility} 
					userPickups={this.state.userAnswers}
					Answers={this.state.availableAnswers} />
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		help_visibility: state.Boggle.help_visibility,
		winingStatus: state.Boggle.winingStatus,
		clock: state.Boggle.clock
	}
  }
  
  export default connect( mapStateToProps , {toggle_modal,updateClock})(Boggle);
  