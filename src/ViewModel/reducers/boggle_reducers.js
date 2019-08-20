import { NEW_GAME, TOGGLE_MODAL, USER_FIND_SOMETHING, CLOCK_UPDATE, TOGGLE_WINING_STATUS, TOUCH_START, TOUCH_END, SWIPE } from '../actions/types';
import Trie from '../../Controller/Trie.js';
const initialState = {
    clock: null,
    answerIds:[],
    userAnswers:[],
    tableValues:[],
    selectedPath:[],
    selectedIds:[],
    Answers:[],
    gameResult: "",
    winingStatus: false,
    help_visibility:false,
}

const BoggleGame = (state = initialState , action ) => {

    if (action.type === NEW_GAME) {
        return {
            ...state,
            clock: null,
            userAnswers:[],
            winingStatus: false,
            help_visibility:false,
            Answers: action.peyload.answers,
            tableValues: action.peyload.tableVlaues,
        };
    }

    if (action.type === TOUCH_START) {
        // set start position , string and id
		// add string
		let selectedPath = [...state.selectedPath];
		let selectedIds = [...state.selectedIds];
		let string = state.string;
			string += action.peyload.item.value;
			selectedIds.push(action.peyload.item.id);
			selectedPath.push(action.peyload.pos);
		return {
            ...state,
            string, 
            selectedIds,
            selectedPath
        }
    }

    if (action.type === TOUCH_END) {
        let answerIds = [...state.answerIds];
		if ( Trie.contains(state.string) ) {
			answerIds = answerIds.concat(this.props.selectedIds);
			this.props.userAnswers({
				string: this.props.string,
				cells: this.props.selectedIds
			});
        }
        return { ...state,answerIds, selectedIds:[], string:""}
    }

    if (action.type === SWIPE) {
        let selectedPath = [...state.selectedPath];
        let selectedIds = [...state.selectedIds];
        let string = state.string;
        if ( !this.isBackward(action.peyload.pos)) {
            string += action.peyload.item.value;
            selectedIds.push(action.peyload.item.id);
            selectedPath.push(action.peyload.pos);
        } else {
            selectedIds.pop();
            selectedPath.pop();
            string = string.slice(0, string.length-1);
        }
       return {...state, string, selectedIds, selectedPath}
    }

    if (action.type === TOGGLE_MODAL) {
        return {
            ...state,
            help_visibility: ( action.peyload !== null ? action.peyload  : !state.help_visibility) }
    }

    if (action.type === CLOCK_UPDATE) {
        return {
            ...state,
            clock: action.peyload
        }
    }

    if (action.type === TOGGLE_WINING_STATUS) {
        return {
            ...state,
            winingStatus: action.peyload
        }
    }

    if (action.type === USER_FIND_SOMETHING) {

        let userAnswers = [...state.userAnswers];
        let index = -1;
        for (let i=0; i < userAnswers.length ; i++) {
            if ( userAnswers[i].string === action.peyload.string ) {
                index = i;
            }
        }
        if ( index === -1 ) { userAnswers.push(action.peyload); }
        return {
            ...state,
            userAnswers
        }
    }

    return state;
}

export default BoggleGame;