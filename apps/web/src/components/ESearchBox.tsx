import { Input, SearchIcon } from '@pancakeswap/uikit'
import styled from 'styled-components'

const Box = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  position: relative;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: radial-gradient(
    127.56% 175.14% at 98.37% 0.84%,
    rgba(96, 152, 102, 0.03) 0%,
    rgba(75, 109, 85, 0.01) 100%
  );
  padding: 0 14px;
`

const EInput = styled(Input)`
  width: 100%;
  outline: none;
  font-size: 14px;
  font-weight: 300;
  height: 40px;
  background: transparent;
  border: none;
  padding: 0 3px;
`

const ESearchBox = (props: any) => {
  return (
    <Box
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <SearchIcon color="textSubtle" />
      <EInput placeholder="Search" {...props} />
    </Box>
  )
}

export default ESearchBox
