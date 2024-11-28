import { Handler } from '@pancakeswap/uikit/widgets/Modal/types'
import {
  Dots,
  EBoost,
  ELock,
  EStake,
  EPlus,
  EWithdraw,
  Flex,
  Grid,
  Modal,
  Text,
  useModal,
  useToast,
} from '@pancakeswap/uikit'
import useRunePoolCalls from 'views/RunePools/hooks/useRunePoolCalls'
import useCatchTxError from 'hooks/useCatchTxError'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import EButton from 'components/EButton'
import EText from 'components/EText'
import EBox from 'components/EBox'
import EBoxSm from 'components/EBoxSm'
import EOutlineBox from 'components/EOutlineBox'
import EEstimateItem from 'components/EEstimateItem'
import { ToastDescriptionWithTx } from 'components/Toast'
import DoubleCurrencyLogo from 'components/Logo/DoubleLogo'
import { AddPositionModal } from './AddPositionModal'
import BoosterModal from './BoosterModal'
import { LockModal } from './LockModal'
import { WithdrawModal } from './WithdrawModal'
import { StakeModal } from './StakeModal'
import useEsNFTCalls from '../hooks/useEsNFTCalls'
import { EsNFTData } from '../hooks/useEsNFTCardData'

const ControlButton = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  text-align: center;
  align-items: center;
  transition: background 0.3s;
  width: 100%;

  img {
    width: 60px;
    height: 60px;
    padding: 10px;
    background: #22222222;
    border-radius: 4px;

    &:hover {
      background: rgba(255, 255, 255, 0.01);
    }
  }

  &.disabled {
    opacity: 0.4;
  }
`
const PropertyCard = styled(EBoxSm)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  padding: 4px 16px;
  gap: 4px;
`

const VerDivider = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  height: 1px;
  margin: 10px -12px;
  width: calc(100% + 24px);
`

const HorDivider = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  height: 46px;
  margin: 0 10px;
  width: 1px;
`

export interface EsNFTControlModalProps {
  onDismiss?: Handler
  mode?: string
  data: EsNFTData
  runeStakingPosition?: any
  onRefetchNftData: () => void
  runePoolApr?: any
}

export const EsNFTControlModal: React.FC<React.PropsWithChildren<EsNFTControlModalProps>> = ({
  onDismiss,
  data,
  runeStakingPosition = undefined,
  onRefetchNftData,
  runePoolApr = undefined,
}) => {
  const [onPresentAddPositionModal] = useModal(<AddPositionModal data={data as EsNFTData} />)
  const [onPresentBoosterModal] = useModal(
    <BoosterModal data={data as EsNFTData} onRefetchNftData={onRefetchNftData} />,
  )
  const [onPresentLockModal] = useModal(<LockModal data={data as EsNFTData} onRefetchNftData={onRefetchNftData} />)
  const [onPresentWithdrawPositionModal] = useModal(<WithdrawModal data={data as EsNFTData} />)
  const [onPresentStakeModal] = useModal(<StakeModal data={data as EsNFTData} onRefetchNftData={onRefetchNftData} />)

  const { toastError, toastSuccess } = useToast()
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const [isLoading, setLoading] = useState(false)
  const [isStaked, setStaked] = useState(false)

  const [runeApr, setRuneApr] = useState<number | undefined>(undefined)

  const { onHarvest, onHarvestTo } = useEsNFTCalls(data.poolAddress)

  const { onWithdraw } = useRunePoolCalls(runeStakingPosition?.nftStakingPosition.owner)

  const handleHarvest = async () => {
    setLoading(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onHarvest(data.nftId)
    })
    setLoading(false)
    if (receipt?.status) {
      onRefetchNftData()
      toastSuccess(
        'Harvest',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>Allocate Success</ToastDescriptionWithTx>,
      )
    }
  }

  const handleHarvestTo = async () => {
    setLoading(true)
    const receipt = await fetchWithCatchTxError(() => {
      return onHarvestTo(data.nftId)
    })
    setLoading(false)
    if (receipt?.status) {
      onRefetchNftData()
      toastSuccess(
        'Harvest',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>Allocate Success</ToastDescriptionWithTx>,
      )
    }
  }

  const handleWithdraw = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onWithdraw(data.nftId)
    })
    if (receipt?.status) {
      setStaked(false)
      onRefetchNftData()
      onDismiss()
      toastSuccess(
        'Withdraw',
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>Deallocate Success</ToastDescriptionWithTx>,
      )
    }
  }

  useEffect(() => {
    if (!runePoolApr) return
    let _runeApr = 0
    if (runePoolApr.apr1) _runeApr += runePoolApr.apr1
    if (runePoolApr.apr2) _runeApr += runePoolApr.apr2
    setRuneApr(_runeApr)
  }, [runePoolApr])

  useEffect(() => {
    if (runeStakingPosition) {
      setStaked(true)
    }
  }, [runeStakingPosition])

  const markComponent = (status: boolean) => {
    if (status) return <img src="/efi/icons/circle-checked.png" width={20} height={20} alt="icon" />
    return <img src="/efi/icons/circle-unchecked.png" width={20} height={20} alt="icon" />
  }

  return (
    <Modal
      title={`${data.name} ${data.type?.toLocaleUpperCase()} esNFT`}
      onDismiss={onDismiss}
      style={{ width: '420px' }}
    >
      <EBox>
        <Flex flexDirection="column">
          <Flex style={{ gap: '5px' }} alignItems="center">
            <DoubleCurrencyLogo currency0={data?.token0} currency1={data?.token1} size={32} />
            <Text fontSize="18px">{data.name}</Text>
            <EText style={{ fontSize: '18px', fontWeight: 600 }}>{data.type.toLocaleUpperCase()}</EText>
          </Flex>
        </Flex>
        <Flex justifyContent="space-between" mt={4}>
          <Flex flexDirection="column">
            <Text fontSize="14px" color="app">
              APR
            </Text>
            <Text fontSize="15px">
              ${data.value.toFixed(2)} -{' '}
              {(
                Number(data.farmBaseAPR) +
                Number(data.lockBonusAPR) +
                Number(data.boostBonusAPR) +
                Number(runeApr !== undefined ? runeApr : 0)
              ).toFixed(2)}
              %
            </Text>
          </Flex>
          <HorDivider />
          <Flex flexDirection="column">
            <Text fontSize="14px" color="app">
              Pending Rewards
            </Text>
            <Text fontSize="15px">${Number(data.pending.toFixed(2))}</Text>
          </Flex>
        </Flex>
      </EBox>
      <EBox style={{ marginTop: '10px' }}>
        <Text fontSize="15px" fontWeight={200}>
          Properties
        </Text>
        <VerDivider />
        {isStaked ? (
          <Grid my="20px" gridTemplateColumns="1fr 1fr 1fr" gridGap="18px" style={{ placeItems: 'center' }}>
            <ControlButton className="disabled">
              <EWithdraw width="22px" height="22px" fill="gold" />
              <Text fontSize="13px" fontWeight={200}>
                Withdraw
              </Text>
            </ControlButton>
            <ControlButton className="disabled">
              <ELock width="22px" height="22px" fill="gold" />
              <Text fontSize="13px" fontWeight={200}>
                Lock
              </Text>
            </ControlButton>
            <ControlButton className="disabled">
              <EBoost width="22px" height="22px" fill="gold" />
              <Text fontSize="13px" fontWeight={200}>
                Yield Boost
              </Text>
            </ControlButton>
            <ControlButton onClick={handleWithdraw}>
              <EStake width="22px" height="22px" fill="gold" />
              <Text fontSize="13px" fontWeight={200}>
                Unstake
              </Text>
            </ControlButton>
            <ControlButton className="disabled">
              <EPlus width="22px" height="22px" fill="gold" />
              <Text fontSize="13px" fontWeight={200}>
                Add
              </Text>
            </ControlButton>
          </Grid>
        ) : (
          <Grid my="20px" gridTemplateColumns="1fr 1fr 1fr" gridGap="18px" style={{ placeItems: 'center' }}>
            <ControlButton onClick={onPresentWithdrawPositionModal}>
              <EWithdraw width="22px" height="22px" fill="gold" />
              <Text fontSize="13px" fontWeight={200}>
                Withdraw
              </Text>
            </ControlButton>
            <ControlButton onClick={onPresentLockModal}>
              <ELock width="22px" height="22px" fill="gold" />
              <Text fontSize="13px" fontWeight={200}>
                Lock
              </Text>
            </ControlButton>
            <ControlButton onClick={onPresentBoosterModal}>
              <EBoost width="22px" height="22px" fill="gold" />
              <Text fontSize="13px" fontWeight={200}>
                Yield Boost
              </Text>
            </ControlButton>
            <ControlButton onClick={onPresentStakeModal}>
              <EStake width="22px" height="22px" fill="gold" />
              <Text fontSize="13px" fontWeight={200}>
                Stake in GoodGame
              </Text>
            </ControlButton>
            <ControlButton onClick={onPresentAddPositionModal}>
              <EPlus width="22px" height="22px" fill="gold" />
              <Text fontSize="13px" fontWeight={200}>
                Add
              </Text>
            </ControlButton>
          </Grid>
        )}
        <VerDivider />
        <Flex flexWrap="wrap" justifyContent="space-between" style={{ gap: '3px', textAlign: 'center' }}>
          {Number(data.allocPoint) > 0 ? (
            <EOutlineBox style={{ width: '112px' }}>
              <Text fontSize="13px" fontWeight={200}>
                Yield Earning
              </Text>
            </EOutlineBox>
          ) : (
            <EBox style={{ width: '112px' }}>
              <Text fontSize="13px" fontWeight={200}>
                Non Yield Earning
              </Text>
            </EBox>
          )}
          {Number(data?.startLockTime) + Number(data?.lockDuration) > Date.now() / 1000 ? (
            <EOutlineBox style={{ width: '112px' }}>
              <Text fontSize="13px" fontWeight={200}>
                Locked
              </Text>
            </EOutlineBox>
          ) : (
            <EBox style={{ width: '112px' }}>
              <Text fontSize="13px" fontWeight={200}>
                Unlocked
              </Text>
            </EBox>
          )}
          {Number(data.boostPoints) > 0 ? (
            <EOutlineBox style={{ width: '112px' }}>
              <Text fontSize="13px" fontWeight={200}>
                Boosted
              </Text>
            </EOutlineBox>
          ) : (
            <EBox style={{ width: '112px' }}>
              <Text fontSize="13px" fontWeight={200}>
                Unboosted
              </Text>
            </EBox>
          )}
          {isStaked ? (
            <EOutlineBox style={{ width: '112px' }}>
              <Text fontSize="13px" fontWeight={200}>
                Staked
              </Text>
            </EOutlineBox>
          ) : (
            <EBox style={{ width: '112px' }}>
              <Text fontSize="13px" fontWeight={200}>
                Unstaked
              </Text>
            </EBox>
          )}
        </Flex>
      </EBox>

      <EBox style={{ marginTop: '10px' }}>
        <Text fontSize="15px" fontWeight={200}>
          Data Breakdown
        </Text>
        <VerDivider />
        <Flex flexDirection="column" style={{ gap: '4px' }}>
          <EEstimateItem label="Value" value={`$${data.value.toFixed(2)}`} />
          <EEstimateItem
            label="APR"
            value={`${(
              Number(data.farmBaseAPR) +
              Number(data.lockBonusAPR) +
              Number(data.boostBonusAPR) +
              Number(runeApr !== undefined ? runeApr : 0)
            ).toFixed(2)}%`}
          />
          <EEstimateItem label="Farm Base APR" value={`${data.farmBaseAPR.toFixed(2)}%`} />
          <EEstimateItem
            label="Farm Bonus APR"
            value={`${(Number(data.boostBonusAPR) + Number(data.lockBonusAPR)).toFixed(2)}%`}
          />
          {runeApr !== undefined && <EEstimateItem label="GoodGame Pool APR" value={`${runeApr.toFixed(2)}%`} />}
          <EEstimateItem label="Pending Rewards" value={<>${Number(data.pending.toFixed(2))}</>} />
        </Flex>
      </EBox>

      <Flex style={{ gap: '12px' }} justifyContent="space-around" mt="20px">
        <EButton disabled={isLoading} handleClick={runeStakingPosition ? handleHarvestTo : handleHarvest} style={{ marginTop: 5 }}>
          {isLoading ? <Dots>Harvest</Dots> : 'Harvest'}
        </EButton>
      </Flex>
    </Modal>
  )
}
