import { NEW_GAME, TOGGLE_MODAL, USER_FIND_SOMETHING, CLOCK_UPDATE, TOGGLE_WINING_STATUS } from '../actions/types';

const initialState = {
    clock: null,
    userAnswers:[],
    tableValues:[],
    availableAnswers:[],
    winingStatus: false,
    help_visibility:false,
}

const BoggleGame = (state = initialState , action ) => {

    if ( action.type === NEW_GAME ) {
        return {
            ...state,
            clock: null,
            userAnswers:[],
            winingStatus: false,
            help_visibility:false,
            tableValues: action.peyload.tableVlaues,
            availableAnswers: action.peyload.answers,
        };
    }

    if ( action.type === TOGGLE_MODAL ) {
        return {
            ...state,
            help_visibility: ( action.peyload !== null ? action.peyload  : !state.help_visibility) }
    }

    if ( action.type === CLOCK_UPDATE ) {
        return {
            ...state,
            clock: action.peyload
        }
    }

    if ( action.type === TOGGLE_WINING_STATUS ) {
        return {
            ...state,
            winingStatus: action.peyload
        }
    }

    if ( action.type === USER_FIND_SOMETHING ) {

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