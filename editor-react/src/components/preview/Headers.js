import styled from 'styled-components'

export const HeaderGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    align-items: stretch;
    grid-gap: 3em;
    grid-auto-rows: 1fr
`

export const HeaderText = styled.div`
    flex: 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2em;    
    text-align:center;
    min-height: 5em;
    border: 1px solid ${p => p.theme.ui.borderColor};
    border-radius: 3px;
    background-color: ${p => p.theme.ui.backgroundColor};
`

export const HeaderEntry = styled.div`
    padding: 2em;
    display: flex;
    flex-direction: column;
`