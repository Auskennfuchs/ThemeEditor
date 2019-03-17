import React from 'react'
import styled, { css } from 'styled-components'

const headerSetup = (headerDef, theme) => css`
    font-size: ${headerDef.fontSize};
    line-height: ${headerDef.lineHeight};
    color: ${theme.headers.color};
`

const HeaderH1 = styled.h1`
    ${p => headerSetup(p.theme.headers.huge, p.theme)}
`

const HeaderH2 = styled.h2`
    ${p => headerSetup(p.theme.headers.large, p.theme)}
`

const HeaderH3 = styled.h3`
    ${p => headerSetup(p.theme.headers.medium, p.theme)}
`

const HeaderH4 = styled.h4`
    ${p => headerSetup(p.theme.headers.small, p.theme)}
`

const HeaderH5 = styled.h5`
    ${p => headerSetup(p.theme.headers.tiny, p.theme)}
`

const Header = ({ size, children, ...rest }) => {
    let Elem
    switch (size) {
        case "huge":
            Elem = HeaderH1
            break
        case "large":
            Elem = HeaderH2
            break
        case "small":
            Elem = HeaderH4
            break
        case "tiny":
            Elem = HeaderH5
            break
        case "medium":
        default:
            Elem = HeaderH3
            break
    }
    return (
        <Elem {...rest}>
            {children}
        </Elem>
    )
}

export default Header