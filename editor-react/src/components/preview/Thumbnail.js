import React from 'react'
import styled from 'styled-components'
import Header from '../Header'

const Container = styled.div`
    width: 300px;
    height: 300px;
    background-color: ${p => p.theme.mainBackgroundColor};
    position: relative;
`

const PaletteContainer = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    display: grid;
    grid-template-columns: repeat(4,1fr);
    grid-template-rows: auto;
    align-items: stretch;
    justify-content: stretch;
    width: 50%;
    height: 50%;
`

const Thumbnail = ({ name, theme, innerRef }) => (
    <Container ref={innerRef}>
        <Header>{name}</Header>
        <PaletteContainer>
            {theme && theme.palette && theme.palette.map(color => (
                <div key={color.name} style={{ backgroundColor: color.color }} />
            ))}
        </PaletteContainer>
    </Container>
)

export default React.forwardRef((props, ref) => <Thumbnail {...props} innerRef={ref} />)