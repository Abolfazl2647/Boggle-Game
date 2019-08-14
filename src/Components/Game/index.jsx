import React, {Component} from 'react';
// import Trie from '../../Trie.js';
import './Game.scss';

export default class Game extends Component {
	// constructor(props){
	// 	super(props);
	// }
	render() {
		console.log(this.props)
		return (
			<div className="Game-Wrapper">
				<div className="Game">
					{this.props.tableValues.map((item) => {
						return <div className="cell" key={item.id}>{item.value}</div>
					})}
				</div>
			</div>
		);
	}
}