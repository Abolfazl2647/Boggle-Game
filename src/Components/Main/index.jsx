import React from 'react';
import './Main.scss';

const Main = (props) => {
    
    return (
        <div className="menu">
            <ul>
                <li><button onClick={()=> {props.newGame()}}> شروع </button></li>
                <li>
                    <select name="" id="">
                        <option value="-1">سختی بازی</option>
                        <option value="1">آسان</option>
                        <option value="2">معمولی</option>
                        <option value="3">سخت</option>
                    </select>
                </li>
                <li><button>خروج</button></li>
            </ul>
        </div>
    );
}
 
export default Main;