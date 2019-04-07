import React, { Component } from 'react'
import { connect } from 'react-redux'
import { SketchPicker } from 'react-color'
import ReactCSS from 'reactcss'
import ColorField, { PaletteContainer, AddButton } from './ColorField'
import { addColor, setColor, deleteColor, updateName } from '../../reducers/PaletteReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import colors from '../../colors'
import { updateLinks } from '../../reducers/ThemeLinkReducer';

class PaletteEditor extends Component {

    state = {
        selectedColor: null,
        colorName: "",
        propsActiveColor: this.props.activeColor,
    }

    static sketchstyles = ReactCSS({
        'default': {
            picker: {
                width: "100%",
                padding: '10px 10px 0',
                boxSizing: 'border-box',
                background: '#fff',
                borderRadius: '4px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.15), 0 8px 16px rgba(0,0,0,.15)',
            },
        }
    })

    static getDerivedStateFromProps(props, state) {
        if (props.color !== state.propsActiveColor) {
            const { palette } = props
            const color = palette[props.color]
            if(color) {
            return {
                selectedColor: color.name,
                colorName: color.name,
                propsActiveColor: props.color,
            }
        }
        }
        return null
    }

    randomColor = (obj) => {
        const keys = Object.keys(obj)
        const key = keys[keys.length * Math.random() << 0]
        return {
            name: key,
            color: obj[key]
        }
    }

    containsColor = (name) => {
        const { palette } = this.props
        return Object.keys(palette).includes(name)
    }

    onAddNewColor = async () => {
        const rndColor = this.randomColor(colors)
        await this.props.addColor(rndColor.name, rndColor.color)
        this.setState({ selectedColor: rndColor.name, colorName: rndColor.name })
    }

    onClickColor = (selectedColor) => {
        this.setState({ selectedColor, colorName: selectedColor })
    }

    onChangeColor = (color) => {
        const { selectedColor } = this.state
        const { rgb } = color
        this.props.setColor(selectedColor, rgb.a === 1 || color.hex==="transparent" ? color.hex : `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`)
    }

    onDeleteColor = () => {
        const { selectedColor } = this.state
        this.props.delColor(selectedColor)
        this.setState({ selectedColor: null })
    }

    onChangeName = async (e) => {
        this.setState({ colorName: e.target.value })
    }

    onUpdateName = async (e) => {
        e.preventDefault()
        const { colorName, selectedColor } = this.state
        await this.props.updateName(selectedColor, colorName)
        this.setState({ selectedColor: colorName })
    }

    findColor = (name) => {
        const { palette } = this.props
        return palette.find(color => color.name === name)
    }

    render() {
        const { palette } = this.props
        const { selectedColor, colorName } = this.state
        const selColor = this.findColor(selectedColor) || {}
        return (
            <React.Fragment>
                <PaletteContainer>
                    {palette.map(({ color, name }) => (
                        <ColorField key={name} color={color} onClick={() => this.onClickColor(name)} active={name === selectedColor} />
                    ))}
                    <AddButton type="button" onClick={this.onAddNewColor}>+</AddButton>
                </PaletteContainer>
                {selectedColor !== null &&
                    <React.Fragment>
                        <form onSubmit={this.onUpdateName}>
                            <input id="colorName" name="colorName" value={colorName} onChange={this.onChangeName} onBlur={this.onUpdateName} />
                        </form>
                        <SketchPicker onChangeComplete={this.onChangeColor} presetColors={[]} color={selColor.color} styles={PaletteEditor.sketchstyles} />
                        <AddButton type="button" onClick={this.onDeleteColor}><FontAwesomeIcon icon="trash-alt" /></AddButton>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

const mapProps = ({ palette }) => ({
    palette
})

const mapDispatch = (dispatch) => ({
    addColor: (name, color) => dispatch(addColor(name, color)),
    setColor: (name, color) => dispatch(setColor(name, color)),
    delColor: (name) => dispatch(deleteColor(name)),
    updateName: (oldName, name) => {
        dispatch(updateName(oldName, name))
        dispatch(updateLinks(oldName, name))
    }
})

export default connect(mapProps, mapDispatch)(PaletteEditor)