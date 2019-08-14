import React, {Component} from 'react';
// import Trie from '../../Trie.js';
import './Game.scss';

export default class Game extends Component {
	// constructor(props){
	// 	super(props);
	// }

	state = {
		string:"",
		selectedCells:[]
	}

	handleMouseEnter(item) {
		if ( !this.props.draging ) return;
		let selected = [...this.state.selectedCells];
			selected.push(item.id);
		this.setState({selectedCells:selected});
	}

	render() {
		console.log(this.props)
		return (
			<div className="Game-Wrapper">
				<div className="Game">
					{this.props.tableValues.map((item) => {
						return <div 
									className={((this.state.selectedCells.indexOf(item.id) !== -1 ? "active" : "") + " cell" )}
									key={item.id}
									onClick={()=> {this.handleMouseEnter(item)}}
									onMouseEnter={()=> {this.handleMouseEnter(item)}}
									>{item.value}</div>
					})}
				</div>
			</div>
		);
	}
}