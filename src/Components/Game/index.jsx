import React, {Component} from 'react';
import Trie from '../../Trie.js';
import './Game.scss';

export default class Game extends Component {
	constructor(props){
		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.allowDirection = this.allowDirection.bind(this);
		this.isBackward = this.isBackward.bind(this);
		this.start = this.start.bind(this);
		this.end = this.end.bind(this);
	}

	state = {
		string:"",
		answerIds:[],
		selectedIds:[],
		selectedPath: []
	}

	allowDirection(pos) {
		let direction = null;
		let lastPos = this.state.selectedPath[this.state.selectedPath.length-1];
		if ( lastPos.col === pos.col && lastPos.row+1 === pos.row  ) { direction = "right"
		} else if ( lastPos.col === pos.col && lastPos.row-1 === pos.row ) { direction = "left"
		} else if ( lastPos.row === pos.row && lastPos.col+1 === pos.col ) { direction = "down"
		} else if ( lastPos.row === pos.row && lastPos.col-1 === pos.col ) { direction = "up"}
		else if (lastPos.row === pos.row && lastPos.col === pos.col){ direction = true}
		return direction;
	}

	isBackward(goingPos) {
		let lastPos = this.state.selectedPath[this.state.selectedPath.length-2];
		if ( lastPos ){
			return (goingPos.row === lastPos.row && goingPos.col === lastPos.col);
		} else {
			return false;
		}
	}

	start(item,pos) {
		// set start position , string and id
		// add string
		let selectedPath = [...this.state.selectedPath];
		let selectedIds = [...this.state.selectedIds];
		let string = this.state.string;
			string += item.value;
			selectedIds.push(item.id);
			selectedPath.push(pos);
		this.setState({string, selectedIds, selectedPath})
	}

	handleMouseEnter(item,goingPos) {
		if (!this.props.draging) return;
		if (this.allowDirection(goingPos)) {
			let selectedPath = [...this.state.selectedPath];
			let selectedIds = [...this.state.selectedIds];
			let string = this.state.string;
			if ( !this.isBackward(goingPos)) {
				string += item.value;
				selectedIds.push(item.id);
				selectedPath.push(goingPos);
			} else {
				selectedIds.pop();
				selectedPath.pop();
				string = string.slice(0, string.length-1);
			}
			this.setState({string, selectedIds, selectedPath});
		}
	}

	end() {
		let answerIds = [...this.state.answerIds];
		if ( Trie.contains(this.state.string) ) {
			answerIds = answerIds.concat(this.state.selectedIds);
			this.props.userAnswers({
				string: this.state.string,
				cells: this.state.selectedIds
			});
		}
		// back to defaults
		this.setState({answerIds, selectedIds:[], string:""});
	}

	// TODO: if user find all answers we show him a congrats Alert
	// TODO: add timeout for selecting all words;

	render() {

		let row=-1,col=0;

		return (
			<div className="Game-Wrapper">
				<div className="Game-Header">
					<label className="total-words">
						<span>کلمات موجود:</span>
						<span className="num">{this.props.Answers.length}</span>
					</label>
					<p className="currentString">{this.state.string}</p>
					<label className="clock">
						<span className="num">{this.props.clock}</span>
						<span className="clock fa fa-clock-o"></span>
					</label>
				</div>
				<div className="Game">
					{this.props.tableValues.map((item) => {

						// makeing index for table
						if ( row >= 4 ) {
							col++;row = 0;
						} else { row++ };
						let pos = {row,col};

						return (
							<div className={
								(this.state.selectedIds.indexOf(item.id) !== -1 ? " active " : "") + 
								(this.state.answerIds.indexOf(item.id) !== -1 ? " answer " : "") + " cell "}
								key={item.id}
								unselectable="on"
								onMouseUp={this.end}
								onMouseDown={()=> {this.start(item,pos)}}
								onMouseEnter={()=> {this.handleMouseEnter(item,pos)}}>{item.value}</div>
						)
					})}
				</div>
				<div className="answer-list">
					<p>کلمات یافت شده:</p>
					{this.props.userPickups.map((item,index) => {
						return <span key={index}><i className="fa fa-tag" aria-hidden="true"></i><span>{item.string}</span></span>
					})}
				</div>
			</div>
		);
	}
}