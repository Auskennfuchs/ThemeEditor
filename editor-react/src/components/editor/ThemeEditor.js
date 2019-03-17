import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import get from 'lodash/get'
import { connect } from 'react-redux'
import { setLink } from '../../reducers/ThemeLinkReducer'

const ColorList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
`

const ColorEntry = styled.li`
    display: flex;
    align-items: baseline;
    line-height: 1em;
    padding: 0.3em;
    ${p => p.active ? css`
        background-color: #eee;
        color: #000;
    `: ""}
`

const ColorCircle = styled.div`
    border-radius: 50%;
    width: 0.6em;
    height: 0.6em;
    margin-right: 0.3em;
`

class ThemeEditor extends Component {

    onSelectColor = (selColor) => {
        const { property } = this.props
        this.props.setLink(property, selColor)
    }

    render() {
        const { property, selectName, theme, palette } = this.props
        const col = theme.palette.find(color => color.name === get(theme.links, property))
        return (
            <div>
                {selectName &&
                    <React.Fragment>
                        {selectName}
                        <ColorList>
                            {palette.map((color, idx) => (
                                <ColorEntry key={color.name} active={col === color} onClick={() => this.onSelectColor(color.name)}>
                                    <ColorCircle style={{ backgroundColor: color.color }} />
                                    <div>
                                        {color.name}
                                    </div>
                                </ColorEntry>
                            ))}
                        </ColorList>
                    </React.Fragment>
                }
            </div>
        )
    }
}

const mapProps = ({ palette }) => ({
    palette
})

const mapDispatch = (dispatch) => ({
    setLink: (destination, selColor) => (dispatch(setLink(destination, selColor))),
})

export default connect(mapProps, mapDispatch)(ThemeEditor)