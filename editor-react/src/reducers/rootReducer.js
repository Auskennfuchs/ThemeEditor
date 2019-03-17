import { combineReducers } from 'redux'
import PaletteReducer from './PaletteReducer'
import ThemeLinkReducer from './ThemeLinkReducer'
import ThemeReducer from './ThemeReducer'

const appReducers = combineReducers({
    palette: PaletteReducer,
    links: ThemeLinkReducer,
    theme: ThemeReducer
})

export default (state, action) => {
    return appReducers(state, action)
}