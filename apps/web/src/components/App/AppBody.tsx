import { styled } from 'styled-components'
import { Card, CardProps } from '@pancakeswap/uikit'

export const BodyWrapper = styled(Card)`
  background: radial-gradient(
    127.56% 175.14% at 98.37% 0.84%,
    rgba(97, 152, 96, 0.05) 0%,
    rgba(76, 109, 75, 0.02) 100%
  );
  border-radius: 24px;
  max-width: 436px;
  width: 100%;
  z-index: 1;
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, ...cardProps }: { children: React.ReactNode } & CardProps) {
  return (
    <BodyWrapper {...cardProps} background="transparent">
      {children}
    </BodyWrapper>
  )
}
