import { NEW_GAME, TOGGLE_MODAL, USER_FIND_SOMETHING, CLOCK_UPDATE, TOGGLE_WINING_STATUS } from './types';


export const new_game = (obj) => (dispatch) => {
    dispatch({
        type: NEW_GAME,
        peyload: obj
    })
}

export const toggle_modal = (visibility) => (dispatch) => {
    dispatch({
        type: TOGGLE_MODAL,
        peyload: visibility
    })
}

export const updateClock = (clock) => (dispatch) => {
    console.log(clock)
    dispatch({
        type: CLOCK_UPDATE,
        peyload: clock
    })
}

export const toggle_wining_status = (bool) => (dispatch) => {
    dispatch({
        type: TOGGLE_WINING_STATUS,
        peyload: bool
    })
}

export const user_find_something = (obj) => (dispatch) => {
    dispatch({
        type: USER_FIND_SOMETHING,
        peyload: obj
    });
}