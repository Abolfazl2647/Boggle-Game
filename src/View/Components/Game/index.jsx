import React, {Component} from 'react';
import { connect } from 'react-redux';
import Trie from '../../../Controller/Trie.js';
import BoggleActions from '../../../ViewModel/actions/boggle_actions';
import './Game.scss';

class Game extends Component {
	constructor(props){
		super(props);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.allowDirection = this.allowDirection.bind(this);
		this.isBackward = this.isBackward.bind(this);
		this.start = this.start.bind(this);
		this.end = this.end.bind(this);
	}

	allowDirection(pos) {
		let direction = null;
		let lastPos = this.props.selectedPath[this.props.selectedPath.length-1];
		if ( lastPos.col === pos.col && lastPos.row+1 === pos.row  ) { direction = "right"
		} else if ( lastPos.col === pos.col && lastPos.row-1 === pos.row ) { direction = "left"
		} else if ( lastPos.row === pos.row && lastPos.col+1 === pos.col ) { direction = "down"
		} else if ( lastPos.row === pos.row && lastPos.col-1 === pos.col ) { direction = "up"}
		else if (lastPos.row === pos.row && lastPos.col === pos.col){ direction = true}
		return direction;
	}

	isBackward(goingPos) {
		let lastPos = this.props.selectedPath[this.props.selectedPath.length-2];
		if ( lastPos ){
			return (goingPos.row === lastPos.row && goingPos.col === lastPos.col);
		} else {
			return false;
		}
	}

	start(item,pos) {
		if ( this.props.winingStatus ) return;
		let selectedPath = [...this.props.selectedPath];
		let selectedIds = [...this.props.selectedIds];
		let string = this.props.string;
			string += item.value;
			selectedIds.push(item.id);
			selectedPath.push(pos);
			
		this.props.start_touch(string,selectedIds,selectedPath);
	}

	handleMouseEnter(item,goingPos) {
		if (!this.props.draging) return;
		if (this.props.winingStatus) return;
		if (this.allowDirection(goingPos)) {
			
			let selectedPath = [...this.props.selectedPath];
			let selectedIds = [...this.props.selectedIds];
			let string = this.props.string;

			if ( !this.isBackward(goingPos)) {
				string += item.value;
				selectedIds.push(item.id);
				selectedPath.push(goingPos);
			} else {
				selectedIds.pop();
				selectedPath.pop();
				string = string.slice(0, string.length-1);
			}

			this.props.swipe({
				selectedPath,
				selectedIds,
				string
			});
		}
	}

	end() {
		// back to defaults
		let answerIds = [...this.props.answerIds];
		if ( Trie.contains(this.props.string) ) {
			answerIds = answerIds.concat(this.props.selectedIds);
			this.props.userAnswers({
				string: this.props.string,
				cells: this.props.selectedIds
			});
		}
		this.props.end_touch(answerIds);
	}

	// TODO: if user Win Or Loose show Alert
	// TODO: PWA
	// TODO: MVVM

	render() {

		let row=-1,col=0;
		return (
			<div className="Game-Wrapper">
				<div className="Game-Header">
					<label className="total-words">
						<span>کلمات موجود:</span>
						<span className="num">{this.props.Answers ? this.props.Answers.length : null}</span>
					</label>
					<p className={(this.props.winingStatus ? " win " : " loose ") + "currentString"}>
						{(this.props.clock === "00:00") ? (this.props.winingStatus) ? "برنده شدید" :  " باختی " : null}
					</p>
					<label className="clock">
						<span className="num">{this.props.clock}</span>
						<span className="clock fa fa-clock-o"></span>
					</label>
				</div>
				<div className="Game">
					{ this.props.tableValues ? this.props.tableValues.map((item) => {
						// makeing index for table
						if ( row >= 4 ) {
							col++;row = 0;
						} else { row++ };
						let pos = {row,col};

						return (
							<div className={
								(this.props.clock === "00:00" ? this.props.winingStatus ? " win " : "loose" : "") +
								(this.props.selectedIds.indexOf(item.id) !== -1 ? " active " : "") + 
								(this.props.answerIds.indexOf(item.id) !== -1 ? " answer " : "") + " cell "}
								key={item.id}
								unselectable="on"
								onMouseUp={this.end}
								onMouseDown={()=> {this.start(item,pos)}}
								onMouseEnter={()=> {this.handleMouseEnter(item,pos)}}>{item.value}
							</div>)
							}) : null}
				</div>
				<div className="answer-list">
					<p>کلمات یافت شده:</p>
					{this.props.userPickups ? this.props.userPickups.map((item,index) => {
						return <span key={index}><i className="fa fa-tag" aria-hidden="true"></i><span>{item.string}</span></span>
					}): null}
				</div>
			</div>
		);
	}
}

const mappropsToProps = (state) => {
	return {
		clock: state.Boggle.clock,
		Answers: state.Boggle.Answers,
		tableValues: state.Boggle.tableValues,
		winingStatus: state.Boggle.winingStatus,
		selectedIds: state.Boggle.selectedIds,
		selectedPath: state.Boggle.selectedPath,
		answerIds: state.Boggle.answerIds,
		string: state.Boggle.string,
		draging: state.Boggle.draging,
		help_visibility: state.Boggle.help_visibility,
	}
}

export default connect( mappropsToProps , BoggleActions )(Game);
