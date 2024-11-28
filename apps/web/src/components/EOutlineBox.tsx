import styled from 'styled-components'

const Box = styled.div`
  border: 1px solid #0000;
  border-radius: 8px;
  background: linear-gradient(#142117, #111911) padding-box,
    linear-gradient(270deg, rgba(41, 240, 105, 1), rgba(231, 236, 3, 1)) border-box;
  position: relative;
  min-height: 40px;
  padding: 12px;
  margin-bottom: 3px;
`

const EOutlineBox = (props: any) => {
  return <Box {...props}>{props.children}</Box>
}

export default EOutlineBox
