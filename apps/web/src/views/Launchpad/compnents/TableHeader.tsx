import { Box, Grid, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'

const Container = styled(Grid)`
  grid-template-columns: 3fr 1fr 1fr 1fr 2fr 2fr;
  padding: 8px 10px;
  background: radial-gradient(
    127.56% 175.14% at 98.37% 0.84%,
    rgba(97, 152, 96, 0.09) 0%,
    rgba(76, 109, 75, 0.03) 100%
  );
  border-radius: 8px;

  > div {
    font-size: 14px;
    color: gray;
  }

  @media screen and (max-width: 1320px) {
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
    .tbl-allocation {
      display: none;
    }
  }

  @media screen and (max-width: 1024px) {
    grid-template-columns: 2fr 1fr 2fr;
    .tbl-hardcap,
    .tbl-stage,
    .tbl-allocation {
      display: none;
    }
  }
`

const TableHeader = () => {
  return (
    <Container>
      <Text className="tbl-name">Name</Text>
      <Text className="tbl-hardcap">Hardcap</Text>
      <Text className="tbl-stage">WL stage</Text>
      <Text className="tbl-status">Status</Text>
      <Text className="tbl-raised">Total raised</Text>
      <Text className="tbl-allocation">Your allocation</Text>
    </Container>
  )
}

export default TableHeader
