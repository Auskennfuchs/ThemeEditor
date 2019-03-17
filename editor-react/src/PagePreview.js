import React, { Component } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import fastLoremIpsum from 'fast-lorem-ipsum'
import baseTheme from './themes/baseTheme'
import SectionHeader from './components/preview/SectionHeader'
import EditableColor from './components/preview/EditableColor'
import { HeaderGrid, HeaderText, HeaderEntry } from './components/preview/Headers'
import Header from './components/Header'
import GlobalStyles from './themes/GlobalStyles'
import Palette from './components/preview/Palette'
import { LightText, Text } from './components/Text'

const Container = styled.div`
    background-color: ${p => p.theme.mainBackgroundColor};
    flex: 1 auto;
    padding: 2em;
`

const PropertyGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(6,1fr);
    grid-gap: 1em;
`

export default class PagePreview extends Component {

    state = {
        theme: baseTheme,
    }

    componentDidMount = () => {
        window.addEventListener("message", this.onHandleMessage)
    }

    componentWillUnmount = () => {
        window.removeEventListener("message", this.onHandleMessage)
    }

    onHandleMessage = (msg) => {
        const { data } = msg
        if (data.type === "UPDATE_THEME") {
            const { theme, name } = data
            this.setState({ theme, name })
        }
    }

    onClickProperty = (name, id) => {
        window.parent.postMessage({
            type: "selectProperty",
            id, name
        })
    }

    onClickPalette = (idx) => {
        window.parent.postMessage({
            type: "selectColor",
            idx
        })
    }

    render() {
        const { theme,name } = this.state
        const { palette } = theme
        const headerSizes = ["huge", "large", "medium", "small", "tiny"]
        return (
            <ThemeProvider theme={theme}>
                <Container>
                    <GlobalStyles />
                    <Palette palette={palette} theme={theme} onClickPalette={this.onClickPalette} />
                    <SectionHeader size>Theme {name} Globals</SectionHeader>
                    <PropertyGrid>
                        <EditableColor color="mainBackgroundColor" name="Main Background Color" theme={theme} onClickProperty={this.onClickProperty} >
                            {theme.mainBackgroundColor}
                        </EditableColor>
                        <EditableColor color="colors.accentColor" name="Theme Main Accent Color" theme={theme} onClickProperty={this.onClickProperty} >
                            {theme.colors.accentColor}
                        </EditableColor>
                    </PropertyGrid>
                    <SectionHeader size>Typography</SectionHeader>
                    <PropertyGrid>
                        <EditableColor color="headers.color" name="Headertext Color" theme={theme} onClickProperty={this.onClickProperty} >
                            {theme.headers.color}
                        </EditableColor>
                        <EditableColor color="text.color" name="Text Color" theme={theme} onClickProperty={this.onClickProperty} >
                            {theme.text.color}
                        </EditableColor>
                        <EditableColor color="text.colorLight" name="Text Light Color" theme={theme} onClickProperty={this.onClickProperty} >
                            {theme.text.colorLight}
                        </EditableColor>
                    </PropertyGrid>
                    <HeaderGrid>
                        {headerSizes.map((size) => (
                            <HeaderEntry key={size}>
                                <HeaderText>
                                    <Header size={size}>Abcdefgh</Header>
                                </HeaderText>
                                <div>
                                    <Header>Header {size}</Header>
                                    <div>
                                        <LightText>Font-Size</LightText> {theme.headers[size].fontSize}
                                    </div>
                                    <div>
                                        <LightText>Line-Height</LightText> {theme.headers[size].lineHeight}
                                    </div>
                                </div>
                            </HeaderEntry>
                        ))}
                    </HeaderGrid>
                    <div>
                        <Text>
                            {fastLoremIpsum(200, "w")}
                        </Text>
                    </div>
                    <div>
                        <LightText>
                            {fastLoremIpsum(200, "w")}
                        </LightText>
                    </div>
                    <SectionHeader size>UI Elements</SectionHeader>
                    <PropertyGrid>
                        <EditableColor color="ui.backgroundColor" name="Background Color" theme={theme} onClickProperty={this.onClickProperty} >
                            {theme.ui.backgroundColor}
                        </EditableColor>
                        <EditableColor color="ui.borderColor" name="Border Color" theme={theme} onClickProperty={this.onClickProperty} >
                            {theme.ui.borderColor}
                        </EditableColor>
                    </PropertyGrid>
                </Container>
            </ThemeProvider>
        )
    }
}