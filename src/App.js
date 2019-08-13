import React , { useState } from 'react';
import Table from './Components/Table';
import Main from './Components/Main';
import Helper from './helper.js';


import './App.scss';

// TODO: remove Duplication 


const App = () => {

	const [Table_Cells, setTable_Cells] = useState(Helper.generate_random_aplphabet());
	const [draging, setDraging] = useState(false);
	const [View, setView] = useState(false);
	// Declare a new state variable, which we'll call "count"

	const playGame = () => {
		setView(true);
		newGame();
	}

	

	const newGame = () => {
		let kir = Helper.generate_random_aplphabet();
		setTable_Cells(kir);
		console.log(Helper.find_answer(kir))
	}

	const mouseDown = () => { setDraging(true);}
	const mouseUp = () => { setDraging(false);}

	return (
		<div className="App" onMouseDown={()=> {mouseDown(true)}} onMouseUp={() => {mouseUp(false)}}>
			<div className={ (View ? 'play' : null ) + " app-wrapper"}>
				<section className="main-view">
					<Main newGame={playGame} />
				</section>
				<section className="game-view">
					<Table 
						draging={draging}
						data={Table_Cells} 
						setView={setView}
						newGame={newGame} />
				</section>
			</div>
		</div>
	);
}



export default App;
