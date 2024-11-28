import { Flex } from '@pancakeswap/uikit'
import Page from 'views/Page'
import PositionList from './components/PositionList'

const Positions = () => {
  return (
    <Page>
      <Flex
        flexDirection="column"
        maxWidth={1024}
        width="100%"
        height="100%"
        position="relative"
        alignItems="center"
        style={{ gap: 16 }}
      >
        <PositionList />
      </Flex>
    </Page>
  )
}

export default Positions
