import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Container = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

const ContainerContent = styled.div`
    background-color: ${p => p.theme.uiActiveBackgroundColor};
    width: ${p => p.theme.sideBarWidth};
    min-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 1em 2em;
`

const TabHeader = styled.div`
    background-color: ${p => p.active ? p.theme.uiActiveBackgroundColor : p.theme.uiBackgroundColor};
    color: ${p => p.active ? "#fff" : "rgba(255,255,255,0.6)"};
    position: relative;
    margin-bottom: 1em;

    ${p => p.position === "left" ? css`
        padding: 0.5em 0.3em 0.5em 0.5em;
    `: css`
        padding: 0.5em 0.5em 0.5em 0.3em;
    `}


    z-index: ${p => p.active ? 1 : 0};
    cursor: pointer;

    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 0.6em;
        z-index: 1;
        right: -.5em;  
        width: 100%;
        margin-top: -0.4em;
        background-color: ${p => p.active ? p.theme.uiActiveBackgroundColor : p.theme.uiBackgroundColor};
        ${p => p.position === "left" ? css`
            transform: skewY(-10deg);
            border-radius: 5px 0 0 0;  
        `: css`
            transform: skewY(10deg);
            border-radius: 0 5px 0 0;  
        `}
    }

    &:after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 0.6em;
        z-index: 1;
        right: -.5em;  
        bottom: 0;
        width: 100%;
        margin-bottom: -0.4em;
        background-color: ${p => p.active ? p.theme.uiActiveBackgroundColor : p.theme.uiBackgroundColor};
        ${p => p.position === "left" ? css`
            transform: skewY(10deg);
            border-radius: 0 0 0 5px;  
        `: css`
            transform: skewY(-10deg);
            border-radius: 0 0 5px 0;  
        `}
    }
`

const TabHeaderContainer = styled.div`
    position: absolute;
    top: 3em;
    ${p => p.position === "left" ? css`
        left: 0;
        transform: translateX(-99%);
    `: css`
        right: 0;
        transform: translateX(99%);
    `}
    z-index: 1;
`

export default class Tabs extends PureComponent {

    static defaultProps = {
        tabs: [],
        position: "right",
        onChange: () => { }
    }

    static getDerivedStateFromProps(props, state) {
        if (state.active !== props.active) {
            return {
                active: props.active
            }
        }
        return null
    }

    state = {
        active: this.props.active || this.props.tabs[0].id
    }

    onChangeTab = (e, active) => {
        this.setState({ active })
        this.props.onChange(active)
    }

    render() {
        const { position, tabs, children } = this.props
        const { active } = this.state
        return (
            <Container >
                <ContainerContent>
                    {React.Children.map(children, (child, i) => {
                        if (child.props.tabId === active) {
                            return child
                        }
                    })}
                </ContainerContent>
                <TabHeaderContainer position={position}>
                    {tabs.map(({ id, icon }) => (
                        <TabHeader position={position} key={id} active={id === active} onClick={(e) => this.onChangeTab(e, id)}>
                            <FontAwesomeIcon icon={icon} />
                        </TabHeader>
                    ))}
                </TabHeaderContainer>
            </Container>
        )
    }
}
