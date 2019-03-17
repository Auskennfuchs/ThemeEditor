import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Modal from '../Modal';
import ThemeApi from '../../apis/ThemeApi'
import { setTheme } from '../../reducers/ThemeReducer'
import { setLinks } from '../../reducers/ThemeLinkReducer'
import { setColors } from '../../reducers/PaletteReducer'
import Header from '../Header'
import CloseIcon from '../CloseIcon';

const ThumbnailGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    align-items: stretch;
    justify-content: stretch;
    grid-gap: 1em;
    grid-auto-rows: 1fr;
`

const ThemeElem = styled.div`
    border: 1px solid ${p => p.theme.ui.borderColor};
    cursor: pointer;
`

class LoadTheme extends Component {

    static defaultProps = {
        onClose: () => { }
    }

    state = {
        themes: [],
    }

    componentDidMount = () => {
        this.loadThemes()
    }

    loadThemes = async () => {
        const themes = await ThemeApi.getAllThemes()
        this.setState({ themes })
    }

    onLoadTheme = async (id) => {
        const theme = await ThemeApi.getTheme(id)
        this.setThemeAndClose(theme)
    }

    onNewTheme = async (name) => {
        const newTheme = await ThemeApi.newTheme({
            name
        })
        this.setThemeAndClose(newTheme)
    }

    setThemeAndClose = (theme) => {
        const { thumbnail, ...rest } = theme
        this.props.setTheme(rest)
        this.props.onClose()
    }

    render() {
        const { themes } = this.state
        return (
            <Modal>
                <CloseIcon onClick={this.props.onClose} />
                <Header size="large">Load Theme</Header>
                <ThumbnailGrid>
                    <button type="button" onClick={() => this.onNewTheme("newTheme")}>New</button>
                    {themes.map(({ id, name, thumbnail }) => (
                        <ThemeElem key={id} onClick={() => this.onLoadTheme(id)}>
                            <img src={thumbnail} alt={name} />
                        </ThemeElem>
                    ))}
                </ThumbnailGrid>
            </Modal >
        )
    }
}

const mapDispatch = (dispatch) => ({
    setTheme: (theme) => {
        dispatch(setTheme(theme))
        dispatch(setColors(theme.palette || []))
        dispatch(setLinks(theme.links || {}))
    },
})

export default connect(null, mapDispatch)(LoadTheme)