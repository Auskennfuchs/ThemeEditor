import React from 'react'
import styled from 'styled-components'
import Header from '../Header'

const Container = styled.div`
    padding-bottom: 4px;
    margin-bottom: 1.5em;
    position: relative;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 4px;
        width: 2.5em;
        background-color: ${p => p.theme.colors.accentColor};
    }
`

const SectionHeader = ({ children }) => (
    <Container>
        <Header size="huge">
            {children}
        </Header>
    </Container>
)

export default SectionHeader