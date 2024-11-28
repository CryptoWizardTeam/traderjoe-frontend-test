import { Handler } from '@pancakeswap/uikit/widgets/Modal/types'
import { Dots, Flex, Modal, Text, useToast } from '@pancakeswap/uikit'
import useCatchTxError from 'hooks/useCatchTxError'
import { useState } from 'react'
import { ToastDescriptionWithTx } from 'components/Toast'
import EButton from 'components/EButton'
import EBox from 'components/EBox'
import styled from 'styled-components'
import ECircleButton from 'components/ECircleButton'
import EEstimateItem from 'components/EEstimateItem'
import useApproveToken from 'hooks/useApproveToken'
import { useAllowance } from 'hooks/useAllowance'
import { getParseUnits } from 'utils/eldenHelper'
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

export interface AddPositionModalProps {
  onDismiss?: Handler
  mode?: string
  data: EsNFTData
}

export const AddPositionModal: React.FC<React.PropsWithChildren<AddPositionModalProps>> = ({ onDismiss, data }) => {
  const { toastError, toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const [amount, setAmount] = useState<number | undefined>()

  const [isLoading, setLoading] = useState(false)
  const { onAddPosition } = useEsNFTCalls(data.poolAddress)

  const { onApprove } = useApproveToken(data.pairAddress)
  const { allowance, refetchAllowance } = useAllowance(data.pairAddress, data.poolAddress)

  const handleApprove = async () => {
    setLoading(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onApprove(getParseUnits(amount), data.poolAddress)
    })
    setLoading(false)
    if (receipt?.status) {
      refetchAllowance()
      toastSuccess(
        'Approve',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>Approve Success</ToastDescriptionWithTx>,
      )
    }
  }

  const handleAddPosition = async () => {
    setLoading(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onAddPosition(data.nftId, amount)
    })
    setLoading(false)
    if (receipt?.status) {
      onDismiss()
      toastSuccess(
        'Allocate',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>Allocate Success</ToastDescriptionWithTx>,
      )
    }
  }

  return (
    <Modal title={'Add Position'} onDismiss={onDismiss} style={{ width: '430px' }}>
      <Text fontSize="18px" fontWeight={300} color="#29F069" textAlign="center">
        {data.name} {data.type.toLocaleUpperCase()} <span style={{ color: "gray" }}>EsNFT</span>
      </Text>
      <Text fontSize="14px" color="gray" fontWeight={200} textAlign="center">
        Deposit more into this esNFT to increase your yield
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
                BALANCE: {data.lpBalanceInWallet}
                {data.name}
              </Balance>
              <Text
                fontSize="14px"
                color="app"
                style={{ cursor: 'pointer' }}
                onClick={() => setAmount(data.lpBalanceInWallet)}
              >
                Max
              </Text>
            </Flex>
          </Flex>
        </Inner>
      </EBox>

      {amount && amount <= data.lpBalanceInWallet ? (
        <Flex flexDirection="column" mt="12px" style={{ gap: '8px' }}>
          <EEstimateItem
            label="Deposit Value"
            value={`$${data.value.toFixed(2)} -> $${(Number(data.value) + Number(amount * data.lpPrice)).toFixed(2)}`}
          />
          <EEstimateItem
            label="APR"
            value={`${(Number(data.farmBaseAPR) + Number(data.lockBonusAPR) + Number(data.boostBonusAPR)).toFixed(2)}%`}
          />
          <EEstimateItem label="Farm Base APR" value={`${data.farmBaseAPR.toFixed(2)}%`} />
          <EEstimateItem
            label="Farm Bonus APR"
            value={`${(Number(data.boostBonusAPR) + Number(data.lockBonusAPR)).toFixed(2)}%`}
          />
        </Flex>
      ) : (
        <></>
      )}

      <Flex justifyContent="space-around" mt={12}>
        <EButton
          handleClick={amount && allowance < Number(amount) ? handleApprove : handleAddPosition}
          disabled={!amount || amount > data.lpBalanceInWallet}
          isLoading={isLoading}
        >
          {amount && allowance < Number(amount) ? 'Approve' : isLoading ? <Dots>Add Position</Dots> : <>Add Position</>}
        </EButton>
      </Flex>
    </Modal>
  )
}
