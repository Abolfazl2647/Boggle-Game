import React, {Component} from 'react';
import Trie from '../../Trie.js';
import './Game.scss';

export default class Game extends Component {
	constructor(props){
		super(props);
		
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.allowDirection = this.allowDirection.bind(this);
		this.cycle = this.cycle.bind(this);
		this.start = this.start.bind(this);
		this.end = this.end.bind(this);
	
	}

	state = {
		string:"",
		direction:"",
		lastPos: null,
		selectedCells:[],
		answerCells:[],
		answerIds:[]
	}

	cycle (item,pos) {
		let selectedCells = [...this.state.selectedCells];
		let string = this.state.string;
			string += item.value;
			selectedCells.push(item.id);
		this.setState({selectedCells, lastPos:pos, string});
		
	}

	allowDirection(pos) {
		let direction = null;
		let lastPos = this.state.lastPos;
		if ( lastPos.col === pos.col && lastPos.row+1 === pos.row  ) { direction = "right"
		} else if ( lastPos.col === pos.col && lastPos.row-1 === pos.row ) { direction = "left"
		} else if ( lastPos.row === pos.row && lastPos.col+1 === pos.col ) { direction = "down"
		} else if ( lastPos.row === pos.row && lastPos.col-1 === pos.col ) { direction = "up"}
		this.setState({direction});
		return direction;
	}

	start(item,pos) {
		// set start position
		this.setState({lastPos: pos}, ()=> {
			this.cycle(item,pos);
		});
		
	}

	handleMouseEnter(item,pos) {
		if (!this.props.draging) return;
		if (this.allowDirection(pos)) this.cycle(item,pos);
	}

	end() {
		let answerCells = [...this.state.answerCells];
		let answerIds = [...this.state.answerIds];

			if ( Trie.contains(this.state.string) ) {
				answerIds = answerIds.concat(this.state.selectedCells);
				answerCells.push({
					string: this.state.string,
					cells: this.state.selectedCells
				});
			}
		// back to defaults
		this.setState({selectedCells:[], answerCells, answerIds, string:""});
	}

	// TODO: show answers on the screen
	// TODO: if user turn back in the col/row i should remove the string

	render() {
		
		let row=-1,col=0;
		return (
			<div className="Game-Wrapper">
				<p className="currentString">{this.state.string}</p>
				<div className="Game">
					{this.props.tableValues.map((item) => {

						// makeing index for table
						if ( row >= 4 ) {
							col++;row = 0;
						} else { row++ };
						let pos = {row,col};
						return <div className={(
											(this.state.selectedCells.indexOf(item.id) !== -1 ? " active " : "") + 
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
						return <span key={index}>{item.value}</span>
					})}
				</div>
			</div>
		);
	}
}