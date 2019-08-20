import { NEW_GAME, TOGGLE_MODAL, USER_FIND_SOMETHING, CLOCK_UPDATE, TOGGLE_WINING_STATUS, TOUCH_START, TOUCH_END, SWIPE, DRAG } from './types';

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
    user_find_something: (obj) => (dispatch) => {
        dispatch({
            type: USER_FIND_SOMETHING,
            peyload: obj
        });
    },
    toggle_draging: (bool) => (dispatch) => {
        dispatch({
            type: DRAG,
            peyload: bool
        });
    },
    start_touch: (string,selectedIds,selectedPath) => (dispatch) => {
        dispatch({
            type: TOUCH_START,
            peyload: {string,selectedIds,selectedPath}
        });
    },
    end_touch: (obj) => (dispatch) => {
        dispatch({
            type: TOUCH_END,
            peyload: obj
        });
    },
    swipe: (OBJ) => (dispatch) => {
        dispatch({
            type: SWIPE,
            peyload: OBJ
        })
    }
}