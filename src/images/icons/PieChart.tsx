import { FC } from 'react'
import styled from '@emotion/styled'

const PieChartIcon: FC = () => {
  return (
    <$svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#dfe4f0"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v10l4.8 2.4" />
    </$svg>
  )
}

export default PieChartIcon

const $svg = styled.svg`
  vertical-align: middle;
`
