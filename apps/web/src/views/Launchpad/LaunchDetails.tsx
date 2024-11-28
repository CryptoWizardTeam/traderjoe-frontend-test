import { styled } from 'styled-components'
import { Text } from '@pancakeswap/uikit'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import PageLayout from './compnents/PageLayout'
import { LaunchListProps, LAUNCH_LIST } from './config'
import { useLaunchpadDetailInfo } from './hooks/useLaunchpadDetailInfo'
import ClaimSection from './compnents/ClaimSection'
import BuySection from './compnents/BuySection'

const StagesPanel = styled.div`
  padding: 32px 0;
  display: flex;
  justify-content: center;
  gap: 24px;
  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`
const StageItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  gap: 4px;
  @media screen and (max-width: 480px) {
    width: 100%;
  }

  :nth-child(2) {
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
    width: 100%;
    height: 8px;
  }

  &.active :nth-child(2) {
    background: linear-gradient(90deg, #29f069 20.21%, #e7ec03 100%);
  }
`

const LaunchDetails = () => {
  const router = useRouter()
  const { address } = router.query
  const [data, setData] = useState<LaunchListProps | undefined>(undefined)

  const { isLoading, launchpadDetailInfo, refetchContracts } = useLaunchpadDetailInfo(address, data)

  useEffect(() => {
    const index = LAUNCH_LIST.findIndex((item) => item.address === address)
    setData(LAUNCH_LIST[index])
  }, [address])

  return (
    <PageLayout data={data}>
      <StagesPanel>
        {data?.isWhitelist && (
          <StageItem>
            <Text fontWeight={200}>Whitelist Stage</Text>
            <div />
          </StageItem>
        )}
        <StageItem className={launchpadDetailInfo?.status === 'Active' ? 'active' : ''}>
          <Text fontWeight={200}>Public Stage</Text>
          <div />
        </StageItem>
        <StageItem className={launchpadDetailInfo?.status === 'Ended' ? 'active' : ''}>
          <Text fontWeight={200}>End</Text>
          <div />
        </StageItem>
        <StageItem className={launchpadDetailInfo?.status === 'Claims' ? 'active' : ''}>
          <Text fontWeight={200}>Claims</Text>
          <div />
        </StageItem>
      </StagesPanel>

      {data && launchpadDetailInfo && launchpadDetailInfo?.status === 'Claims' && (
        <ClaimSection launchData={launchpadDetailInfo} initialData={data} refetchLaunchData={refetchContracts} />
      )}

      {data &&
        launchpadDetailInfo &&
        (launchpadDetailInfo?.status === 'Active' || launchpadDetailInfo?.status === 'Ended') && (
          <BuySection launchData={launchpadDetailInfo} initialData={data} refetchLaunchData={refetchContracts} />
        )}
    </PageLayout>
  )
}

export default LaunchDetails
