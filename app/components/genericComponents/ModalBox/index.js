import React, { PropTypes } from 'react'
import styled, { css, injectGlobal } from 'styled-components'
import ReactModal from 'react-modal'

import  Heading from '../Heading'

injectGlobal`
  body.ReactModal__Body--open {
    overflow: hidden;
  }
`

const overlayStyles = css`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 9999;
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[class*="after-open"] {
    opacity: 1;
  }
  &[class*="before-close"] {
    opacity: 0;
  }
`

const ModalBox = styled(ReactModal)`
  position: absolute;
  display: flex;
  flex-direction: column;
  font-family: arial;
  font-size: 1rem;
  background-color: white;
  border-radius: 10px;
  color: black;
  top: calc(50% - 1rem);
  left: calc(50% - 1rem);
  right: auto;
  bottom: auto;
  margin: 1rem calc(-50% + 1rem) 1rem 1rem;
  transform: translate(-50%, 100%);
  transition: transform 250ms ease-in-out;
  outline: none;
  box-sizing: border-box;
  min-width: 320px;
  padding-top: ${({ hasHeader }) => hasHeader ? 0 : '1rem'};
  @media screen and (max-width: 640px) {
    width: calc(100% - 1rem);
    min-width: 0;
  }
  &[class*="after-open"] {
    transform: translate(-50%, -50%);
  }
  &[class*="before-close"] {
    transform: translate(-50%, 100%);
  }
`

const Header = styled.header`
  display: flex;
  align-items: center;
  padding: 1rem;
  > *:first-child {
    flex: 1;
  }
`

const StyledHeading = styled(Heading)`
  margin: 0 1rem 0 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`

const Content = styled.div`
  overflow: auto;
  padding: 0 1rem;
  margin-bottom: 1rem;
`

const StyledReactModal = styled(({ className, ...props }) =>
  <ModalBox overlayClassName={className} {...props} />
)`${overlayStyles}`

const Modal = ({ children, title, closeable, onClose, ...props }) => {
  const hasHeader = title || closeable
  return (
    <StyledReactModal
      contentLabel={title || 'Modal'}
      onRequestClose={onClose}
      hasHeader={hasHeader}
      {...props}
    >
      {hasHeader &&
        <Header>
          <StyledHeading level={2} reverse={props.reverse}>{title}</StyledHeading>
          {closeable && <Button value="close" onClick={onClose}  reverse />}
        </Header>
      }
      <Content>
        {children}
      </Content>
    </StyledReactModal>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  closeable: PropTypes.bool,
  reverse: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default Modal
