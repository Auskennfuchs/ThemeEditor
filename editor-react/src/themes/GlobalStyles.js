import { createGlobalStyle, withTheme } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        width: 100%;
        min-height: 100vh;
        color: ${p => p.theme.text.color};
    }
`

export default withTheme(GlobalStyles)