import { AddIcon, AutoColumn, Flex, IconButton, MinusIcon, Text } from '@pancakeswap/uikit'
import styled from 'styled-components'
import EBox from 'components/EBox'

const Input = styled.input`
  background: transparent;
  width: 32px;
  font-size: 14px;
  border: none;
  outline: none;
`

const InputRedeem = ({ inputValue, setInputValue, minValue = 0, maxValue = 180 }) => {
  const onChangeDay = (event) => {
    const day = Number(event.target.value) % 30
    setInputValue(inputValue - (inputValue % 30) + day)
  }

  const onChangeMonth = (event) => {
    const month = Number(event.target.value)
    if (month < 0) return
    setInputValue(inputValue + month * 30)
  }

  return (
    <Flex style={{ gap: '5px' }} justifyContent="space-between" flexDirection="column">
      <Text fontSize="15px" color="textSubtle" mt="10px" fontWeight="200">
        Redeem Months Duration
      </Text>
      <EBox>
        <AutoColumn gap="4px">
          <Flex style={{ gap: '18px' }} justifyContent="space-between" alignItems="center">
            <IconButton
              onClick={() => {
                if (inputValue < 30) return
                setInputValue(inputValue - 30)
              }}
              disabled={inputValue <= minValue + 29}
              scale="xs"
              variant="secondary"
              style={{ width: 18, padding: 12 }}
            >
              <MinusIcon color="text" width={18} height={18} />
            </IconButton>
            <Input placeholder="0" value={Math.floor(inputValue / 30)} onChange={onChangeMonth} />
            <IconButton
              onClick={() => setInputValue(inputValue + 30)}
              disabled={inputValue >= maxValue}
              scale="xs"
              variant="secondary"
              style={{ width: 18, padding: 12 }}
            >
              <AddIcon />
            </IconButton>
          </Flex>
        </AutoColumn>
      </EBox>
      <Text fontSize="15px" color="textSubtle" mt="5px" fontWeight="200">
        Redeem Days Duration
      </Text>
      <EBox>
        <AutoColumn gap="4px">
          <Flex style={{ gap: '18px' }} justifyContent="space-between" alignItems="center">
            <IconButton
              onClick={() => setInputValue(inputValue - 1)}
              disabled={inputValue <= minValue}
              scale="xs"
              variant="secondary"
              style={{ width: 18, padding: 12 }}
            >
              <MinusIcon color="text" width={18} height={18} />
            </IconButton>
            <Input placeholder="0" value={Number(inputValue) % 30} onChange={onChangeDay} />
            <IconButton
              onClick={() => setInputValue(inputValue + 1)}
              disabled={inputValue >= maxValue}
              scale="xs"
              variant="secondary"
              style={{ width: 18, padding: 12 }}
            >
              <AddIcon />
            </IconButton>
          </Flex>
        </AutoColumn>
      </EBox>
    </Flex>
  )
}

export default InputRedeem
