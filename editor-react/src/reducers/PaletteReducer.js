const initialState = []

export const ADD_COLOR = "ADD_COLOR"
export const DEL_COLOR = "DEL_COLOR"
export const SET_COLOR = "SET_COLOR"
export const SET_COLORS = "SET_COLORS"
export const UPDATE_NAME = "UPDATE_NAME"

export const addColor = (name, color) => ({
    type: ADD_COLOR,
    name, color,
})

export const deleteColor = (name) => ({
    type: DEL_COLOR,
    name
})

export const setColors = (colors = []) => ({
    type: SET_COLORS,
    colors,
})

export const setColor = (name, color) => ({
    type: SET_COLOR,
    name, color,
})

export const updateName = (oldName, name) => ({
    type: UPDATE_NAME,
    oldName, name
})

const findColorIndex = (name, colors) => colors.findIndex(color => color.name === name)

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_COLOR: {
            const newState = [...state]
            newState.push({
                name: action.name,
                color: action.color
            })
            return newState
        }
        case SET_COLOR: {
            const colorIdx = findColorIndex(action.name, state)
            const newState = [...state]
            newState[colorIdx] = { name: action.name, color: action.color }
            return newState
        }
        case DEL_COLOR: {
            const colorIdx = findColorIndex(action.name, state)
            return state.slice(0, colorIdx).concat(state.slice(colorIdx + 1, state.length - 1))
        }
        case SET_COLORS:
            return action.colors
        case UPDATE_NAME: {
            const colorIdx = findColorIndex(action.oldName, state)
            const newState = [...state]
            newState[colorIdx] = {
                name: action.name,
                color: state[colorIdx].color,
            }
            return newState
        }
        default:
            return state
    }
}