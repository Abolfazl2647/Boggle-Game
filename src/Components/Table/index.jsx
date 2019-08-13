import React, {useState} from 'react';
import Trie from '../../Trie.js';
import Helper from '../../helper.js';
import './Table.scss';

let selectedList = [];
const Table = (props) => {

	let [lasPos, setLastPos] = useState({rows: null, cols: null, value:null});
	let [string, setString] = useState("");
	let [answers , setAnswers] = useState([]);
	let row = 0, col = 0;

	const help = () => {
		console.log('Help');
		// show modal
		// solve this before with backtrack
	}

	const dragStart = (pos,id) => {
		if (selectedList.indexOf(id) !== -1) return;
		setString(string += pos.value);
		setLastPos(pos);
		selectedList.push(id);
	}

	const dragEnd = (pos) => {
		// check in DB
		if ( string.length >= 2 ) {
			if ( Trie.contains(string) ) {
				let array = answers;
					array.push({value: string, ids:selectedList });
				setAnswers(array);
			} else {
				setString(""); 
				selectedList = [];
			}
		}

		console.log(answers);
	}

	const hoverOverCells = (pos,id) => {
		if ( props.draging  ) {
			if (selectedList.indexOf(id) === -1) {
				if (directionsAllowed(pos,id)) {
					setString(string += pos.value);
					selectedList.push(id);
					setLastPos(pos);
				}
			}
		}
		
	}

	// only move Plus Sign === up,down,left,right
	const directionsAllowed = (pos) => {
		return (pos.rows === lasPos.rows || pos.cols === lasPos.cols);
	}

	// check to see if we select this cell before
	const checkSelectedList = (id) => {
		return ( selectedList.indexOf(id) !== -1 );
	}

	const checkAnswers = (id) => {
		if (answers.length) {
			for(let j=0 ; j < answers.length ; j++) {
				if ( answers[j].ids ) {
					for ( let i=0; i < answers[j].ids.length ;i++ ) {
						if ( answers[j].ids[i] === id ) {
							return true;
						}
					}
				}
			}
		}
	}

	return (
		<div className="game">
			<div className="table">
				{(props.data) ? props.data.map((item) => {
					if ( col === 5 ) {
						col = 0;row++;
					}
					let pos = {rows: row, cols: col, value:item.value};
					col++;
					return ((item.value) ? <div 
												key={item.id} 
												unselectable="on"
												className={ ( checkAnswers(item.id) ? " bingo " : "" ) + (checkSelectedList(item.id) ? " active " : "") + " cell disable-select"}
												onMouseOver={()=> {hoverOverCells(pos, item.id)}}
												onMouseDown={()=> {dragStart(pos, item.id)}}
												onMouseUp={() => {dragEnd(pos)}} >{item.value}</div> : null);
				}) : null}
			</div>
			<div className="answers">
				{answers.map((item,index) => {
					return <span key={index}>{item.value}</span>
				})}
			</div>
			<div className="actions">
				<span>{string}</span>
				<button className="help" onClick={() => {help()}}>راهنما</button>
				<button className="new" onClick={() => {props.newGame()}}>بازی جدید</button>
				<button className="back" onClick={() =>{props.setView(false)}}>بازگشت</button>
			</div>
		</div>
	);
}

export default Table;