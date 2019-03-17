import React from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import Header from '../Header';

export const PaletteGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: auto;
    grid-grap: 1em;
`

const EntryContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding-bottom: 2em;
`

const ColorFieldContainer = styled.div`
    padding-bottom: 0.5em;
`

const ColorField = styled.div`
    width: 7em;
    height: 7em;
    border-radius: 5px;
    cursor: pointer;
    border: ${p => p.backgroundColor === p.color || p.color==="transparent" ? "1px solid #000" : "0 none"};
`

const ColorTextLabel = styled.span`
    color: ${p => p.theme.text.colorLight};
    margin-right: 1em;
`

const ColorTextValue = styled.span`
    color: ${p => p.theme.text.color};    
    word-break: break-all;
`

const ColorEntry = ({ color, name, theme, ...rest }) => (
    <EntryContainer>
        <div>
            <Header>{name}</Header>
        </div>
        <ColorFieldContainer>
            <ColorField style={{ backgroundColor: color }} backgroundColor={get(theme, "mainBackgroundColor")} color={color} {...rest} />
        </ColorFieldContainer>
        <div>
            <ColorTextLabel>Color</ColorTextLabel>
            <ColorTextValue>{color}</ColorTextValue>
        </div>
    </EntryContainer>
)

export default ColorEntry