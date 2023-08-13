import { NextPage } from 'next'

import LineChartContainer from '@components/containers/sections/LineChartContainer'

const LineChart: NextPage = () => {
  return (
    <LineChartContainer
      dataList={[
        { xAxisData: 'a', yAxisData: 47 },
        { xAxisData: 'b', yAxisData: 89 },
        { xAxisData: 'c', yAxisData: 100 },
        { xAxisData: 'd', yAxisData: 17 },
        { xAxisData: 'e', yAxisData: 55 }
      ]}
      chartId="bar-chart"
      chartWidth={800}
      chartHeight={400}
    />
  )
}

export default LineChart
