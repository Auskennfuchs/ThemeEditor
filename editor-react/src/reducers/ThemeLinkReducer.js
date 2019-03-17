import mapValues from 'lodash/mapValues'
import baseTheme from "../themes/baseTheme"

const initialState = baseTheme.links

export const SET_LINK = "SET_LINK"
export const SET_LINKS = "SET_LINKS"
export const UPDATE_LINKS = "UPDATE_LINKS"

export const setLink = (destination, link) => ({
    type: SET_LINK,
    destination, link
})

export const setLinks = (links) => ({
    type: SET_LINKS,
    links
})

export const updateLinks = (oldName, name) => ({
    type: UPDATE_LINKS,
    oldName, name
})

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LINK:
            return {
                ...state,
                [action.destination]: action.link
            }
        case SET_LINKS:
            return action.links
        case UPDATE_LINKS:
            return mapValues(state, (val) => val === action.oldName ? action.name : val)
        default:
            return state
    }
}