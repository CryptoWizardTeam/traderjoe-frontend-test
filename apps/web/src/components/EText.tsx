import styled from 'styled-components'

const Text = styled.div`
  background: linear-gradient(90deg, #e7ec03 0.16%, #29f069 95.68%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
`

const EText = (props: any) => {
  return <Text {...props}>{props.children}</Text>
}

export default EText
