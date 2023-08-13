import { FC } from 'react'
import styled from '@emotion/styled'

const LineChartIcon: FC = () => {
  return (
    <$svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M2,18 L8,12 L14,16 L20,6 L22,22" fill="none" stroke="#dfe4f0" strokeWidth="2" />
    </$svg>
  )
}

const $svg = styled.svg`
  vertical-align: middle;
`

export default LineChartIcon
