import { NEW_GAME, TOGGLE_MODAL, USER_FIND_SOMETHING, CLOCK_UPDATE, TOGGLE_WINING_STATUS, TOUCH_START, TOUCH_END, SWIPE, DRAG } from '../actions/types';

const initialState = {
    clock: null,
    answerIds:[],
    userAnswers:[],
    tableValues:[],
    selectedPath:[],
    selectedIds:[],
    Answers:[],
    draging: false,
    gameResult: "",
    winingStatus: false,
    help_visibility:false,
}

const BoggleGame = (state = initialState , action ) => {

    if (action.type === DRAG) {
        return {
            ...state,
            draging: action.peyload
        }
    }

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
		return {
            ...state,
            string: action.peyload.string, 
            selectedIds: action.peyload.selectedIds,
            selectedPath: action.peyload.selectedPath
        }
    }


    if (action.type === SWIPE) {
        return {
             ...state,
             string: action.peyload.string, 
             selectedIds: action.peyload.selectedIds,
             selectedPath: action.peyload.selectedPath
        }
     }

    if (action.type === TOUCH_END) {
       return { 
           ...state,
           answerIds: action.peyload,
           selectedIds:[],
           string:""
        }
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
        return {
            ...state,
            userAnswers: action.peyload
        }
    }

    return state;
}

export default BoggleGame;