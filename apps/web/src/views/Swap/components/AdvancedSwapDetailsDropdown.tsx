import { styled } from 'styled-components'

export const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  margin-top: ${({ show }) => (show ? '3px' : 0)};
  margin-bottom: ${({ show }) => (show ? '3px' : 0)};
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  background: radial-gradient(
    127.56% 175.14% at 98.37% 0.84%,
    rgba(96, 152, 102, 0.07) 0%,
    rgba(75, 109, 85, 0.02) 100%
  );

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`
