import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import get from 'lodash/get'
import set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'
import IFrame from '../IFrame'
import editorTheme from '../../themes/editorTheme'
import GlobalStyles from '../../themes/GlobalStyles'
import Tabs from '../Tabs'
import Sidebar from '../Sidebar'
import Workspace from '../Workspace'
import { EditorContent } from './EditorFrame'
import PaletteEditor from './PaletteEditor'
import baseTheme from '../../themes/baseTheme'
import EditorProperties from './EditorProperties'
import ThemeEditor from './ThemeEditor'
import { mapObject } from '../../util/util'
import InfoEditor from './InfoEditor'
import LoadTheme from './LoadTheme'

class Editor extends Component {

    iFrameRef = React.createRef()

    state = {
        theme: { ...cloneDeep(baseTheme), ...this.props.editTheme },
        selectedProperty: null,
        activeTab: "info",
    }

    rightBar = [
        { id: "info", icon: "info-circle" },
        { id: "colors", icon: "palette" },
        { id: "edit", icon: "pen" },
        { id: "responsive", icon: "mobile-alt" },
    ]

    componentDidMount = () => {
        window.addEventListener("message", this.onMessage)
    }

    componentWillUnmount = () => {
        window.removeEventListener("message", this.onMessage)
    }

    componentDidUpdate = (prevProps) => {
        const { palette } = this.props
        if (prevProps.palette !== palette || prevProps.links !== this.props.links) {
            this.setState({
                theme: this.buildTheme(),
            }, this.updateTheme)
        }

        if (prevProps.editTheme !== this.props.editTheme) {
            this.setState({
                theme: this.props.editTheme ? {
                    ...cloneDeep(baseTheme),
                    ...this.props.editTheme.theme,
                } : null
            }, this.updateTheme)
        }
    }

    onLoadFrame = () => {
        this.setState({ theme: this.buildTheme() }, this.updateTheme)
    }

    onMessage = ({ data }) => {
        switch (data.type) {
            case "selectProperty":
                this.setState({
                    activeTab: "edit",
                    selectName: data.name,
                    selectedProperty: data.id
                })
                break
            case "selectColor":
                this.setState({
                    activeTab: "colors",
                    activeColor: data.idx
                })
                break
            default:
        }
    }

    onSelectColor = (color, e) => {
        const { rgb } = color
        const { theme } = this.state
        this.setState({
            theme: {
                ...theme,
                mainBackgroundColor: rgb.a === 1 ? color.hex : `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`,
            }
        }, this.updateTheme)
    }

    onChangeTab = (activeTab) => {
        this.setState({
            activeTab
        })
    }

    buildTheme = () => {
        const { theme } = this.state
        const { palette, links } = this.props
        const newTheme = {
            ...theme,
            palette,
            links,
        }
        this.resolveLinks(newTheme)
        return newTheme
    }

    findLinkByName = (palette, name) => palette ? palette.find(color => color.name === name) : undefined

    resolveLinks = (theme) => {
        if (theme.links) {
            mapObject(theme.links, (link, destination) => {
                const origValue = get(theme, destination)
                const replaceValue = this.findLinkByName(theme.palette, link)
                set(theme, destination, replaceValue ? replaceValue.color : undefined || origValue)
            })
        }
    }

    updateTheme = () => {
        const { theme } = this.state
        const { editTheme } = this.props
        if (this.iFrameRef.current) {
            this.iFrameRef.current.contentWindow.postMessage({
                type: "UPDATE_THEME",
                theme,
                name: editTheme.name,
            })
        }
    }

    render() {
        const { theme, selectedProperty, selectName, activeTab, activeColor } = this.state
        const { editTheme } = this.props
        return (
            <ThemeProvider theme={editorTheme}>
                <React.Fragment>
                    <GlobalStyles />
                    {editTheme &&
                        <Workspace>
                            <EditorContent>
                                <IFrame ref={this.iFrameRef} src="/preview" title="Preview" onLoad={this.onLoadFrame} />
                            </EditorContent>
                            <Sidebar position="right" pinned>
                                <Tabs position="left" tabs={this.rightBar} onChange={this.onChangeTab} active={activeTab}>
                                    <EditorProperties tabId="info">
                                        <InfoEditor editTheme={theme} />
                                    </EditorProperties>
                                    <EditorProperties tabId="colors">
                                        <PaletteEditor color={activeColor} />
                                    </EditorProperties>
                                    <EditorProperties tabId="edit">
                                        <ThemeEditor theme={theme} property={selectedProperty} selectName={selectName} />
                                    </EditorProperties>
                                </Tabs>
                            </Sidebar>
                        </Workspace>
                    }
                    {!editTheme &&
                        <LoadTheme />}
                </React.Fragment>
            </ThemeProvider >
        )
    }
}


const mapProps = ({ palette, links, theme }) => ({
    palette, links, editTheme: theme
})

export default connect(mapProps)(Editor)