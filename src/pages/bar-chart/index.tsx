import { NextPage } from 'next'

import BarChartContainer from '@components/containers/sections/BarChartContainer'

const BarChart: NextPage = () => {
  return (
    <BarChartContainer
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

export default BarChart
