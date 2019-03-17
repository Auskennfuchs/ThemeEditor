import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import Header from '../Header';

const EditableColorCircle = styled.div`
    display: inline-block;
    border-radius: 50%;
    width: 1em;
    height: 1em;
    margin-right: 0.5em;
    border: ${p => p.baseTheme.mainBackgroundColor === p.color ? " 1px solid #000" : "0 none"};
`

const Container = styled.div`
    display: inline-flex;
    align-items: baseline;
    cursor: pointer;
`

const EditableColor = ({ color, name, theme, onClickProperty, children, ...rest }) => (
    <div>
        <Header>{name}</Header>
        <Container {...rest} onClick={() => onClickProperty(name, color)}>
            <EditableColorCircle style={{ backgroundColor: get(theme, color) }} color={get(theme, color)} baseTheme={theme} />
            <div>
                {children}
            </div>
        </Container>
    </div>
)

export default EditableColor