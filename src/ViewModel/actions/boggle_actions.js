import { NEW_GAME, TOGGLE_MODAL, CLOCK_UPDATE, TOGGLE_WINING_STATUS, TOUCH_START, TOUCH_END, SWIPE } from './types';

export default {
    new_game : (tableVlaues, answers) => (dispatch) => {
        dispatch({
            type: NEW_GAME,
            peyload: {
                tableVlaues, 
                answers
            }
        })
    },
    toggle_modal: (visibility) => (dispatch) => {
        dispatch({
            type: TOGGLE_MODAL,
            peyload: visibility
        })
    },
    updateClock: (clock) => (dispatch) => {
        dispatch({
            type: CLOCK_UPDATE,
            peyload: clock
        })
    },
    toggle_wining_status: (bool) => (dispatch) => {
        dispatch({
            type: TOGGLE_WINING_STATUS,
            peyload: bool
        })
    },
    start_touch: (string,selectedIds,selectedPath) => (dispatch) => {
        dispatch({
            type: TOUCH_START,
            peyload: {string,selectedIds,selectedPath}
        });
    },
    end_touch: (answerIds,userAnswers) => (dispatch) => {
        dispatch({
            type: TOUCH_END,
            peyload: {answerIds,userAnswers}
        });
    },
    swipe: (OBJ) => (dispatch) => {
        dispatch({
            type: SWIPE,
            peyload: OBJ
        })
    }
}