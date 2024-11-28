import { Button, ButtonProps } from '@pancakeswap/uikit'
import { useSwitchNetworkLoading } from 'hooks/useSwitchNetworkLoading'
import { useSetAtom } from 'jotai'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { hideWrongNetworkModalAtom } from './NetworkModal'
import Trans from './Trans'

const wrongNetworkProps: ButtonProps = {
  variant: 'danger',
  disabled: false,
  children: <Trans>Wrong Network</Trans>,
}

export const CommitButton = (props: ButtonProps) => {
  const { isWrongNetwork } = useActiveChainId()
  const [switchNetworkLoading] = useSwitchNetworkLoading()
  const setHideWrongNetwork = useSetAtom(hideWrongNetworkModalAtom)

  return (
    <Button
      {...props}
      onClick={(e) => {
        if (isWrongNetwork) {
          setHideWrongNetwork(false)
        } else {
          props.onClick?.(e)
        }
      }}
      {...(switchNetworkLoading && { disabled: true })}
      {...(isWrongNetwork && wrongNetworkProps)}
      style={{
        background: props?.variant === 'primary' ? 'linear-gradient(90deg, #E7EC03 -24.18%, #29F069 70.82%)' : '',
      }}
    />
  )
}
