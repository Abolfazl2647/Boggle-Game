import React , { Component } from 'react';
import Game from './Components/Game';
import Modal from './Components/Help';
import Helper from './helper.js';
import './App.scss';

// TODO: remove Duplication 

export default class Boggle extends Component {

	constructor() {
		super();

		this.handleMouseDown = this.handleMouseDown.bind(this);
		this.handleMouseUp = this.handleMouseUp.bind(this);
		this.ToggleModal = this.ToggleModal.bind(this);
		this.handleHelp = this.handleHelp.bind(this);
		this.playGame = this.playGame.bind(this);
	}

	state = {
		needHelp:false,
		draging: false,
		availableAnswers:[],
		tableValues:[]
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
		// we need at least one word to be found
		if ( !Answers.length ) this.playGame();
		this.setState({
			tableValues: RandomValues,
			availableAnswers: Answers 
		});
	}

	componentDidMount() {
		this.playGame();
	}

	render() { 
		return (
			<div className="App" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp}>
				<div className={((this.state.needHelp) ? " blur " : "" ) + "container" }>
					<div className="row">
						<div className="col-4">
							<nav>
								<ul className="actions">
									<li><button className="help" onClick={this.handleHelp} ><i className="fa fa-exclamation" aria-hidden="true"></i><span> راهنما </span></button></li>
									<li><button className="new" onClick={this.playGame}><i className="fa fa-gamepad" aria-hidden="true"></i><span> بازی جدید </span></button></li>
									<li><button className="back"><i className="fa fa-power-off" aria-hidden="true"></i><span> خروج </span></button></li>
								</ul>
							</nav>
						</div>
						<div className="col-8">
							<Game draging={this.state.draging} tableValues={this.state.tableValues} />
						</div>
					</div>
				</div>
				<Modal visibility={this.state.needHelp} ToggleModal={this.ToggleModal} Answers={this.state.availableAnswers} />
			</div>
		);
	}
}