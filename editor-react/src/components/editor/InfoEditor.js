import React, { Component } from 'react'
import html2canvas from 'html2canvas'
import { connect } from 'react-redux'
import ThemeApi from '../../apis/ThemeApi'
import { setTheme } from '../../reducers/ThemeReducer'
import Thumbnail from '../preview/Thumbnail'
import LoadTheme from './LoadTheme'
import { setLinks } from '../../reducers/ThemeLinkReducer';
import { setColors } from '../../reducers/PaletteReducer';

class InfoEditor extends Component {

    state = {
        themeName: this.props.theme ? this.props.theme.name : "",
        canvas: "",
        loadTheme: false,
    }

    paletteRef = React.createRef()

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.theme !== this.props.theme) {
            this.setState({
                themeName: this.props.theme.name
            })
        }
    }

    onSave = async () => {
        const { palette, links, theme, editTheme } = this.props
        const { themeName } = this.state
        const canvas = await this.captureThumbnail()

        const { palette: p, links: l, ...themeVars } = editTheme

        const newTheme = await ThemeApi.saveTheme(theme._id, {
            __v: theme.__v,
            name: themeName,
            palette, links, theme: themeVars,
            thumbnail: canvas.toDataURL(),
        })
        const { thumbnail, ...rest } = newTheme
        this.props.setTheme(rest)
    }

    onChangeName = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    captureThumbnail = async () => {
        return await html2canvas(this.paletteRef.current, {
            windowWidth: 300, windowHeight: 300, scale: 1
        })
    }

    onLoadTheme = () => {
        this.setState({ loadTheme: true })
    }

    onCloseLoadTheme = () => {
        this.setState({ loadTheme: false })
    }

    onDeleteTheme = async () => {
        const { theme } = this.props
        await ThemeApi.deleteTheme(theme._id)
        this.props.setTheme(null)
    }

    render() {
        const { themeName, canvas, loadTheme } = this.state
        const { editTheme } = this.props
        return (
            <div>
                <input id="themeName" name="themeName" type="text" value={themeName} onChange={this.onChangeName} />
                <button type="button" onClick={this.onSave}>Save</button>
                <button type="button" onClick={this.onLoadTheme}>Load</button>
                <button type="button" onClick={this.onDeleteTheme}>Delete</button>
                <div style={{ position: "fixed", left: "100%", top: "100%" }}>
                    <Thumbnail name={themeName} theme={editTheme} ref={this.paletteRef} />
                </div>
                {canvas &&
                    <img src={canvas} alt="thumbnail" />}
                {loadTheme &&
                    <LoadTheme onClose={this.onCloseLoadTheme} />
                }
            </div>
        )
    }
}

const mapProps = ({ palette, links, theme }) => ({
    palette, links, theme: theme
})

const mapDispatch = (dispatch) => ({
    setTheme: (theme) => {
        console.log(theme)
        dispatch(setTheme(theme))
        dispatch(setLinks(theme ? theme.links || {} : null))
        dispatch(setColors(theme ? theme.palette || [] : null))
    }
})

export default connect(mapProps, mapDispatch)(InfoEditor)