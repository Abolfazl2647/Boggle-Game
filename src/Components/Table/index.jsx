import React, {useState, useEffect} from 'react';
import './Table.scss';

const Table = (props) => {

	let [lasPos, setLastPos] = useState({rows: null, cols: null, value:null});
	let [string, setString] = useState("");
	let row = 0, col = 0;

	const help = () => {
		console.log('Help');
		// show modal
		// sovle this before with backtrack
	}

	const dragStart = (pos) => {
		setString(string += pos.value);
		setLastPos(pos);
	}

	const dragEnd = (pos) => {
		setLastPos(pos);
		// check in DB
		setString("");
	}

	const hoverOverCells = (pos) => {
		if (directionsAllowed(pos)) {
			setString(string += pos.value);
			setLastPos(pos);
		}
	}

	const directionsAllowed = (pos) => {
		return (props.draging && (pos.rows === lasPos.rows || pos.cols === lasPos.cols));
	}

	// useEffect(() => {
	// 	// Update the document title using the browser API
	// 	console.log('String = ', string);
	// 	console.log('Draging = ', props.draging);
	// });

	return (
		<div className="game">
			<div className="table">
				{(props.data) ? props.data.map((text,index) => {
					if ( col === 5 ) {
						col = 0;
						row++;
					}
					let pos = {rows: row, cols: col, value:text};
					col++;
					return ((text) ? <div 
										key={index} 
										unselectable="on"
										className="cell disable-select"
										onMouseOver={()=> {hoverOverCells(pos)}}
										onMouseDown={()=> {dragStart(pos)}}
										onMouseUp={() => {dragEnd(pos)}} >{text}</div> : null);
				}) : null}
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