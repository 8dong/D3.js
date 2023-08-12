import { FC } from 'react'
import styled from '@emotion/styled'

const BarChartIcon: FC = () => {
  return (
    <$svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="10" width="7" height="10" rx="2" ry="2" />
      <rect x="8" y="4" width="7" height="16" rx="2" ry="2" />
      <rect x="15" y="7" width="7" height="13" rx="2" ry="2" />
    </$svg>
  )
}

export default BarChartIcon

const $svg = styled.svg`
  vertical-align: middle;
`
