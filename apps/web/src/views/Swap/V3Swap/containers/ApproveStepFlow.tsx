import { useMemo } from 'react'
import { useTranslation } from '@pancakeswap/localization'
import { styled } from 'styled-components'
import { Flex, Text, Box, LinkExternal, useTooltip, Dots } from '@pancakeswap/uikit'
import { ConfirmModalState, PendingConfirmModalState } from '../types'

const StyledLinkExternal = styled(LinkExternal)`
  &:hover {
    text-decoration: initial;
  }
`

const StepsContainer = styled(Flex)`
  width: 100px;
  height: 8px;
  border-radius: 4px;
  margin: 16px auto auto auto;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.input};
`

const Step = styled('div')<{ active: boolean; width: string }>`
  height: 100%;
  width: ${({ width }) => width};
  background: ${({ theme, active }) => (active ? theme.colors.secondary : theme.colors.input)};
`

interface ApproveStepFlowProps {
  confirmModalState: ConfirmModalState
  pendingModalSteps: PendingConfirmModalState[]
}

export const ApproveStepFlow: React.FC<React.PropsWithChildren<ApproveStepFlowProps>> = ({
  confirmModalState,
  pendingModalSteps,
}) => {
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <Text>
      {t(
        'If wallet require you to enter the number of tokens you want to approve, you could enter a number that is greater than or equal to the amount of tokens you are swapping.',
      )}
    </Text>,
    { placement: 'top' },
  )

  const stepWidth = useMemo(() => `${100 / pendingModalSteps.length}%`, [pendingModalSteps])
  const hideStepIndicators = useMemo(() => pendingModalSteps.length === 1, [pendingModalSteps])

  return (
    <Box mt="32px">
      <Text fontSize="14px" textAlign="center" color="textSubtle">
        <Dots>{t('Proceed in your wallet')}</Dots>
      </Text>
      {!hideStepIndicators && (
        <>
          <StepsContainer>
            {pendingModalSteps.length !== 3 && (
              <Step active={confirmModalState === ConfirmModalState.RESETTING_APPROVAL} width={stepWidth} />
            )}
            <Step active={confirmModalState === ConfirmModalState.APPROVING_TOKEN} width={stepWidth} />
            <Step active={confirmModalState === ConfirmModalState.APPROVE_PENDING} width={stepWidth} />
            <Step active={confirmModalState === ConfirmModalState.PENDING_CONFIRMATION} width={stepWidth} />
          </StepsContainer>
        </>
      )}
    </Box>
  )
}
