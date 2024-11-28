import styled from 'styled-components'

const Box = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  background: radial-gradient(
    127.56% 175.14% at 98.37% 0.84%,
    rgba(96, 152, 102, 0.07) 0%,
    rgba(75, 109, 85, 0.02) 100%
  );
  box-shadow: -5px -5px 250px 0px rgba(255, 255, 255, 0.02) inset;
  position: relative;
  min-height: 40px;
  padding: 12px;
  margin-bottom: 3px;
`

const EBox = (props: any) => {
  return <Box {...props}>{props.children}</Box>
}

export default EBox
