import React from 'react'
import styled, { css } from 'styled-components'

export const PaletteContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: auto;
    grid-gap: 0.3em;
    width: 100%;
    padding: 0.3em;
    align-items: center;
`

export const AddButton = styled.button`
    position: relative;
    width: 100%;
    height: 100%;
    min-width: 2.6em;
    min-height: 2.6em;
    border: 1px solid #888;
    border-radius: 3px;
    font-size: inherit;
    background-color: transparent;
    color: #888;
`

const Background = styled.div`    
    background-color: #fff;
    position: relative;
    padding: 0.3em;
    display: inline-block;
    border-radius: 3px;
    width: 2em;
    height: 2em;
    box-sizing: content-box;

    ${p => p.active ? css`
        outline: 2px solid #c00;
    `: ""}

    &:after {
        content:'';
        position: absolute;
        left: 50%;
        width: 50%;
        top: 0;
        height: 100%;
        background-color: #000;
        z-index: 0;
    }
`

const Field = styled.div`
    width: 2em;
    height: 2em;
    z-index: 1;
    position: absolute;
    left:50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
`

const ColorFieldContainer = styled.div`
    text-align: center;
`

const ColorField = ({ color, active, ...rest }) => (
    <ColorFieldContainer>
        <Background {...rest} active={active}>
            <Field style={{ backgroundColor: color }} />
        </Background>
    </ColorFieldContainer>
)

export default ColorField