import { NEW_GAME, TOGGLE_MODAL, CLOCK_UPDATE, TOGGLE_WINING_STATUS, TOUCH_START, TOUCH_END, SWIPE, VIEW_CHANGE, LANG_CHANGE } from '../actions/types';

const initialState = {
    clock: null,
    answerIds:[],
    userAnswers:[],
    tableValues:[],
    Answers:[],
    string: "",
    gameResult: "",
    winingStatus: 0,
    view: false,
    language: "Fa",
    help_visibility:false,
}

const BoggleGame = (state = initialState , action ) => {

    if (action.type === NEW_GAME) {
        return {
            ...state,
            view: true,
            string: "",
            answerIds:[],
            userAnswers:[],
            gameResult: "",
            winingStatus: 0,
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
        }
    }

    if (action.type === TOUCH_END) {
        if ( action.peyload.userAnswers.length === state.Answers.length) {
            return {
                ...state,
                clock:"0:00",
                winingStatus: 1,
                answerIds: action.peyload.answerIds,
                userAnswers: action.peyload.userAnswers
            }
		} else {
            return {
                ...state,
                string:"",
                answerIds: action.peyload.answerIds,
                userAnswers: action.peyload.userAnswers
            }
        }
    }

    if (action.type === SWIPE) {
        return {
             ...state,
             string: action.peyload.string,
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

    if (action.type === VIEW_CHANGE) {
        return {
            ...state,
            view: action.peyload
        }
    }

    if ( action.type === LANG_CHANGE ) {
        return {
            ...state,
            language: action.peyload
        }
    }
    return state;
}

export default BoggleGame;