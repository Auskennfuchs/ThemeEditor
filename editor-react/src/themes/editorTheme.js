import baseTheme from "./baseTheme"
import cloneDeep from 'lodash/cloneDeep'

export default {
    ...cloneDeep(baseTheme),
    fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif`,
    fontSize: "18px",
    uiBackgroundColor: "#2D3542",
    uiActiveBackgroundColor: "#3C4C5B",
    uiTextColor: "rgba(255,255,255,0.6)",
    uiActiveFontColor: "#fff",
    editorContentBackgroundColor: "#333D49",
    sideBarWidth: "350px",
}