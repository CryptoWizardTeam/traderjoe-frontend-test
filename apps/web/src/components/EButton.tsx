import { AutoRenewIcon } from '@pancakeswap/uikit'
import { ReactNode, useCallback } from 'react'
import styled from 'styled-components'

const ButtonContainer = styled.div`
  border-radius: 6px;
  background: linear-gradient(90deg, #e7ec03 -24.18%, #29f069 70.82%);
  color: #032905;
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
  transition: opacity 0.3s;
  align-self: center;
  &:hover {
    opacity: 0.65;
  }
`
const DisabledButtonContainer = styled.div`
  border-radius: 6px;
  background: #1f271f !important;
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

interface EButtonProps {
  children: ReactNode
  disabled?: boolean
  isLoading?: boolean
  variant?: string
  mt?: number
  handleClick?: () => void
  style?: any
}

const EButton = ({ children, handleClick, disabled, isLoading, mt, style, variant = 'primary' }: EButtonProps) => {
  const buttonStyle = {
    ...style,
    background: variant === 'primary' ? 'linear-gradient(90deg, #E7EC03 -24.18%, #29F069 70.82%)' : '#ff3131',
  }

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
    <ButtonContainer onClick={handleClick} style={buttonStyle}>
      <span style={{ marginTop: mt || 0, color: '#032905' }}>{children}</span>
    </ButtonContainer>
  )
}

export default EButton
