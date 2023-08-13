import { FC } from 'react'
import styled from '@emotion/styled'

interface IProps {
  chartId: string
}

const LineChartView: FC<IProps> = ({ chartId }) => {
  return (
    <$chartArea id={chartId}>
      <h2>Line Chart</h2>
    </$chartArea>
  )
}

export default LineChartView

const $chartArea = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: scroll;
  padding: 20px;

  & > h2 {
    width: 100%;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: 700;
  }

  & > svg {
    position: relative;
  }

  .tooltip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 200px;
    min-height: 100px;
    padding: 20px;
    border: 1px solid rgb(238, 240, 245);
    border-radius: 20px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 4px 20px;
    position: absolute;
    top: 0;

    .tooltip-label {
      margin-bottom: 10px;
    }
  }
`
