import { useState } from 'react'
import { Modal, Flex, useToast, Text, Dots } from '@pancakeswap/uikit'
import EButton from 'components/EButton'
import useCatchTxError from 'hooks/useCatchTxError'
import { ToastDescriptionWithTx } from 'components/Toast'
import { Handler } from '@pancakeswap/uikit/widgets/Modal/types'
import EBox from 'components/EBox'
import useRunePoolCalls from '../hooks/useRunePoolCalls'
import ItemRow from './ItemRow'

export interface RunePoolWithdrawProps {
  onDismiss?: Handler
  mode?: string
  runePoolStakingPositions: any
  data: any
  rewards: any
  priceData: any
}

const RunePoolWithdrawModal: React.FC<React.PropsWithChildren<RunePoolWithdrawProps>> = ({
  onDismiss,
  data,
  runePoolStakingPositions,
  rewards,
  priceData,
}) => {
  const { toastError, toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()
  const { onWithdraw } = useRunePoolCalls(data.id)

  const [selectedNFTId, setSelectedNFTId] = useState<number | undefined>(undefined)

  const [isLoading, setLoading] = useState(false)

  const [selectedId, setSelectId] = useState<number | undefined>(undefined)
  const handleWithdraw = async () => {
    setLoading(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onWithdraw(selectedId)
    })
    setLoading(false)
    if (receipt?.status) {
      // rewards.refetchEsNFTRewards()
      onDismiss()
      toastSuccess(
        'Deallocate',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>Deallocate Success</ToastDescriptionWithTx>,
      )
    }
  }

  return (
    <Modal title={'Withdraw Position'} onDismiss={onDismiss}>
      <Flex justifyContent="center" mb="12px">
        <Text fontSize="14px" color="gray" textAlign="center" maxWidth="360px">
          Transfer your esNFTs back to your wallet and stop earning yield from this GoodGame Pool.
        </Text>
      </Flex>

      <EBox>
        {runePoolStakingPositions &&
          runePoolStakingPositions.map((item) => {
            return (
              <ItemRow
                poolData={data}
                positionData={item.nftStakingPosition}
                priceData={priceData}
                rewards={rewards}
                isSelected={selectedId === item.nftId}
                onClick={() => setSelectId(item.nftId)}
              />
            )
          })}
      </EBox>

      <Flex justifyContent="space-around" mt={12}>
        <EButton handleClick={handleWithdraw} disabled={!selectedId || isLoading} style={{ maxWidth: '200px' }}>
          {isLoading ? <Dots>Withdraw</Dots> : <>Withdraw</>}
        </EButton>
      </Flex>
    </Modal>
  )
}

export default RunePoolWithdrawModal
