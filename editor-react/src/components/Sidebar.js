import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const SidebarContainer = styled.div`
    ${p => !p.pinned ? css`
        position: absolute;
        z-index: 10;
        height: 100%;
        ${p.position === "right" ? css`
            right: 0;
            transform: translateX(100%) translateX(-5px);            
        `: css`
            left: 0;
            transform: translateX(-100%) translateX(5px);
        `}
    `: ``}

    ${p => p.visible ? css`
        transform: none;
    `: ""}    
    transition: all 0.2s;
`

export default class Sidebar extends Component {

    state = {
        pinned: this.props.pinned,
        visible: this.props.pinned || false,
    }

    timerFunction = undefined

    onMouseEnter = (e) => {
        if (this.timerFunction) {
            clearTimeout(this.timerFunction)
        }
        this.setState({ visible: true })
    }

    onMouseLeave = (e) => {
        this.timerFunction = setTimeout(() => {
            this.setState({ visible: this.state.pinned || false })
        }, 500)
    }

    render() {
        const { children, position } = this.props
        const { visible, pinned } = this.state
        return (
            <SidebarContainer visible={visible} pinned={pinned} position={position}
                onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                {children}
            </SidebarContainer>
        )
    }
}