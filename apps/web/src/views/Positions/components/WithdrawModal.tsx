import { Handler } from '@pancakeswap/uikit/widgets/Modal/types'
import { Button, Dots, Flex, Modal, Text, useModal, useToast } from '@pancakeswap/uikit'
import useCatchTxError from 'hooks/useCatchTxError'
import { useState } from 'react'
import { ToastDescriptionWithTx } from 'components/Toast'
import EButton from 'components/EButton'
import EBox from 'components/EBox'
import ECircleButton from 'components/ECircleButton'
import styled from 'styled-components'
import EEstimateItem from 'components/EEstimateItem'
import useEsNFTCalls from '../hooks/useEsNFTCalls'
import { EsNFTData } from '../hooks/useEsNFTCardData'

const Inner = styled(Flex)`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
`
const InputAmount = styled.input`
  background: transparent;
  outline: none;
  border: none;
  font-size: 16px;
`
const Balance = styled.span`
  color: gray;
  font-size: 12px;
  margin-top: 2px;
`

export interface WithdrawModalProps {
  onDismiss?: Handler
  mode?: string
  data: EsNFTData
}

export const WithdrawModal: React.FC<React.PropsWithChildren<WithdrawModalProps>> = ({ onDismiss, data }) => {
  const { toastError, toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const [amount, setAmount] = useState<number | undefined>()

  const [isLoading, setLoading] = useState(false)
  const { onWithdraw } = useEsNFTCalls(data.poolAddress)

  const handleWithdraw = async () => {
    setLoading(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onWithdraw(data.nftId, amount)
    })
    setLoading(false)
    if (receipt?.status) {
      onDismiss()
      toastSuccess(
        'Withdraw',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>Allocate Success</ToastDescriptionWithTx>,
      )
    }
  }

  return (
    <Modal title={'Withdraw Position'} onDismiss={onDismiss} style={{ width: '430px' }}>
      <Text fontSize="18px" fontWeight={300} textAlign="center">
        {data.name} {data.type.toLocaleUpperCase()} EsNFT
      </Text>
      <Text fontSize="14px" color="gray" textAlign="center">
        Recover underlying token from a esNFT
      </Text>

      <EBox style={{ marginTop: '12px' }}>
        <Inner>
          <Flex width="100%" flexDirection="column" justifyContent="center">
            <InputAmount
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : undefined)}
            />
            <Flex justifyContent="space-between" alignItems="center">
              <Balance>
                BALANCE: {data.depositedLp}
                {data.name}
              </Balance>
              <Text
                fontSize="14px"
                color="app"
                style={{ cursor: 'pointer' }}
                onClick={() => setAmount(data.depositedLp)}
              >
                Max
              </Text>
            </Flex>
          </Flex>
        </Inner>
      </EBox>

      {amount && amount <= data.depositedLp ? (
        <Flex flexDirection="column" mt="12px" style={{ gap: '8px' }}>
          <EEstimateItem
            label="Withdraw Amount"
            value={`$${amount > 0 ? (data.value - amount * data.lpPrice).toFixed(2) : data.value.toFixed(2)}`}
          />
          <EEstimateItem label="Remaining Amount" value={`$${data.value.toFixed(2)}`} />
        </Flex>
      ) : (
        <></>
      )}

      <Flex justifyContent="space-around" mt={12}>
        <EButton handleClick={handleWithdraw} disabled={!amount || amount > data.depositedLp} isLoading={isLoading}>
          {isLoading ? <Dots>Withdraw</Dots> : 'Withdraw'}
        </EButton>
      </Flex>
    </Modal>
  )
}
