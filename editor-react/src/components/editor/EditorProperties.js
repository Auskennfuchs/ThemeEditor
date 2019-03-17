import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 100%;
    height: 100%;
    color: ${p => p.theme.uiTextColor};
`

const EditorProperties = ({ children }) => {
    return (
        <Container>
            {children}
        </Container>
    )
}

export default EditorProperties