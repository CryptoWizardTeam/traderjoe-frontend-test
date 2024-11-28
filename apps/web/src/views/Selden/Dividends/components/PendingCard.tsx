import { useState } from 'react'
import { Dots, Flex, Text, useToast } from '@pancakeswap/uikit'
import EBox from 'components/EBox'
import Button from 'components/EButton'
import styled from 'styled-components'
import { ToastDescriptionWithTx } from 'components/Toast'
import useCatchTxError from 'hooks/useCatchTxError'
import useHarvestAll from '../hooks/useHarvestAll'

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
const Title = styled.label`
  font-size: 18px;
  font-weight: 300;
`
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(200px, 1fr));
  gap: 12px;
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`
const PoolIcon = styled.div`
  display: flex;
  margin-right: 8px;
  img {
    width: 24px;
    height: 24px;
  }
`
const CardBox = styled(EBox)`
  display: flex;
  font-size: 12px;
  gap: 3px;
`

const PendingCard = (props) => {
  const { toastError, toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { onHarvestAll } = useHarvestAll()
  const [isLoading, setLoading] = useState(false)

  const handleHarvestAll = async () => {
    setLoading(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onHarvestAll()
    })
    setLoading(false)
    if (receipt?.status) {
      props.onRefetchData()
      toastSuccess(
        'Approve',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>Approve Success</ToastDescriptionWithTx>,
      )
    }
  }

  return (
    <CardContent>
      <EBox>
        <Flex alignItems="center" justifyContent="space-between">
          <Title>Pending rewards</Title>
          <Button
            disabled={props.totalPendingRewardInUSD <= 0 || isLoading}
            handleClick={handleHarvestAll}
            style={{ width: '150px' }}
          >
            {isLoading ? <Dots>Claim all</Dots> : <>Claim all</>}
          </Button>
        </Flex>
        <Grid style={{ marginTop: '10px' }}>
          {props.pendingRewardData &&
            props.pendingRewardData.map((item, index) => {
              return (
                <CardBox key={item.name}>
                  {index === 0 && (
                    <PoolIcon>
                      <img src="https://eldenfi-tokens.netlify.app/images/symbol/selden.png" alt="eth" />
                    </PoolIcon>
                  )}
                  {index === 1 && (
                    <PoolIcon>
                      <img src="https://eldenfi-tokens.netlify.app/images/symbol/eth.png" alt="eth" />
                      <img
                        src="https://eldenfi-tokens.netlify.app/images/symbol/usdt.png"
                        style={{ marginLeft: -4 }}
                        alt="usdc"
                      />
                    </PoolIcon>
                  )}
                  <Flex style={{ gap: 2, width: '100%' }} alignItems="center" justifyContent="space-between">
                    <Text fontWeight={300}>{item.name}</Text>
                    <Text color="secondary">
                      {Number(item.pendingReward.toFixed(2))}
                      <span style={{ color: 'gray' }}>(${Number(item.pendingRewardInUSD.toFixed(2))})</span>
                    </Text>
                  </Flex>
                </CardBox>
              )
            })}
        </Grid>
      </EBox>
    </CardContent>
  )
}

export default PendingCard
