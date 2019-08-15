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
		selectedIds:[],
		answerCells:[],
		answerIds:[],
		lastPos: null
	}

	allowDirection(pos) {
		let direction = null;
		let lastPos = this.state.lastPos;
		if ( lastPos.col === pos.col && lastPos.row+1 === pos.row  ) { direction = "right"
		} else if ( lastPos.col === pos.col && lastPos.row-1 === pos.row ) { direction = "left"
		} else if ( lastPos.row === pos.row && lastPos.col+1 === pos.col ) { direction = "down"
		} else if ( lastPos.row === pos.row && lastPos.col-1 === pos.col ) { direction = "up"}
		else if (lastPos.row === pos.row && lastPos.col === pos.col){ direction = true}
		return direction;
	}

	isBackward(goingPos) {
		let lastPos = this.state.lastPos;

		console.log(goingPos , lastPos)

		if ( lastPos ){
			return (goingPos.row === lastPos.row && goingPos.col === lastPos.col);
		} else { return false}
		
	}

	start(item,pos) {
		// set start position , string and id
		// add string
		let selectedIds = [...this.state.selectedIds];
		let string = this.state.string;
			string += item.value;
			selectedIds.push(item.id);
		this.setState({string, selectedIds, lastPos:pos})
	}

	handleMouseEnter(item,goingPos) {
		if (!this.props.draging) return;
		if (this.allowDirection(goingPos)) {
			let selectedIds = [...this.state.selectedIds];
			let string = this.state.string;
			if ( !this.isBackward(goingPos)) {
				string += item.value;
				selectedIds.push(item.id);
				this.setState({string, selectedIds, lastPos:goingPos});
			} else {
				selectedIds.pop();
				string = string.slice(0, string.length-1);
			}
		}
	}

	end() {
		let answerCells = [...this.state.answerCells];
		let answerIds = [...this.state.answerIds];
		if ( Trie.contains(this.state.string) ) {
			answerIds = answerIds.concat(this.state.selectedIds);
			answerCells.push({
				string: this.state.string,
				cells: this.state.selectedIds
			});
		}
		// back to defaults
		this.setState({selectedIds:[], answerCells, answerIds, string:""});
	}

	// TODO: if user turn back in the col/row i should remove the string
	// TODO: if user find all answers we show him a congrats Alert
	// TODO: add timeout for selecting all words;
	// Clear Data on New Game

	render() {
		console.log(this.props)
		let row=-1,col=0;
		return (
			<div className="Game-Wrapper">
				<div className="Game-Header">
					<label className="total-words">
						<span>کلمات موجود:</span>
						<span className="num">{this.props.Answers.length}</span>
					</label>
					<p className="currentString">{this.state.string}</p>
				</div>
				<div className="Game">
					{this.props.tableValues.map((item) => {

						// makeing index for table
						if ( row >= 4 ) {
							col++;row = 0;
						} else { row++ };
						let pos = {row,col};

						return <div className={(
											(this.state.selectedIds.indexOf(item.id) !== -1 ? " active " : "") + 
											(this.state.answerIds.indexOf(item.id) !== -1 ? " answer " : "") + " cell " )}
									key={item.id}
									unselectable="on"
									onMouseUp={this.end}
									onMouseDown={()=> {this.start(item,pos)}}
									onMouseEnter={()=> {this.handleMouseEnter(item,pos)}}>{item.value}</div>
					})}
				</div>
				<div className="answer-list">
					{this.state.answerCells.map((item,index) => {
						return <span key={index}><i className="fa fa-tag" aria-hidden="true"></i><span>{item.string}</span></span>
					})}
				</div>
			</div>
		);
	}
}