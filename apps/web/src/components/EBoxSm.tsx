import styled from 'styled-components'

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #1d3012;
  border-radius: 50px;
  position: relative;
  min-height: 32px;
`

const ActiveBoxContainer = styled(Box)`
  box-shadow: 0 0 2px 2px gray;
`

const EBoxSm = ({ children, isActive = false, ...rest }) => {
  if (isActive) {
    return <ActiveBoxContainer {...rest}>{children}</ActiveBoxContainer>
  }

  return <Box {...rest}>{children}</Box>
}

export default EBoxSm
