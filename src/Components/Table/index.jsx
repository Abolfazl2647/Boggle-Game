import React, {useState} from 'react';
import './Table.scss';

let posList = [];
const Table = (props) => {

	let [lasPos, setLastPos] = useState({rows: null, cols: null, value:null});
	let [string, setString] = useState("");
	let row = 0, col = 0;
	

	const help = () => {
		console.log('Help');
		// show modal
		// solve this before with backtrack
	}

	const dragStart = (pos,id) => {
		setString(string += pos.value);
		posList.push(id);
		setLastPos(pos);
	}

	const dragEnd = (pos) => {
		// check in DB
		setString("");
		// posList = [];
	}

	const hoverOverCells = (pos,id) => {
		if (directionsAllowed(pos)) {
			setString(string += pos.value);
			posList.push(id);
			setLastPos(pos);
		}
	}

	const directionsAllowed = (pos,id) => {
		return (props.draging && (pos.rows === lasPos.rows || pos.cols === lasPos.cols));
	}

	const checkSelectedList = (id) => {
		return ( posList.indexOf(id) !== -1 );
	}

	// useEffect(() => {
	// 	// Update the document title using the browser API
	// 	console.log('String = ', string);
	// 	console.log('Draging = ', props.draging);
	// });

	return (
		<div className="game">
			<div className="table">
				{(props.data) ? props.data.map((item,index) => {
					if ( col === 5 ) {
						col = 0;
						row++;
					}
					let pos = {rows: row, cols: col, value:item.value};
					col++;
					return ((item.value) ? <div 
										key={item.id} 
										unselectable="on"
										className={ (checkSelectedList(item.id) ? " active " : null) + " cell disable-select" }
										onMouseOver={()=> {hoverOverCells(pos,item.id)}}
										onMouseDown={()=> {dragStart(pos,item.id)}}
										onMouseUp={() => {dragEnd(pos)}} >{item.value}</div> : null);
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