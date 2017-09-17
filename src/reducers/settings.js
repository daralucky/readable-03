import {
    UPDATE_SETTINGS
} from '../actions'

const initialState = {
    orderPost: '-voteScore',
    redirectFromPost: false, // need to rename
    redirectFromAddNewPost: false
}

function settings(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SETTINGS:
            const { key, value } = action
            return {
                ...state,
                [key]: value
            }

        default:
            return state
    }
}

export default settings