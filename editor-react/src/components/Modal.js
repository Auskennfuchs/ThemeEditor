import styled from 'styled-components'

const Modal = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    padding: 2em;
    background-color: ${p => p.theme.mainBackgroundColor};
    color: ${p => p.theme.text.color};
    max-width: 80%;
    max-height: 80%;
    box-shadow: 0 0 5px 0px rgba(0,0,0,0.2);
    overflow: auto;
`

export default Modal