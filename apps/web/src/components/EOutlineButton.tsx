import { ReactNode } from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  border-radius: 6px;
  background: linear-gradient(#010a01, #010a01) padding-box,
    linear-gradient(90deg, #e7ec03 -24.18%, #29f069 70.82%) border-box;
  background-color: #010a01;
  border: 1px solid #0000;
  color: white;
  display: flex;
  width: 100%;
  min-width: 140px;
  height: 44px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  align-self: center;
  .btn_text {
    color: white;
    font-weight: 400;
  }
  &:hover {
    background: linear-gradient(90deg, #e7ec03 -24.18%, #29f069 70.82%);
    color: black;
    transition: all 0.3s;
    .btn_text {
      color: black;
    }
  }
`
const DisabledButtonContainer = styled.div`
  border-radius: 6px;
  background: #1f271f;
  color: #575d57;
  display: flex;
  width: 100%;
  min-width: 140px;
  height: 44px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  font-family: Poppins;
  font-size: 14px;
  font-weight: 600;
  cursor: not-allowed;
  align-self: center;
`

interface EOutlineButtonProps {
  children: ReactNode
  disabled?: boolean
  isLoading?: boolean
  mt?: number
  handleClick?: () => void
  style?: any
}

const EOutlineButton = ({ children, handleClick, disabled, isLoading, mt, style }: EOutlineButtonProps) => {
  if (disabled) {
    return (
      <DisabledButtonContainer style={style}>
        <span style={{ marginTop: mt || 0, color: 'gray' }}>{children}</span>
      </DisabledButtonContainer>
    )
  }

  if (isLoading) {
    return (
      <DisabledButtonContainer style={style}>
        <span style={{ marginTop: mt || 0, color: 'gray' }}>{children}</span>
      </DisabledButtonContainer>
    )
  }

  return (
    <ButtonContainer onClick={handleClick} style={style}>
      <span className="btn_text" style={{ marginTop: mt || 0 }}>
        {children}
      </span>
    </ButtonContainer>
  )
}

export default EOutlineButton
