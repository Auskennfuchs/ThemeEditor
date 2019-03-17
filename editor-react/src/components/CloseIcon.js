import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CloseIconContainer = styled.button`
    position: absolute;
    right: 1em;
    top: 1em;
    cursor: pointer;
    background-color: transparent;
    border: 0 none;
    font-size: 18px;
`

const CloseIcon = (props) => (
    <CloseIconContainer {...props}>
        <FontAwesomeIcon icon="times" />
    </CloseIconContainer>
)

export default CloseIcon