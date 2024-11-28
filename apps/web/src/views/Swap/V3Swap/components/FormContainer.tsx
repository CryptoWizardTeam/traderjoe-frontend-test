import { PropsWithChildren, memo } from 'react'
import { Column } from '@pancakeswap/uikit'

import { Wrapper } from '../../components/styleds'

export const FormContainer = memo(function FormContainer({ children }: PropsWithChildren) {
  return (
    <Wrapper id="swap-page">
      <Column gap="sm">{children}</Column>
    </Wrapper>
  )
})
