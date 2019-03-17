const initialState = null

export const SET_THEME = "SET_THEME"

export const setTheme = (theme) => {
    console.log(theme)
    return {
        type: SET_THEME,
        theme
    }
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_THEME:
            console.log(action.theme)
            return action.theme
        default:
            return state
    }

}