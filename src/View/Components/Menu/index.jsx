import React from 'react';
import './index.scss';
const Menu = (props) => {
    return (
        <div className="Dificaulty-Level">
            <h1>{props.Lang[props.language].game_name}</h1>
            <p>{props.Lang[props.language].difficaulty}</p>
            <ul>
                <li><button onClick={()=> {props.difficaulty("HEAVEN")}} className="menu-btn easy">{props.Lang[props.language].easy}</button></li>
                <li><button onClick={()=> {props.difficaulty("HEAVEN_TO_HELL")}} className="menu-btn medium">{props.Lang[props.language].medium}</button></li>
                <li><button onClick={()=> {props.difficaulty("HELL_TO_HELL")}} className="menu-btn hard">{props.Lang[props.language].hard}</button></li>
                <li><button onClick={()=> {props.setLang( (props.language === "En") ? "Fa" : "En" )}} className="menu-btn lang">{ props.Lang[props.language].set_lang +" : "+ props.Lang[props.language].language}</button></li>
            </ul>
        </div>
    );
}
export default Menu;
