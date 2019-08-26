import { NEW_GAME, TOGGLE_MODAL, CLOCK_UPDATE, TOGGLE_WINING_STATUS, TOUCH_START, TOUCH_END, SWIPE, VIEW_CHANGE, LANG_CHANGE } from './types';

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
    start_touch: (string) => (dispatch) => {
        dispatch({
            type: TOUCH_START,
            peyload: {string}
        });
    },
    end_touch: (answerIds,userAnswers) => (dispatch) => {
        dispatch({
            type: TOUCH_END,
            peyload: {answerIds,userAnswers}
        });
    },
    set_view: (view) => (dispatch) => {
        dispatch({
            type: VIEW_CHANGE,
            peyload: view
        });
    },
    set_lang: (lang) => (dispatch) => {
        dispatch({
            type: LANG_CHANGE,
            peyload: lang
        })
    },
    swipe: (OBJ) => (dispatch) => {
        dispatch({
            type: SWIPE,
            peyload: OBJ
        })
    }
}